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
          :class="{ active: isMatchDate && (localValue === data.date) && data.current, 'current-month': data.current }"
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
  model: {
    prop: "value",
    event: "change"
  },

  props: {
    dates: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: new Date().getDate()
    },
    isMatchDate: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      DAYS: Object.freeze(DAYS),
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
    chooseDate(index) {
      this.localValue = index;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-calendar-date.scss";
</style>