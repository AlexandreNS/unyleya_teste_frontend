import axios from '../../axios'

export default {
  namespaced: true,
  state: {
    editoras: [],
    statusEditora: "",
    error: null
  },
  mutations: {
    setEditoras(state, payload) {
      state.editoras = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setStatusEditora(state, payload) {
        state.statusEditora = payload
      }
  },
  actions: {
    async createEditora(context, payload){
        await axios.post('/editoras', { ...payload.data })
    },
    async deleteEditora(context, payload){
        let id = payload.id;
        await axios.delete(`/editoras/${id}`)
    },
    async updateEditora(context, payload){
        let id = payload.data.id;
        await axios.put(`/editoras/${id}`, { ...payload.data })
    },
    async countLivrosByEditora({ commit }, payload){
        let response = await axios.post('/livros/count', { 'editora_id': payload.id })
        commit('setStatusEditora', `${response.data.count} livros serão afetados/excluido`)
    },
    listEditoras({ commit }){
        axios.get('/editoras')
            .then(function(response){
                commit('setEditoras', [...response.data])
        }); 
    }
  },
}