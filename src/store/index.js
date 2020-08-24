import Vue from 'vue'
import Vuex from 'vuex'

import generos from './modules/generos'
import editoras from './modules/editoras'
import autores from './modules/autores'
import livros from './modules/livros'
import nacionalidade from './modules/nacionalidade'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    generos,
    editoras,
    autores,
    livros,
    nacionalidade
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
})
