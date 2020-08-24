<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              Generos
              <v-spacer></v-spacer>
            <v-btn color="green white--text" tile @click="dialogAdd = true">
              + Adicionar
            </v-btn>
            </v-card-title>
            <ListBasic :itens="generos" @deleteItem="showDialogDelete" @editItem="showDialogEdit"/>
          </v-card>
        </v-col>
      </v-row>
      <!-- Add Genero -->
      <v-dialog v-if="dialogAdd" v-model="dialogAdd" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Adcionar Genero</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            @data="updateForm($event, addGenero)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogAdd = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Edit Genero -->
      <v-dialog v-if="dialogEdit" v-model="dialogEdit" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Editar Genero</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            :dataInitial="data"
            @data="updateForm($event, editGenero)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Delete Genero  -->
      <v-dialog v-if="dialogDelete" v-model="dialogDelete" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Exlusão de Genero</v-card-title>
          <v-card-text>
            Tem certeza que deseja excluir ? 
            {{ info }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="removeGenero">Sim</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import ListBasic from '@/components/ListBasic'
import unForm from '@/components/Form/unForm'

import { mapState, mapActions } from 'vuex'

export default {
  components: { ListBasic, unForm },
  created(){
    this.fields.map(element => this.data[element.name] = "")
    this.listGeneros()
  },
  computed: {
    ...mapState('generos', ['generos', 'statusGenero']),
    form(){
      return this.$refs.form.$refs.form
    }
  },
  data() {
    return {
      update: false,
      data: {},
      fields: [
        {
          type:"unInput", name:"nome", label:"Genero",
          validator:"default", cols:"12"
        }
      ],
      dialogEdit: false,
      dialogAdd: false,
      dialogDelete: false,
      info: ""
    }
  },
  methods: {
    ...mapActions('generos', ['createGenero', 'listGeneros', 'updateGenero','deleteGenero', 'countLivrosByGenero']),
    showDialogEdit(event){
      this.data = event
      this.dialogEdit = true
    },
    showDialogDelete(event){
      this.data = event
      this.countLivrosByGenero(this.data).then(() => {
        this.info = this.statusGenero
        this.dialogDelete = true
      })
    },
    clearFields(){
      this.form.reset()
    },
    updateForm(event, callback){
      this.data = event
      callback()
    },
    removeGenero(){
      this.deleteGenero(this.data)
      .then( () => {
          this.clearFields()
          this.listGeneros()
        }).catch( () => {
            console.log('Não foi possivel deletar')
            this.listGeneros()
          }
      )
      this.dialogDelete = false
    },
    editGenero(){
      if(this.form.validate()){
        this.updateGenero(this.data)
        .then( () => {
            this.clearFields()
            this.listGeneros()
          }).catch( () => {
              console.log('Não foi possivel editar')
              this.listGeneros()
            }
          )
      }
      this.dialogEdit = false
    },
    addGenero(){
      if(this.form.validate()){
        this.createGenero(this.data)
        .then( () => {
            this.clearFields()
            this.listGeneros()
          }).catch( () => {
              console.log('Não foi possivel adicionar')
              this.listGeneros()
            }
          )
      }
      this.dialogAdd = false
    },
  },
}
</script>

<style>

</style>