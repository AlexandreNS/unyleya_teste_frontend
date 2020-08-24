<template>
    <v-col :cols="field.cols">
        <v-text-field v-if="!!validator.masks"
            :name="field.name"
            :label="field.label"
            :rules="[...validator.rules]"
            v-mask="[...validator.masks]"
            :value="value"
            @input="updateValue($event)"
            :id="`un-${field.name}`"
        ></v-text-field>
        <v-text-field v-else
            :name="field.name"
            :label="field.label"
            :rules="[...validator.rules]"
            :value="value"
            @input="updateValue($event)"
            :id="`un-${field.name}`"
        ></v-text-field>
    </v-col>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
    directives: {mask},
    props: {
        field: {
            type: Object,
            required: true
        },
        validator: Object,
        value: {
            type: String,
            required: true,
            default: ""
        }
    },
    methods: {
        updateValue(value) {       
            this.$emit('input', value)   
        }
    }
}
</script>

<style>

</style>