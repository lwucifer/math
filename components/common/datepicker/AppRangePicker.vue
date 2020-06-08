<template>
  <div class="app-range-picker">
    <app-range-picker-calendar
      class="app-range-picker__calendar app-range-picker__calendar--start"
      :value="localValue"
      @change="handleChangeDate"
    />
    <app-range-picker-calendar
      class="app-range-picker__calendar app-range-picker__calendar--end"
      :value="localValue"
      :index="1"
      @change="handleChangeDate"
    />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      appRangePicker: this
    };
  },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      localValue: this.value,
      startDate: this.value[0] || null,
      endDate: this.value[1] || null
    };
  },

  watch: {
    value(newValue) {
      this.localValue = newValue;
    },

    localValue(newValue) {
      // this.startDate = newValue[0] || null;
      // this.endDate = newValue[1] || null;
      this.$emit("change", newValue);
    },

    startDate(newValue) {
      this.localValue[0] = newValue;
    },

    endDate(newValue) {
      this.localValue[1] = newValue;
    }
  },

  methods: {
    handleChangeDate(date = []) {
      this.localValue = date;
    },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-range-picker.scss";
</style>