<template>
    <app-select v-model="opt" :options="opts"/>
</template>

<script>
    export default {
        components: {
        },

        data() {
            return {
                opt: null,
                opts: [
                    { value: 1, text: "Nam" },
                    { value: 2, text: "Nữ" },
                ]
            };
        },

        props: {
            sex: [String, Number],
        },

        watch: {
            opt() {
                this.$emit("input", this.opt);
            }
        },

        created() {
            this.opt = this.sex;
        }
    };
</script>