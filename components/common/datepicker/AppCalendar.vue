<template>
  <div class="app-calendar">
    <div class="app-calendar__nav">
      <div class="app-calendar__select-year">
        {{ MONTHS[month] }} {{ year }}
        <IconCalendarArrowDown class="icon fill-opacity-1" />
      </div>
      <div class="app-calendar__nav-right">
        <button class="app-calendar__nav-btn" @click="prevMonth">
          <IconCalendarChevronLeft class="icon fill-opacity-1" />
        </button>
        <button class="app-calendar__nav-btn" @click="nextMonth">
          <IconCalendarChevronRight class="icon fill-opacity-1" />
        </button>
      </div>
    </div>

    <table class="app-calendar__table">
      <thead>
        <tr>
          <th v-for="day in DAYS" :key="day">{{ day }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in dataDates" :key="index">
          <td
            v-for="data in row"
            :key="data"
            :class="{ active: localValue.isSame(new Date(year, month, data)) }"
            @click="chooseDate(data)"
          >
            <span>{{ data }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import IconCalendarChevronLeft from "~/assets/svg/icons/calendar-chevron-left.svg?inline";
import IconCalendarChevronRight from "~/assets/svg/icons/calendar-chevron-right.svg?inline";
import IconCalendarArrowDown from "~/assets/svg/icons/calendar-arrow-down.svg?inline";

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
const DAYS = ["M", "T", "W", "Th", "F", "Sa", "S"];

export default {
  components: {
    IconCalendarChevronLeft,
    IconCalendarChevronRight,
    IconCalendarArrowDown
  },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    value: {
      type: Object,
      default: moment()
    },
    format: {
      type: String,
      default: "DD/MM/YYYY"
    },
    displayFormat: {
      type: String,
      default: "DD/MM/YYYY"
    }
  },

  data() {
    const initialValue = this.value || moment();

    return {
      month: initialValue.month(),
      year: initialValue.year(),
      date: initialValue.date(),
      MONTHS: Object.freeze(MONTHS),
      DAYS: Object.freeze(DAYS),
      dataDates: [],
      localValue: initialValue
    };
  },

  created() {
    this.getDays();
  },

  watch: {
    month(newValue) {
      this.getDays();
    },

    year(newValue) {
      this.getDays();
    },

    value(newValue) {
      this.localValue = newValue;
    },

    localValue(newValue) {
      this.$emit("change", newValue);
    }
  },

  methods: {
    getDays() {
      const firstDay = new Date(this.year, this.month, 1);
      const lastDay = new Date(this.year, this.month + 1, 0);
      let offset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
      let dayCount = 1;

      for (let i = 0; i < 5; i++) {
        this.dataDates[i] = [];

        for (let j = 0; j < 7; j++) {
          if (offset === 0) {
            this.dataDates[i][j] = dayCount;
            if (dayCount >= lastDay.getDate()) {
              break;
            }
            dayCount++;
          } else {
            this.dataDates[i][j] = null;
            offset--;
          }
        }
      }
    },

    nextMonth() {
      if (this.month < 11) {
        this.month += 1;
      }
      console.log("this.month", this.month);
    },

    prevMonth() {
      if (this.month > 0) {
        this.month -= 1;
      }
      console.log("this.month", this.month);
    },

    nextYear() {
      this.year += 1;
    },

    prevYear() {
      this.year -= 1;
    },

    chooseDate(date) {
      this.date = date;
      this.localValue = moment(new Date(this.year, this.month, date));
      console.log(this.localValue.month())
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-calendar.scss";
</style>
