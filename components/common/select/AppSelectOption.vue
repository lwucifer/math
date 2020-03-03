<template>
  <div class="app-select-option" @click="handleClick">
    <slot />
  </div>
</template>

<script>
export default {
  inject: {
    appRadioGroup: {
      default: null
    }
  },

  props: {
    value: {}
  },

  methods: {
    handleClick() {
      if (!this.appRadioGroup) return;
      const { mode, value, hideOptions } = this.appRadioGroup;

      if (mode && mode === "tags") {
        this.$emit("change", [...value, this.value]);
      } else {
        this.$emit("change", this.value)
      }

      hideOptions();
    }
  }
};
</script>

<style>
</style>