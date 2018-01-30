export default {
    state: {
        me: null
    },
    mutations: {
        login: (state, user) => {
            state.me = user
        },
        logout: state => {
            state.me = false
        }
    },
    getters: {
        me: state => {
            return state.me
        }
    }

}
