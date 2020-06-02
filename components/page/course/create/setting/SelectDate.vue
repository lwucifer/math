<template>
  <div>
    <app-date-picker
      size="sm"
      placeholder="dd/mm/yyyy"
      value-type="YYYY-MM-DD"
      class="mr-3"
      @input="handleChangeDate"
      :value="date"
    >
      <template v-slot:icon-calendar>
        <IconCalender class="fill-primary" />
      </template>
    </app-date-picker>

    <app-date-picker
      size="sm"
      type="time"
      placeholder="HH:mm:ss"
      value-format="HH:mm:ss"
      class="ml-0 mr-6"
      @input="handleChangeTime"
      :value="time"
    />
  </div>
</template>

<script>
import IconCalender from "~/assets/svg/v2-icons/calendar_today_24px.svg?inline";
import moment from "moment";

export default {
  components: {
    IconCalender,
  },

  props: {
    value: {},
  },

  data() {
    return {
      date: "",
      time: "",
    };
  },

  watch: {
    value: {
      handler: function() {
        this.date = moment(this.value).format("YYYY-MM-DD");
        this.time = moment(this.value).format("HH:mm:ss");
      },
    },
    date: {
      handler: function() {
        let time = this.date;
        if (this.time && time) time += " " + this.time;
        this.$emit("onChange", time);
      },
    },
    time: {
      handler: function() {
        let time = this.date;
        if (this.time && time) time += " " + this.time;
        this.$emit("onChange", time);
      },
    },
  },

  methods: {
    handleChangeDate(date) {
      this.date = date;
    },
    handleChangeTime(time) {
      this.time = time;
    },
  },
};
</script>
