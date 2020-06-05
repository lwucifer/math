<template>
  <div class="app-calendar-year">
    <table class="app-calendar-year__table">
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

    <button class="app-calendar-year__arrow app-calendar-year__arrow--left" @click="prevYearGroup">
      <IconCalendarChevronLeft class="icon fill-opacity-1" />
    </button>
    <button class="app-calendar-year__arrow app-calendar-year__arrow--right" @click="nextYearGroup">
      <IconCalendarChevronRight class="icon fill-opacity-1" />
    </button>
  </div>
</template>

<script>
import IconCalendarChevronLeft from "~/assets/svg/icons/calendar-chevron-left.svg?inline";
import IconCalendarChevronRight from "~/assets/svg/icons/calendar-chevron-right.svg?inline";

export default {
  components: {
    IconCalendarChevronLeft,
    IconCalendarChevronRight
  },

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
    const offset = this.value % 10;
    const firstYear = this.value - offset;

    return {
      localValue: this.value,
      firstYear,
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
    },

    firstYear(newValue) {
      this.getYears()
    }
  },

  methods: {
    // getYears() {
    //   const offset = this.localValue % 10;
    //   const lastYear = this.localValue - offset + 10;
    //   let yearCount = this.localValue - offset;
    //   let tmpDataYears = [];

    //   for (let i = 0; i < 5; i++) {
    //     tmpDataYears[i] = [];

    //     for (let j = 0; j < 2; j++) {
    //       tmpDataYears[i][j] = yearCount;
    //       if (yearCount >= lastYear) {
    //         break;
    //       }
    //       yearCount++;
    //     }
    //   }

    //   this.dataYears = tmpDataYears;
    // },
    getYears() {
      let yearCount = 0;
      let tmpDataYears = [];

      for (let i = 0; i < 5; i++) {
        tmpDataYears[i] = [];

        for (let j = 0; j < 2; j++) {
          tmpDataYears[i][j] = this.firstYear + yearCount;
          if (yearCount >= 10) {
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
        this.$emit("change", year);
      }
    },

    prevYearGroup() {
      this.firstYear -= 10;
    },

    nextYearGroup() {
      this.firstYear += 10;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-calendar-year.scss";
</style>