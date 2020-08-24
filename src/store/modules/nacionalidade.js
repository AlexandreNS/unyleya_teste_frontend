import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    nacionalidades: [],
    error: null
  },
  mutations: {
    setNacionalidades(state, payload) {
      state.nacionalidades = payload
    },
  },
  actions: {
    listNacionalidades({ commit }){
        axios.get('/nacionalidades')
            .then(function(response){
                commit('setNacionalidades', [...response.data])
        }); 
    }
  },
}