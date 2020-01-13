<template>
  <div class="app-select" v-click-outside="hideOptions">
    <div class="app-select__selected" tabindex="0" @click="handleClickSelected">
      <span class="app-select__prepend" v-if="$slots.prepend">
        <slot name="prepend" />
      </span>
      <span class="app-select__selected-value">{{ selectedText }}</span>
      <span class="app-select__arrow">
        <IconCaretDown />
      </span>
    </div>

    <div class="app-select__options" v-show="active">
      <div v-if="!options.length" class="app-select__option">No option</div>
      <div
        v-for="option in options"
        class="app-select__option"
        :key="option.value"
        @click="handleClickOption(option)"
      >{{ option.text }}</div>
    </div>
  </div>
</template>

<script>
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";

export default {
  components: {
    IconCaretDown
  },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    options: {
      type: Array,
      default: () => [],
      validator: value =>
        value.every(option => ["value", "text"].every(key => key in option))
    },
    value: [String, Number]
  },

  data: () => ({
    active: false
  }),

  computed: {
    selectedText() {
      const [selected = {}] = this.options.filter(item => item.value === this.value);
      return selected && selected.text
    }
  },

  methods: {
    handleClickSelected() {
      this.active = !this.active;
    },

    handleClickOption(option) {
      this.$emit("change", option.value);
      this.hideOptions();
    },

    hideOptions() {
      this.active = false;
    },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-select.scss";
</style>