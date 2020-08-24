export default {
    sexo: v => v == 'M' || v == 'F',
    ano: v => Number(v) === 0 || !!Number(v),
    notEmpty: v => !!v || 'Campo obrigatório',
    length(...lengths){
        return v => 
            lengths.indexOf(typeof v == 'string' ? v.length : 0) != -1 
            || 'Preencha o campo corretamente'
    },
    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) 
        || 'Precisa ser um e-mail valido'
}