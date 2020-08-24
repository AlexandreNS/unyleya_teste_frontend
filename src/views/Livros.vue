<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              Livros
              <v-spacer></v-spacer>
            <v-btn color="green white--text" tile @click="dialogAdd = true">
              + Adicionar
            </v-btn>
            </v-card-title>
            <ListLivro :itens="livros" @deleteItem="showDialogDelete" @editItem="showDialogEdit"/>
          </v-card>
        </v-col>
      </v-row>
      <!-- Add Livro -->
      <v-dialog v-if="dialogAdd" v-model="dialogAdd" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Adcionar Livro</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            @data="updateForm($event, addLivro)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogAdd = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Edit Livro -->
      <v-dialog v-if="dialogEdit" v-model="dialogEdit" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Editar Livro</v-card-title>

          <unForm ref="form" 
            v-model="update" 
            :fields="fields" 
            :dataInitial="data"
            @data="updateForm($event, editLivro)" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="update = true">Editar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Delete Livro  -->
      <v-dialog v-if="dialogDelete" v-model="dialogDelete" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">Exlusão de Livro</v-card-title>
          <v-card-text>
            Tem certeza que deseja excluir ? 
            {{ info }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="removeLivro">Sim</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import ListLivro from '@/components/ListLivro'
import unForm from '@/components/Form/unForm'

import { mapState, mapActions } from 'vuex'

export default {
  components: { ListLivro, unForm },
  created(){
    this.fields.map(element => this.data[element.name] = "")
    this.listEditoras();
    this.listGeneros();
    this.listAutores();
    this.listLivros()
  },
  computed: {
    ...mapState('livros', ['livros', 'statusLivro']),
    ...mapState('autores', ['autores']),
    ...mapState('editoras', ['editoras']),
    ...mapState('generos', ['generos']),
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
          type:"unInput", name:"titulo", label:"Titulo do Livro",
          validator:"default", cols:"12",
        },
        {
          type:"unSelect", name:"autor_id", label:"Autor", items: [],
          validator:"default", cols:"12",
        },
        {
          type:"unSelect", name:"genero_id", label:"Genero", items: [],
          validator:"default", cols:"12",
        },
        {
          type:"unSelect", name:"editora_id", label:"Editora", items: [],
          validator:"default", cols:"12",
        },
        {
          type:"unInput", name:"anoLancamento", label:"Ano de Lançamento",
          validator:"ano", cols:"12",
        },
      ],
      dialogEdit: false,
      dialogAdd: false,
      dialogDelete: false,
      info: ""
    }
  },
  methods: {
    ...mapActions('livros', ['createLivro', 'listLivros', 'updateLivro','deleteLivro']),
    ...mapActions('autores', ['listAutores']),
    ...mapActions('editoras', ['listEditoras']),
    ...mapActions('generos', ['listGeneros']),
    showDialogEdit(event){
      let data = event
      data.anoLancamento = String(data.anoLancamento)
      data.autor_id = String(data.autor_id)
      data.editora_id = String(data.editora_id)
      data.genero_id = String(data.genero_id)
      this.data = data
      this.dialogEdit = true
    },
    showDialogDelete(event){
      this.data = event
        this.dialogDelete = true
    },
    clearFields(){
      this.form.reset()
    },
    updateForm(event, callback){
      this.data = event
      callback()
    },
    removeLivro(){
      this.deleteLivro(this.data)
      .then( () => {
          this.clearFields()
          this.listLivros()
        }).catch( () => {
            console.log('Não foi possivel deletar')
            this.listLivros()
          }
      )
      this.dialogDelete = false
    },
    editLivro(){
      if(this.form.validate()){
        this.updateLivro(this.data)
        .then( () => {
            this.clearFields()
            this.listLivros()
          }).catch( () => {
              console.log('Não foi possivel editar')
              this.listLivros()
            }
          )
      }
      this.dialogEdit = false
    },
    addLivro(){
      if(this.form.validate()){
        this.createLivro(this.data)
        .then( () => {
            this.clearFields()
            this.listLivros()
          }).catch( () => {
              console.log('Não foi possivel adicionar')
              this.listLivros()
            }
          )
      }
      this.dialogAdd = false
    },
  },
  watch: {
    autores(newValue){
      if (newValue){
        let items = this.autores.map((autor) => {
          return {
            'value': String(autor.id),
            'text': autor.nome
          }

        })
        this.fields[1].items = items
      }
    },
    editoras(newValue){
      if (newValue){
        let items = this.editoras.map((editora) => {
          return {
            'value': String(editora.id),
            'text': editora.nome
          }

        })
        this.fields[3].items = items
      }
    },
    generos(newValue){
      if (newValue){
        let items = this.generos.map((genero) => {
          return {
            'value': String(genero.id),
            'text': genero.nome
          }

        })
        this.fields[2].items = items
      }
    }
  }
}
</script>

<style>

</style>