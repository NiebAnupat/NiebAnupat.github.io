export const state = () => ({})

export const getters = {}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state) {},
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    console.log('nuxtServerInit....')

    // if (process.server && process.static) return;
    // if (!req.headers.cookie) return;

    // const parsed = CookieParser.parse(req.headers.cookie)
    // const access_token = parsed.access_token

    // if (!access_token) return;

    // const decoded = JWTDecode(access_token)

    // if (!decoded) return;

    // const user = {
    //   uid: decoded.user_id,
    //   email: decoded.email,
    // }

    // await commit('users/setUser', user)
    // await dispatch('todos/fetchTodos');

    await dispatch('todos/add', { title: 'Test01', status: false }).then(() => {
      console.log('add task success')
    })
  },
  onAuthStateChangedAction(state) {},
}
