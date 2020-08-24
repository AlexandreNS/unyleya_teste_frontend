import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    autores: [],
    statusAutor: "",
    error: null
  },
  mutations: {
    setAutores(state, payload) {
      state.autores = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setStatusAutor(state, payload) {
        state.statusAutor = payload
      }
  },
  actions: {
    async createAutor(context, payload){
        await axios.post('/autores', { ...payload.data })
    },
    async deleteAutor(context, payload){
        let id = payload.id;
        await axios.delete(`/autores/${id}`)
    },
    async updateAutor(context, payload){
        let id = payload.data.id;
        await axios.put(`/autores/${id}`, { ...payload.data })
    },
    async countLivrosByAutor({ commit }, payload){
        let response = await axios.post('/livros/count', { 'autor_id': payload.id })
        commit('setStatusAutor', `${response.data.count} livros serão afetados/excluido`)
    },
    listAutores({ commit }){
        axios.get('/autores')
            .then(function(response){
                commit('setAutores', [...response.data])
        }); 
    }
  },
}