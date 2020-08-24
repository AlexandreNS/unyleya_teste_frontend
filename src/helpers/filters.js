const cpf = (value) => {    
    if (!value) return ''
    value = value.toString()
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export { cpf }