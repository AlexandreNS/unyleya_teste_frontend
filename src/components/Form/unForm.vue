<template>
    <v-form ref="form" v-model="valid" v-on:submit.prevent>
        <v-row class="mx-2">
            <template v-for="field in fields" >

                <unInput v-if="field.type == 'unInput'"
                    :field="field"
                    v-model="data[field.name]"
                    :validator="validator[field.validator]"
                    :key="field.name" />

                <unSelect v-else-if="field.type == 'unSelect'"
                    :field="field"
                    v-model="data[field.name]"
                    :validator="validator[field.validator]"
                    :key="field.name" />
            </template>
        </v-row>
    </v-form>
</template>

<script>
import validator from './config/validator'

const unInput = () => import('./Fields/unInput')
const unSelect = () => import('./Fields/unSelect')

export default {
    components: { unInput, unSelect},
    props: {
        fields: {
            type: Array,
            required: true
        },
        value: {
            type: Boolean,
            required: true
        },
        dataInitial: {
            type: Object,
        }
    },
    data() {
        return {
            valid: false,
            validator,
            data: { ...this.dataInitial } || {},
        }
    },
    watch: {
        value(newValue){
            if(newValue){
                this.$refs.form.validate()
                this.$emit('data', { data: {...this.data}, valid: this.valid })
                this.$emit('input', false)
            }
        }
    }
}
</script>

<style>

</style>