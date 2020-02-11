<template>
  <div class="app-input" :class="classSize">
    <label v-if="label" :class="labelFixed ? 'label-fixed' : ''">{{label}}</label>
    <!-- Input upload -->
    <div class="app-input-file-upload" v-if="type == 'file'">
      <label for="file" class="app-input-file-upload__label">{{placeholder}}</label>
      <input id="file" type="file" class="app-input-file-upload__input" />
    </div>

    <!-- Input text -->
    <div class="app-input__input" v-else>
      <textarea
        v-if="textarea"
        :rows="rows"
        :type="type"
        :vlaue="value"
        @input="updateInput"
        :placeholder="placeholder"
        :class="validate == 2 ? 'border-red' : (validate == 1 ? 'border-primary' : '')"
      />
      <input
        v-else
        :type="type"
        :vlaue="text"
        @input="updateInput"
        :placeholder="placeholder"
        :class="validate == 2 ? 'border-red' : (validate == 1 ? 'border-primary' : '')"
      />
      <div class="unit" v-if="validate == 1 || unit">
        <IconSuccess height="14" width="14" v-if="validate == 1" class="mr-1" />
        <span>{{unit}}</span>
      </div>
      <p class="app-input__error" v-if="message && validate == 2">{{message}}</p>
    </div>
  </div>
</template>

<script>
import IconSuccess from "~/assets/svg/icons/success.svg?inline";

export default {
  components: {
    IconSuccess
  },
   model: {
    event: "input"
  },

  props: {
    value: {
      type: [String, Number],
      required: false,
      default: ""
    },
    validate: {
      type: [String, Number],
      required: false,
      default: 0
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
    message: {
      type: String,
      required: false,
      default: ""
    },
    label: String,
    unit: String,
    labelFixed: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    },
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
    updateInput: function(e) {
      this.$emit("input", e.target.value);
    }
  },

  computed: {
    text() { return this.value },

    classSize() {
      const classSize = {
        "input--size-xs": this.size === "xs",
        "input--size-sm": this.size === "sm",
        "input--size-md": this.size === "md" || !this.size,
        "input--size-lg": this.size === "lg",
      };
      return classSize;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-input.scss";
</style>