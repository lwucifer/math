<template>
  <label class="app-checkbox">
    <input
      type="checkbox"
      class="app-checkbox__input"
      hidden
      v-bind="$attrs"
      :checked="checked"
      @change="handleChange"
    />
    <span class="app-checkbox__checkmark">
      <IconCheckBox class="app-checkbox__icon app-checkbox__icon--checked icon fill-opacity-1 fill-primary" />
      <IconCheckBoxOutlineBlank
        class="app-checkbox__icon app-checkbox__icon--unchecked icon fill-opacity-1"
      />
    </span>
    <span v-if="label || $slots.default" class="app-checkbox__text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
const IconCheckBox = () =>
  import("~/assets/svg/v2-icons/check_box_24px.svg?inline");
const IconCheckBoxOutlineBlank = () =>
  import("~/assets/svg/v2-icons/check_box_outline_blank_24px.svg?inline");

export default {
  inheritAttrs: false,

  components: {
    IconCheckBox,
    IconCheckBoxOutlineBlank
  },

  model: {
    prop: "checked",
    event: "change"
  },

  props: {
    checked: {
      default: false
    },
    label: {
      type: String,
      default: ""
    }
  },

  methods: {
    handleChange(e) {
      this.$emit("change", e.target.checked);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-checkbox.scss";
</style>