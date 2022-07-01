export const state = () => ({})

export const getters = {}

export const mutations = {
      ON_AUTH_STATE_CHANGED_MUTATION(state){

      }
}

export const actions = {

      nuxtServerInit({ commit, dispatch}, { req }) {
            // console.log('nuxtServerInit....')
        
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
          
            console.log('user logged in')
            commit('todos/setTodos',{title:'Test01',status:false})
          },
      onAuthStateChangedAction(state){
            
      }
}
