<template>
  <div class="app-range-picker">
    <app-calendar
      class="app-range-picker__calendar app-range-picker__calendar--start"
      :value="startDate"
      @change="handleChangeStartDate"
    />
    <app-calendar
      class="app-range-picker__calendar app-range-picker__calendar--end"
      :value="endDate"
      @change="handleChangeEndDate"
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
    handleChangeStartDate(date) {
      this.startDate = date;
    },

    handleChangeEndDate(date) {
      this.endDate = date;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-range-picker.scss";
</style>