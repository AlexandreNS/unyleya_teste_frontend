<template>
  <nav>
    <v-navigation-drawer
      app
      permanent
    >
      <v-list v-model="links" nav>
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.link"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="link.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>Biblioteca</v-toolbar-title>
    </v-app-bar>

  </nav>  
</template>

<script>
export default {
  data: () => ({
    links: [
      { text: 'Home', icon: 'mdi-folder', link:'home' },
      { text: 'Livros', icon: 'mdi-book-open-page-variant', link:'livros' },
      { text: 'Editoras', icon: 'mdi-printer', link:'editoras' },
      { text: 'Autores', icon: 'mdi-account-edit', link:'autores' },
      { text: 'Generos', icon: 'mdi-format-list-bulleted-type', link:'generos' },
      ],
    }),
}
</script>

<style>

</style>