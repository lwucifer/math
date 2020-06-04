<template>
  <table class="app-calendar-month">
    <tbody>
      <tr v-for="(row, index) in MONTHS_DISPLAY" :key="index">
        <td
          v-for="month in row"
          :key="month"
          :class="{ active: isMatchDate && MONTHS.indexOf(month) === localValue }"
          @click="chooseMonth(month)"
        >
          <span>{{ month }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemeber",
  "Decemeber"
];

const MONTHS_DISPLAY = [
  ["January", "February", "March"],
  ["April", "May", "June"],
  ["July", "August", "September"],
  ["October", "Novemeber", "Decemeber"]
];

export default {
  model: {
    prop: "value",
    event: "change"
  },

  props: {
    value: {
      type: Number,
      default: new Date().getMonth()
    },
    isMatchDate: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      MONTHS: Object.freeze(MONTHS),
      MONTHS_DISPLAY: Object.freeze(MONTHS_DISPLAY),
      localValue: this.value
    };
  },

  watch: {
    value(newValue) {
      this.localValue = newValue;
    },

    localValue(newValue) {
      this.$emit("change", newValue);
    }
  },

  methods: {
    chooseMonth(month) {
      const newValue = MONTHS.indexOf(month);
      this.localValue = newValue;

      if (this.localValue === newValue) {
        this.$emit("change", newValue);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-calendar-month.scss";
</style>