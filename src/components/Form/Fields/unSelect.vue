<template>
    <v-col :cols="field.cols">
        <v-autocomplete v-if="field.items.hasOwnProperty('text', 'value')"
            :items="field.items"
            item-text="text"
            item-value="value"
            :rules="validator.rules"
            :name="field.name"
            :label="field.label"
            :value="value"
            @input="updateValue($event)"
            :id="`un-${field.name}`"
        ></v-autocomplete>
        <v-autocomplete v-else
            :items="field.items"
            :rules="validator.rules"
            :name="field.name"
            :label="field.label"
            :value="value"
            @input="updateValue($event)"
            :id="`un-${field.name}`"
        ></v-autocomplete>
    </v-col>
</template>

<script>
export default {
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