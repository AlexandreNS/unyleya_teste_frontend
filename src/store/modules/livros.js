import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    livros: [],
    error: null
  },
  mutations: {
    setLivros(state, payload) {
      state.livros = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setStatusLivro(state, payload) {
        state.statusLivro = payload
      }
  },
  actions: {
    async createLivro(context, payload){
        await axios.post('/livros', { ...payload.data })
    },
    async deleteLivro(context, payload){
        let id = payload.id;
        await axios.delete(`/livros/${id}`)
    },
    async updateLivro(context, payload){
        let id = payload.data.id;
        await axios.put(`/livros/${id}`, { ...payload.data })
    },
    listLivros({ commit }){
        axios.get('/livros')
            .then(function(response){
                commit('setLivros', [...response.data])
        }); 
    }
  },
}