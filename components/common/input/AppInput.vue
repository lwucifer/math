<template>
  <div class="app-input" :class="classSize">
    <label v-if="label" :class="classLabel">{{label}}</label>
    <div class="app-input__input" v-else>
      <!-- Textarea  -->
      <textarea
        v-if="textarea"
        v-bind="$attrs"
        :rows="rows"
        :type="type"
        :value="localValue"
        @input="updateInput"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="localValidate == VALIDATE_STATUS.ERROR ? 'border-red' : (localValidate == VALIDATE_STATUS.SUCCESS ? 'border-primary' : '')"
      />
      <!-- Input Text  -->
      <input
        v-else
        v-bind="$attrs"
        :type="type"
        :value="localValue"
        :disabled="disabled"
        @input="updateInput"
        :placeholder="placeholder"
        :class="localValidate == VALIDATE_STATUS.ERROR ? 'border-red' : (localValidate == VALIDATE_STATUS.SUCCESS ? 'border-primary' : '')"
      />

      <div class="unit" v-if="localValidate == VALIDATE_STATUS.SUCCESS || hasUnitSlot">
        <IconSuccess height="14" width="14" v-if="localValidate == VALIDATE_STATUS.SUCCESS" class="mr-1" />
        <slot name="unit" />
      </div>

      <div
        v-if="counter"
        class="app-input__counter"
      >{{ `${localValue.toString().length}/${counter}` }}</div>

      <p
        class="app-input__error"
        v-if="message && localValidate == VALIDATE_STATUS.ERROR"
      >{{message}}</p>
    </div>
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
      localValidate: this.validate
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
        "input--size-xs": this.size === "xs",
        "input--size-sm": this.size === "sm",
        "input--size-md": this.size === "md" || !this.size,
        "input--size-lg": this.size === "lg"
      };
      return {
        ...classSize,
        ...disableClass,
        "app-input--has-counter": !!this.counter
      };
    },

    classLabel() {
      const labelBold = {
        "label-bold": this.labelBold
      };
      const labelFixed = {
        "label-fixed": this.labelFixed
      };
      return { ...labelBold, ...labelFixed };
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