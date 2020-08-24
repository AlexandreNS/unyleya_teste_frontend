<template>
  <v-row dense>
    <v-col cols="12">
      <v-list two-line subheader>
        <div v-for="item in itens" :key="item.id">
          <v-list-item >
            <v-list-item-avatar>
            <v-icon
              class="grey lighten-1 white--text"
              v-text="'folder'"
            ></v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title v-text="item.nome"></v-list-item-title>
            <v-list-item-subtitle>
                Ano de Nascimento {{ item.anoNascimento }} <br />
                Sexo {{ item.sexo == 'M' ? 'Masculino' : 'Feminino'}}
            </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            <v-btn icon>
              <v-icon color="blue lighten-1" @click="editItem(item)">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="red lighten-1" @click="deleteItem(item)">mdi-delete</v-icon>
            </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    itens: {
        type: Array,
        required: true
    },
  },
  data() {
    return {
        
    }
  },
  methods: {
    deleteItem(item){
      this.$emit('deleteItem', item)
    },
    editItem(item){
      this.$emit('editItem', item)
    }
  },
}
</script>

<style>

</style>