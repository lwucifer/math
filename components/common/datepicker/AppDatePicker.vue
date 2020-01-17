<template>
    <div class="app-date-picker">
        <label>{{label}}</label>
        <date-picker v-model="text" @change="change()" valueType="format" format="DD/MM/YYYY"></date-picker>
    </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        components: {
            DatePicker
        },

        props: {
            value: [String, Number],
            label: String,
        },

        data() {
            return {
                text: null
            };
        },

        methods: {
            change: function() {
                this.$emit("input", this.text);
            }
        },

        created() {
            this.text = this.value;
        }
    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/app/_app-date-picker.scss";
</style>