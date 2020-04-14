<template>
    <label class="app-switch">
        <input type="checkbox" 
            v-bind="$attrs" 
            :checked="checked" 
            @change="handleChange"
            :value="value"
            />
        <span class="app-slider"></span>
    </label>
</template>

<script>
export default {
    model: {
        prop: 'checked',
        event: 'change'
    },

    props: {
        checked: {
            default: true
            },
        value: {}
    },
    methods: {
        handleChange(e) {
        this.$emit("change", e.target.checked);
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-toggle-switch.scss";
</style>