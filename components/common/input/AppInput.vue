<template>
  <div class="app-input">
    <div>
      <label v-if="label">{{label}}</label>
      <div class="app-input__input">
        <input
          :type="type"
          v-model="text"
          :class="validate == 2 ? 'border-red' : (validate == 1 ? 'border-primary' : '')"
        />
        <div class="unit" v-if="validate == 1 || unit">
          <IconSuccess height="14" width="14" v-if="validate == 1" class="mr-1" />
          <span>{{unit}}</span>
        </div>
        <p class="app-input__error" v-if="message && validate == 2">{{message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import IconSuccess from "~/assets/svg/icons/success.svg?inline";

export default {
  components: {
    IconSuccess
  },

  props: {
    validate: {
      type: [String, Number],
      required: false,
      default: 0
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    message: {
      type: String,
      required: false,
      default: ""
    },
    label: String,
    unit: String
  },

  data() {
    return {};
  },

  methods: {
    change: function() {
      this.$emit("input", this.text);
    }
  },

  computed: {
    text() {
      return this.value;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-input.scss";
</style>