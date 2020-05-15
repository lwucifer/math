<template>
  <div>
      <table>
          <thead>
            <tr>
            <th class="day"></th>
              <th v-for="(head,index) in heads" :key="index" v-html="head.text"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(itemList,a) in list" :key="a">
              <th class="day">{{a | day2Txt}}</th>
              <th v-for="(head,index) in heads" :key="index">
                  {{convertArray(itemList[head.name])}}
              </th>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>
import { get, join, map, transform } from "lodash";
export default {
    filters: {
        day2Txt(str ="") {
            if(str === "morning"){
                return "Sáng"
            }
            if(str === "afternoon"){
                return "Chiều"
            }
            if(str === "evening"){
                return "Tối"
            }
        }
    },
  data() {
    return {
      list: {
          morning:{
            mon: ["9:00 - 10:00","11:00 - 12:00"],
            web: ["9:00 - 10:00","11:00 - 12:00"],
            thu: ["9:00 - 10:00"],
            fri: ["9:00 - 10:00"],
            sat: ["9:00 - 10:00"],
            sun: ["9:00 - 10:00"]
          },
          afternoon:{
            mon: ["9:00 - 10:00","11:00 - 12:00"],
            tue: ["9:00 - 10:00"],
            thu: ["9:00 - 10:00"],
            fri: ["9:00 - 10:00"],
            sat: ["9:00 - 10:00"],
            sun: ["9:00 - 10:00"]
          },
          evening:{
            
          }
      },
      heads: [

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
    }

  },
    methods:{
        get,
        convertArray(list){
            let convert = _.map(list).join('\r\n')
            return convert
        },
    
    },
  props: {
    timetables: {
      type: Array,
      default: () => []
    }
  },

  computed: {
  },

  created() {
    console.log("[timetables]", this.timetables);
    this.sortList();
  }
};
</script>

<style lang="scss">
.table_schedule {
  table {
    width: 100%;
    border: 1px solid #eeeeee;
    text-align: center;
  }
  th,
  td {
    border: 1px solid #eeeeee;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
  }
  th {
    width: 108px;
    height: 60px;
  }
  thead, .day{
      background: #FBFBFB;
  }
}

</style>
