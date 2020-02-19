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
        :value="value"
        @input="updateInput"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="validate == 2 ? 'border-red' : (validate == 1 ? 'border-primary' : '')"
      />
      <!-- Input Text  -->
      <input
        v-else
        v-bind="$attrs"
        :type="type"
        :value="value"
        :disabled="disabled"
        @input="updateInput"
        :placeholder="placeholder"
        :class="validate == 2 ? 'border-red' : (validate == 1 ? 'border-primary' : '')"
      />
      <div class="unit" v-if="validate == 1 || hasUnitSlot">
        <IconSuccess height="14" width="14" v-if="validate == 1" class="mr-1" />
        <slot name="unit"/>
      </div>
      <p class="app-input__error" v-if="message && validate == 2">{{message}}</p>
    </div>
  </div>
</template>

<script>
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
      default: 0
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
  },

  data() {
    return {};
  },

  methods: {
    updateInput: function(event) {
      this.$emit("input", event.target.value);
    }
  },

  computed: {
    hasUnitSlot() {
      return !!this.$slots['unit'];
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
      return { ...classSize, ...disableClass };
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
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-input.scss";
</style>