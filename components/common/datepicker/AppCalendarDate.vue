<template>
  <table class="app-calendar-date">
    <thead>
      <tr>
        <th v-for="day in DAYS" :key="day">{{ day }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, index) in dates" :key="index">
        <td
          v-for="(data, i) in row"
          :key="i"
          :class="{
            'current-month': data.current,
            'active': isMatchDate && activeDates.includes(data.index),
            'in-range': isMatchDate && inrangeDates.includes(data.index)
          }"
          @click="chooseDate(data.index)"
        >
          <span v-if="data !== null">{{ data.date }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const DAYS = ["M", "T", "W", "Th", "F", "Sa", "S"];

export default {
  props: {
    dates: {
      type: Array,
      default: () => []
    },
    activeDates: {
      type: Array,
      default: () => []
    },
    inrangeDates: {
      type: Array,
      default: () => []
    },
    isMatchDate: Boolean
  },

  data() {
    return {
      DAYS: Object.freeze(DAYS)
    };
  },

  methods: {
    chooseDate(index) {
      this.$emit("change", index);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-calendar-date.scss";
</style>