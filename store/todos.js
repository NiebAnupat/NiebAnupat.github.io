export const state = () => ({
  list: [],
})

export const getters = {
  doneTodos: (state) => {
    return state.list.filter((list) => list.status)
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  },
  getTodos: (state) => {
    return state.list
  },
  getLastTask(state) {
    return state.list[state.list.length - 1]
  },
  getDoneTodos: (state) => {
    return state.list.filter((list) => list.status)
  },
  undoneTodosCount: (state) => {
    return state.list.filter((list) => !list.status).length
  }
}

export const mutations = {
  add(state, task) {
    state.list.push({
      id: String(state.list.length + 1),
      title: task.title,
      status: false,
    })
    console.log('task added')
  },
  remove(state, task) {
    state.list.splice(state.list.indexOf(task), 1)
  },
  toggle(state, task) {
    task.status = !task.status
  },
  setTodos(state, todos) {
    state.list = todos
  },
}

export const actions = {
  async add({ commit, dispatch }, todo) {
    await commit('add', todo)
    await dispatch('saveTask').catch((err) => {
      throw err
    })
  },
  async remove({ commit, rootGetters }, todo) {
    const { uid } = await rootGetters['users/getUser']
    await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .collection('todos')
      .where('id', '==', todo.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete()
        })
        commit('remove', todo)
        console.log('task removed')
      })
      .catch((err) => {
        throw err
      })
  },

  async removeDoneTodos({ dispatch, getters }) {
    const todos = await getters.getDoneTodos
    todos.forEach((todo) => {
      dispatch('remove', todo)
    })
  },

  async removeAllTodos({ dispatch, getters }){
    const todos = await getters.getTodos
    todos.forEach((todo) => {
      dispatch('remove', todo)
    })
  }
  ,
  async toggle({ commit, dispatch, rootGetters }, todo) {
    const { uid } = await rootGetters['users/getUser']
    await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .collection('todos')
      .where('id', '==', todo.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            status: !todo.status,
          })
        })
        commit('toggle', todo)
        console.log('task toggled status!')
        dispatch('fetchTodos')
      })
      .catch((err) => {
        throw err
      })
  },

  async saveTask({ getters, rootGetters }) {
    console.log('saving task to database....')
    const task = await getters.getLastTask
    const { uid } = await rootGetters['users/getUser']
    await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .collection('todos')
      .add(task)
      .then(() => {
        console.log('task saved')
      })
      .catch((e) => {
        throw e
      })
  },
  async fetchTodos({ commit, rootGetters }) {
    const { uid } = await rootGetters['users/getUser']
    const todos = await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .collection('todos')
      .orderBy('status', 'asc')
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return doc.data()
        })
      })
      .catch((err) => {
        throw err
      })
    await commit('setTodos', todos)
    console.log('todos fetched')
  },
}
