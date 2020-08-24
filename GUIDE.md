# Components
## UnForm Component

Responsavel pela construção e validação de formularios, 
dado um objeto com as informações e parametros de construção

**EVENTS**

* __data__    retorna os valores dos campos

**PROPS**

* __value__   atributo de sync data
* __fields__  Array com Objetos de construção
* __ref__     referencia do componente para acessar o $refs form do unForm

**DATA**
* __data__                
* __validator__   vincula a mascara com as regras de validação

### __fields__

* __type__        unInput, unSelect, unAddress
* __name__        Nome do campo
* __label__       Descrição do campo
* __validator__   Tipo de Validação -> cns, cpf, cnpj, cep, telefone, default, email
* __items__       Itens para o unSelect
* __cols__        Tamanho

### Como Usar

* Nome para referencia do Formulario, ref
* Defina variaveis data para: v-model(update), fields, data( local para salvar os dados do formulario )
* Computed que retorna: `this.$refs.(Nome do REF).$refs.form`
* Method para atualizar o data e um Callback para ser chamado ao atualizar o data

*template*
```html
<unForm 
    ref="form" 
    v-model="update" 
    :fields="fields" 
    @data="updateForm($event, saveData)" />
```

*script*
```js
import unForm from '@/components/Form/unForm'

export default {
    components:{unForm},
    created(){
        this.fields.map(element => this.data[element.name] = "")
    },
    computed: {
        form(){
            return this.$refs.form.$refs.form
        }
    },
    data() {
        return {
            update: false,
            data: {},
            fields: [...],
        }
    },
    methods: {
        clearFields(){
            this.form.reset()
        },
        updateForm(event, callback){
            this.data = event
            callback()
        },
        saveData(){
            if(this.form.validate()){
                ...
            }
        },
    }
}
```