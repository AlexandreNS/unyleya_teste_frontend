import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
const Livros = () => import('@/views/Livros')
const Editoras = () => import('@/views/Editoras')
const Autores = () => import('@/views/Autores')
const Generos = () => import('@/views/Generos')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/livros',
    name: 'Livros',
    component: Livros
  },
  {
    path: '/editoras',
    name: 'Editoras',
    component: Editoras
  },
  {
    path: '/autores',
    name: 'Autores',
    component: Autores
  },
  {
    path: '/generos',
    name: 'Generos',
    component: Generos
  },
  {
    path: '/home',
    redirect: {name: 'Home'}
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
