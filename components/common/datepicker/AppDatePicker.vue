<template>
  <div class="app-date-picker" :class="classes">
    <label v-if="label">{{label}}</label>
    <date-picker v-model="text" @change="change()" valuetype="format" format="DD/MM/YYYY"></date-picker>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    DatePicker
  },

  props: {
    value: [String, Number],
    label: String,
    size: String,
    square: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      text: null
    };
  },

  methods: {
    change: function() {
      this.$emit("input", this.text);
    }
  },

  computed: {
    classes() {
      const sizeClasses = {
        "size-xs": this.size === "xs",
        "size-sm": this.size === "sm",
        "size-md": this.size === "md",
        "size-lg": this.size === "lg",
      };
      const borderRadiusClasses = {
        "square": this.square,
      };

      return {...sizeClasses, ...borderRadiusClasses}
    }
  },

  created() {
    this.text = this.value;
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-date-picker.scss";
</style>