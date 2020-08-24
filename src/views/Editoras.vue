<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              Editoras
              <v-spacer></v-spacer>
            <v-btn color="green white--text" tile @click="dialogAdd = true">
              + Adicionar
            </v-btn>
            </v-card-title>
            <ListBasic :itens="editoras" @deleteItem="showDialogDelete" @editItem="showDialogEdit"/>
          </v-card>
        </v-col>
      </v-row>
      <!-- Add Editora -->
      <v-dialog v-if="dialogAdd" v-model="dialogAdd" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Adcionar Editora</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            @data="updateForm($event, addEditora)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogAdd = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Edit Editora -->
      <v-dialog v-if="dialogEdit" v-model="dialogEdit" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Editar Editora</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            :dataInitial="data"
            @data="updateForm($event, editEditora)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Delete Editora  -->
      <v-dialog v-if="dialogDelete" v-model="dialogDelete" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Exlusão de Editora</v-card-title>
          <v-card-text>
            Tem certeza que deseja excluir ? 
            {{ info }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="removeEditora">Sim</v-btn>
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
    this.listEditoras()
  },
  computed: {
    ...mapState('editoras', ['editoras', 'statusEditora']),
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
          type:"unInput", name:"nome", label:"Editora",
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
    ...mapActions('editoras', ['createEditora', 'listEditoras', 'updateEditora','deleteEditora', 'countLivrosByEditora']),
    showDialogEdit(event){
      this.data = event
      this.dialogEdit = true
    },
    showDialogDelete(event){
      this.data = event
      this.countLivrosByEditora(this.data).then(() => {
        this.info = this.statusEditora
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
    removeEditora(){
      this.deleteEditora(this.data)
      .then( () => {
          this.clearFields()
          this.listEditoras()
        }).catch( () => {
            console.log('Não foi possivel deletar')
            this.listEditoras()
          }
      )
      this.dialogDelete = false
    },
    editEditora(){
      if(this.form.validate()){
        this.updateEditora(this.data)
        .then( () => {
            this.clearFields()
            this.listEditoras()
          }).catch( () => {
              console.log('Não foi possivel editar')
              this.listEditoras()
            }
          )
      }
      this.dialogEdit = false
    },
    addEditora(){
      if(this.form.validate()){
        this.createEditora(this.data)
        .then( () => {
            this.clearFields()
            this.listEditoras()
          }).catch( () => {
              console.log('Não foi possivel adicionar')
              this.listEditoras()
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