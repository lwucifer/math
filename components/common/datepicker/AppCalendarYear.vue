<template>
  <table class="app-calendar-year">
    <tbody>
      <tr v-for="(row, index) in dataYears" :key="index">
        <td
          v-for="year in row"
          :key="year"
          :class="{ active: localValue === year }"
          @click="chooseYear(year)"
        >
          <span>{{ year }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },

  props: {
    value: {
      type: Number,
      default: new Date().getFullYear()
    }
  },

  data() {
    return {
      localValue: this.value,
      dataYears: []
    };
  },

  created() {
    this.getYears();
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
    getYears() {
      const offset = this.localValue % 10;
      const lastYear = (this.localValue - offset) + 10;
      let yearCount = this.localValue - offset;
      let tmpDataYears = [];

      for (let i = 0; i < 5; i++) {
        tmpDataYears[i] = [];

        for (let j = 0; j < 2; j++) {
          tmpDataYears[i][j] = yearCount;
          if (yearCount >= lastYear) {
            break;
          }
          yearCount++;
        }
      }

      this.dataYears = tmpDataYears;
    },

    chooseYear(year) {
      this.localValue = year;

      if (this.localValue === year) {
        this.$emit('change', year);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-calendar-year.scss";
</style>