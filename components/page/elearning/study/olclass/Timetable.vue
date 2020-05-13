<template>
  <app-modal
    centered
    :width="922"
    :component-class="{ 'time-table-modal': true }"
    :footer="false"
    title="Thời khóa biểu"
    @close="$emit('close')"
  >
    <div slot="content">
      <div
        class="table_schedule"
        v-for="(timetable, index) in timetables"
        :key="index"
      >
        <h5 class="text-primary mb-4">
          Thời gian từ ngày {{ timetable.from_date }} đến
          {{ timetable.to_date }}
        </h5>
        <app-table :heads="heads" :data="timetable.schedules">
          <!-- <template v-slot:cell(day)="{ row }">
            <td v-if="row.day == 1">Sáng</td>
            <td v-else-if="row.day == 2">Chiều</td>
            <td v-else-if="row.day == 3">Tối</td>
          </template> -->
        </app-table>
      </div>
    </div>
  </app-modal>
</template>

<script>
export default {
  data() {
    return {
      list: [
        // {
        //   mon: "9:00 - 10:00 11:00 - 12:00",
        //   web: ["9:00 - 10:00"],
        //   thu: ["9:00 - 10:00"],
        //   fri: ["9:00 - 10:00"],
        //   sat: ["9:00 - 10:00"],
        //   sun: ["9:00 - 10:00"],
        //   day: 1
        // },
        // {
        //   mon: "3:00 - 4:00",
        //   tue: ["3:00 - 4:00"],
        //   web: ["3:00 - 4:00"],
        //   thu: ["3:00 - 4:00"],
        //   fri: ["3:00 - 4:00"],
        //   sat: ["3:00 - 4:00"],
        //   sun: ["3:00 - 4:00"],
        //   day: 2
        // },
        // {
        //   mon: ["19:00 - 21:00"],
        //   tue: ["19:00 - 21:00"],
        //   web: ["19:00 - 21:00"],
        //   thu: ["19:00 - 21:00"],
        //   fri: ["19:00 - 21:00"],
        //   sat: ["19:00 - 21:00"],
        //   sun: ["19:00 - 21:00"],
        //   day: 3
        // }
      ],
      heads: [
        {
          name: "day",
          text: ""
        },
        {
          name: "mon",
          text: "Thứ 2"
        },

        {
          name: "tue",
          text: "Thứ 3"
        },
        {
          name: "web",
          text: "Thứ 4"
        },
        {
          name: "thu",
          text: "Thứ 5"
        },
        {
          name: "fri",
          text: "Thứ 6"
        },
        {
          name: "sat",
          text: "Thứ 7"
        },
        {
          name: "sun",
          text: "Chủ nhật"
        }
      ]
    };
  },

  props: {
    timetables: {
      type: Array,
      default: () => []
    }
  },

  created() {
    console.log("[timetables]", this.timetables);
  }
};
</script>

<style lang="scss">
.table_schedule {
  table {
    width: 100%;
    border: 1px solid #eeeeee;
  }
  th,
  td {
    border: 1px solid #eeeeee;
  }
  th {
    width: 108px;
    height: 60px;
  }
  tr {
    border: 1px solid red;
  }
}
</style>
