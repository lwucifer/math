<template>
  <div class="app-date-picker" :class="classes">
    <label v-if="label">{{label}}</label>
    <date-picker
      v-model="text"
      @change="change()"
      valueType="format"
      :format="valueFormat"
      :type="type"
      :placeholder="placeholder"
      :disabled	="disabled"
      :range="range"
      :range-separator="rangeSeparator"
      :shortcuts="shortcuts"
      :popup-class="popupClass"
      :minute-step="minuteStep"
      :value-type="valueType"
      :hour-options="hourOptions"
    >
      <template v-slot:icon-calendar>
        <slot name="icon-calendar"></slot>
      </template>

      <template v-slot:icon-clear>
        <slot name="icon-clear"></slot>
      </template>
    </date-picker>
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
    value: [String, Number, Date, Array],
    label: String,
    size: String,
    square: {
      type: Boolean,
      required: false,
      default: false
    },
    minuteStep: [String, Number],
    valueType: String,
    hourOptions: Array,
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    valueFormat: {
      type: String,
      default: 'DD/MM/YYYY'
    },
    type: {
      type: String,
      default: 'date',
      validator: value => ['date', 'datetime', 'year', 'month', 'time', 'week'].includes(value)
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    },
    rangeSeparator: {
      type: String,
      default: '-'
    },
    shortcuts: {
      type: Array,
      default: () => []
    },
    popupClass:{
      type: String,
      default:''
    }
  },

  data() {
    return {
      text: null
    };
  },

  methods: {
    change: function() {
      //if(!this.value) this.text = null;
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
    this.text = this.value ? this.value : null;
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-date-picker.scss";
</style>