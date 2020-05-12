<template>
  <app-input class="app-search" v-bind="{ ...$attrs, ...$props }" @input="handleInput">
    <app-button slot="append-inner" class="app-search__submit" :size="$attrs.size" @click="submit">
      <IconSearch class="icon body-1" />
    </app-button>
  </app-input>
</template>

<script>
import IconSearch from "~/assets/svg/icons/search.svg?inline";

export default {
  inheritAttrs: false,

  components: {
    IconSearch
  },

  model: {
    prop: "value",
    event: "input"
  },

  props: {
    value: {
      type: [String, Number],
      required: false,
      default: ""
    }
  },

  data() {
    return {
      localValue: this.value
    };
  },

  watch: {
    value(newValue) {
      this.localValue = newValue;
    },

    localValue(newValue) {
      this.$emit("input", newValue);
    }
  },

  methods: {
    submit(event) {
      this.$emit("submit", this.localValue);
    },

    handleInput(value) {
      this.localValue = value;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-search.scss";
</style>