<template>
  <div class="app-search" :class="classSize">
    <label v-if="label" :class="classLabel">{{ label }}</label>
    <div class="app-search__input">
      <slot name="prepend-inner"></slot>
      <!-- Input Text  -->
      <input
        v-bind="$attrs"
        type="text"
        :value="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        v-on="inputListeners"
      />

      <slot name="submit-btn">
        <button
          class="submit-btn"
          @click="submit"
        >
          <IconSearch width="15" height="15" />
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
import IconSearch from "~/assets/svg/icons/search.svg?inline"

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
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    size: {
      type: String,
      required: false,
      default: ""
    },
    disabled: Boolean,
    message: {
      type: String,
      required: false,
      default: ""
    },
    label: String,
    labelFixed: Boolean,
    labelBold: Boolean,
    counter: {
      type: Number
    }
  },

  data() {
    return {
      localValue: this.value,
      isFocus: false
    };
  },

  computed: {
    hasUnitSlot() {
      return !!this.$slots["unit"];
    },

    classSize() {
      const disableClass = {
        disabled: this.disabled
      };
      const classSize = {
        "app-search--size-xs": this.size === "xs",
        "app-search--size-sm": this.size === "sm",
        "app-search--size-md": this.size === "md" || !this.size,
        "app-search--size-lg": this.size === "lg"
      };
      return {
        ...classSize,
        ...disableClass,
        "app-search--has-counter": !!this.counter,
        "app-search--focused": this.isFocus,
        "app-search--textarea": this.textarea
      };
    },

    classLabel() {
      const labelBold = {
        "app-search__label-bold": this.labelBold
      };
      const labelFixed = {
        "app-search__label-fixed": this.labelFixed
      };
      return {
        "app-search__label": true,
        ...labelBold,
        ...labelFixed
      };
    },

    inputListeners: function() {
      const vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: event => this.updateInput(event),
          blur: event => this.handleBlur(event),
          focus: event => this.handleFocus(event)
        }
      );
    }
  },

  watch: {
    value(newValue) {
      this.localValue = newValue;
    },
  },

  methods: {
    updateInput: function(event) {
      this.localValue = event.target.value;
      this.$emit("input", event.target.value);
    },

    handleFocus(event) {
      this.isFocus = true;
    },

    handleBlur(event) {
      this.isFocus = false;
    },

    submit: function(event) {
      this.$emit("submit", this.localValue);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-search.scss";
</style>