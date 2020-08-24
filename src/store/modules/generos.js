import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    generos: [],
    statusGenero: "",
    error: null
  },
  mutations: {
    setGeneros(state, payload) {
      state.generos = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setStatusGenero(state, payload) {
        state.statusGenero = payload
      }
  },
  actions: {
    async createGenero(context, payload){
        await axios.post('/generos', { ...payload.data })
    },
    async deleteGenero(context, payload){
        let id = payload.id;
        await axios.delete(`/generos/${id}`)
    },
    async updateGenero(context, payload){
        let id = payload.data.id;
        await axios.put(`/generos/${id}`, { ...payload.data })
    },
    async countLivrosByGenero({ commit }, payload){
        let response = await axios.post('/livros/count', { 'genero_id': payload.id })
        commit('setStatusGenero', `${response.data.count} livros serão afetados/excluido`)
    },
    listGeneros({ commit }){
        axios.get('/generos')
            .then(function(response){
                commit('setGeneros', [...response.data])
        }); 
    }
  },
}