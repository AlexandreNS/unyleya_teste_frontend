import rules from './rules'
// import masks from './masks'

export default {
    ano: {
        rules: [ rules.ano ]
    },
    sexo: {
        rules: [ rules.sexo ]
    },
    default: {
        rules: [ rules.notEmpty ]
    },
    noValidate: {
        rules: []
    }
}