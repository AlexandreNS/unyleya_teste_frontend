<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              Autores
              <v-spacer></v-spacer>
            <v-btn color="green white--text" tile @click="dialogAdd = true">
              + Adicionar
            </v-btn>
            </v-card-title>
            <ListAutor :itens="autores" @deleteItem="showDialogDelete" @editItem="showDialogEdit"/>
          </v-card>
        </v-col>
      </v-row>
      <!-- Add Autor -->
      <v-dialog v-if="dialogAdd" v-model="dialogAdd" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Adcionar Autor</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            @data="updateForm($event, addAutor)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogAdd = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Edit Autor -->
      <v-dialog v-if="dialogEdit" v-model="dialogEdit" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Editar Autor</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            :dataInitial="data"
            @data="updateForm($event, editAutor)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Delete Autor  -->
      <v-dialog v-if="dialogDelete" v-model="dialogDelete" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Exlusão de Autor</v-card-title>
          <v-card-text>
            Tem certeza que deseja excluir ? 
            {{ info }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="removeAutor">Sim</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import ListAutor from '@/components/ListAutor'
import unForm from '@/components/Form/unForm'

import { mapState, mapActions } from 'vuex'

export default {
  components: { ListAutor, unForm },
  created(){
    this.fields.map(element => this.data[element.name] = "")
    this.listNacionalidades();
    this.listAutores()
  },
  computed: {
    ...mapState('autores', ['autores', 'statusAutor']),
    ...mapState('nacionalidade', ['nacionalidades']),
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
          type:"unInput", name:"nome", label:"Nome do Autor",
          validator:"default", cols:"12",
        },
        {
          type:"unSelect", name:"nacionalidade_id", label:"Nacionalidade", items: [],
          validator:"default", cols:"12",
        },
        {
          type:"unInput", name:"anoNascimento", label:"Ano de Nascimento",
          validator:"ano", cols:"12",
        },
        {
          type:"unInput", name:"sexo", label:"Sexo (M|F)",
          validator:"sexo", cols:"12"
        }
      ],
      dialogEdit: false,
      dialogAdd: false,
      dialogDelete: false,
      info: ""
    }
  },
  methods: {
    ...mapActions('autores', ['createAutor', 'listAutores', 'updateAutor','deleteAutor', 'countLivrosByAutor']),
    ...mapActions('nacionalidade', ['listNacionalidades']),
    showDialogEdit(event){
      let data = event
      data.anoNascimento = String(data.anoNascimento)
      data.nacionalidade_id = String(data.nacionalidade_id)
      this.data = data
      this.dialogEdit = true
    },
    showDialogDelete(event){
      this.data = event
      this.countLivrosByAutor(this.data).then(() => {
        this.info = this.statusAutor
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
    removeAutor(){
      this.deleteAutor(this.data)
      .then( () => {
          this.clearFields()
          this.listAutores()
        }).catch( () => {
            console.log('Não foi possivel deletar')
            this.listAutores()
          }
      )
      this.dialogDelete = false
    },
    editAutor(){
      if(this.form.validate()){
        this.updateAutor(this.data)
        .then( () => {
            this.clearFields()
            this.listAutores()
          }).catch( () => {
              console.log('Não foi possivel editar')
              this.listAutores()
            }
          )
      }
      this.dialogEdit = false
    },
    addAutor(){
      if(this.form.validate()){
        this.createAutor(this.data)
        .then( () => {
            this.clearFields()
            this.listAutores()
          }).catch( () => {
              console.log('Não foi possivel adicionar')
              this.listAutores()
            }
          )
      }
      this.dialogAdd = false
    },
  },
  watch: {
    nacionalidades(newValue){
      if (newValue){
        let items = this.nacionalidades.map((nacionalidade) => {
          return {
            'value': String(nacionalidade.id),
            'text': nacionalidade.nome + ' - ' + nacionalidade.pais
          }

        })
        this.fields[1].items = items
      }
    }
  },
}
</script>

<style>

</style>