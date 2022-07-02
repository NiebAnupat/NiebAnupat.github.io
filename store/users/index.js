import Cookies from 'js-cookie'
export const state = () => ({
  user: null,
})

export const getters = {
  getUser:(state) => state.user,
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },

  clearUser(state) {
    state.user = null
  },
}

export const actions = {
  async login({ commit, dispatch }, user) {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      )
      const { email, uid, displayName } = await this.$fire.auth.currentUser
      const token = await this.$fire.auth.currentUser.getIdToken()
      const userData = { email, uid, displayName}
      Cookies.set('access_token', token)
      await commit('setUser', userData)
      console.log('user logged in')
      await dispatch('checkUserInDB')
        .then(() => {
          dispatch('todos/fetchTodos')
          this.app.router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async loginWithGoogle({ commit, dispatch}){
    try {
      const { email, uid, displayName } = await this.$fire.auth.currentUser
      const token = await this.$fire.auth.currentUser.getIdToken()
      const userData = { email, uid, displayName}
      Cookies.set('access_token', token)
      await commit('setUser', userData)
      await dispatch('checkUserInDB')
        .then(() => {
          dispatch('todos/fetchTodos')
          this.app.router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async logout({ commit }) {
    commit('clearUser')
    await this.$fire.auth.signOut()
    await Cookies.remove('access_token')
    await commit('setUser', null)
    console.log('user logged out')
    location.href = '/login'
  },

  async register({ dispatch }, user) {
    console.log(user)
    await this.$fire.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        console.log('user registered')
        dispatch('logout')
        location.reload()
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  async checkUserInDB({ dispatch, getters }) {
    console.log('Checking user in Database....')
    const uid = getters.getUser.uid
    const user = await this.$fire.firestore
      .collection('users')
      .where('uid', '==', uid)
      .get()
    if (user.empty) {
      console.log('user not found')

      await dispatch('saveUserToDB')
        .then(() => {
          console.log('user saved to database')
        })
        .catch((err) => {
          throw err
        })
    } else {
      console.log('user found')
      await this.dispatch('todos/fetchTodos')
    }
    console.log('Checking user in Database....done!')
  },

  async saveUserToDB({ getters }) {
    console.log('creating user in Database....')
    const user = getters.getUser
    if (!user.uid) return
    await this.$fire.firestore.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    })
    .then(() => {
      console.log('user created')
    })
    .catch((e) => {
      throw e
    })

  },
}
