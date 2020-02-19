<template>
  <div class="app-input" :class="classSize">
    <label v-if="label" :class="classLabel">{{ label }}</label>

    <div class="app-input__input" v-else>
      <slot name="prepend-inner"></slot>

      <!-- Textarea  -->
      <textarea
        v-if="textarea"
        v-bind="$attrs"
        :rows="rows"
        :type="type"
        :value="localValue"
        :placeholder="placeholder"
        :disabled="disabled"
        v-on="inputListeners"
      />
      <!-- Input Text  -->
      <input
        v-else
        v-bind="$attrs"
        :type="type"
        :value="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        v-on="inputListeners"
      />

      <slot name="append-inner"></slot>

      <div class="app-input__unit" v-if="$slots.unit">
        <slot name="unit"></slot>
      </div>

      <div class="app-input__validate-status" v-if="localValidate">
        <IconSuccess
          height="14"
          width="14"
          v-if="localValidate == VALIDATE_STATUS.SUCCESS"
          class="mr-1"
        />
      </div>

      <div
        v-if="counter"
        class="app-input__counter"
      >{{ `${localValue.toString().length}/${counter}` }}</div>
    </div>

    <div
      class="app-input__error"
      v-if="message && localValidate == VALIDATE_STATUS.ERROR"
    >{{message}}</div>
  </div>
</template>

<script>
import { APP_INPUT_VALIDATE_STATUS as VALIDATE_STATUS } from "~/utils/constants";
import IconSuccess from "~/assets/svg/icons/success.svg?inline";

export default {
  inheritAttrs: false,

  components: {
    IconSuccess
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
    type: {
      type: String,
      required: false,
      default: "text"
    },
    size: {
      type: String,
      required: false,
      default: ""
    },
    disabled: Boolean,
    validate: {
      type: [String, Number],
      required: false,
      default: VALIDATE_STATUS.DEFAULT
    },
    message: {
      type: String,
      required: false,
      default: ""
    },
    label: String,
    labelFixed: Boolean,
    labelBold: Boolean,
    textarea: Boolean,
    rows: {
      type: [String, Number],
      required: false,
      default: 6
    },
    counter: {
      type: Number
    }
  },

  data() {
    return {
      VALIDATE_STATUS: Object.freeze(VALIDATE_STATUS),
      localValue: this.value,
      localValidate: this.validate,
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
        "app-input--size-xs": this.size === "xs",
        "app-input--size-sm": this.size === "sm",
        "app-input--size-md": this.size === "md" || !this.size,
        "app-input--size-lg": this.size === "lg"
      };
      return {
        ...classSize,
        ...disableClass,
        "app-input--has-counter": !!this.counter,
        "app-input--error": this.localValidate === VALIDATE_STATUS.ERROR,
        "app-input--success": this.localValidate === VALIDATE_STATUS.SUCCESS,
        "app-input--focused": this.isFocus
      };
    },

    classLabel() {
      const labelBold = {
        "app-input__label-bold": this.labelBold
      };
      const labelFixed = {
        "app-input__label-fixed": this.labelFixed
      };
      return {
        "app-input__label": true,
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

    localValue(newValue) {
      if (this.counter) {
        this.validateCounter();
      }
    },

    validate(newValue) {
      this.localValidate = newValue;
    }
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

    validateCounter() {
      const { counter, localValue } = this;
      const valueLength = localValue.toString().length;

      if (valueLength > counter) {
        this.localValidate = VALIDATE_STATUS.ERROR;
      } else {
        this.localValidate = VALIDATE_STATUS.DEFAULT;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-input.scss";
</style>