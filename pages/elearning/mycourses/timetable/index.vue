<template>
  <div class="container wrap__study-space page-mycourses-timetable">
    <div class="row">
      <div class="col-md-3">
        <MyCourseSide :active="5">
          <template slot="calendar">
            <div class="timetable-calendar-divider"></div>
            <app-calendar v-model="calendar" @changeDateToday="changeDateToday" />
          </template>
        </MyCourseSide>
      </div>

      <div class="col-md-9">
        <div class="mycourses">
          <h1 class="mycourses__title heading-4">Thời khoá biểu</h1>

          <div class="mycourses__content">
            <app-range-picker />

            <!-- <app-date-picker
              type="datetime"
              range
              placeholder="Select datetime range"
            ></app-date-picker>-->
            <nav class="timetable-nav">
              <div class="timetable-nav__left">
                <h2 class="timetable-nav__title title">Học gì hôm nay?</h2>
                <a href class="timetable-nav__date">{{todayDate}}</a>
              </div>

              <div class="timetable-nav__right">
                <a
                  href
                  class="timetable-nav__icon-text"
                  :class="checkTimeTable ? 'active' :''"
                  @click.prevent="selectDay"
                >
                  <IconCalendarDay class="icon fill-opacity-1" />Hôm nay
                </a>
                <a
                  href
                  class="timetable-nav__icon-text"
                  :class="checkTimeTableWeek ? 'active' :''"
                  @click.prevent="selectWeek"
                >
                  <IconCalendarWeek class="icon fill-opacity-1" />Tuần này
                </a>
                <a
                  href
                  class="timetable-nav__icon-text"
                  :class="checkTimeTableMonth ? 'active' :''"
                  @click.prevent="selectMonth"
                >
                  <IconCalendarMonth class="icon fill-opacity-1" />Tháng này
                </a>
                <app-dropdown class="timetable-nav__dropdown" position="bottomRight">
                  <a slot="activator" href class="timetable-nav__more" @click.prevent>
                    <IconMoreHoriz class="icon fill-opacity-1" />
                  </a>

                  <div class="timetable-nav__dropdown-content">Chọn thời gian khác</div>
                </app-dropdown>
              </div>
            </nav>

            <div class="timetable-table" v-if="checkTimeTable">
              <table class="timetable-table__table">
                <thead>
                  <tr>
                    <th>Thứ 2</th>
                    <th>Thứ 3</th>
                    <th>Thứ 4</th>
                    <th>Thứ 5</th>
                    <th>Thứ 6</th>
                    <th>Thứ 7</th>
                    <th>Chủ nhật</th>
                  </tr>
                </thead>

                <tbody>
                  <tr class="item">
                    <td v-for="(item, index) in dayslist" :key="index">
                      <span
                        v-if="item == dayslist[dayslist.length -1]"
                        class="sunday"
                        @click="changeDateInWeek(item)"
                        :class="checkDate(item) ? 'active' :''"
                      >{{item | moment('DD')}}</span>
                      <span
                        v-else
                        :class="checkDate(item) ? 'active' :''"
                        @click="changeDateInWeek(item)"
                      >{{item | moment('DD')}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="timetable-range-status" v-if="checkTimeTableWeek">
              <span class="mr-2">Khoảng thời gian:</span>
              từ:
              <span class="text-primary mr-2">{{firstDayWeek}}</span> đến:
              <span class="text-primary">{{lastDayWeek}}</span>
            </div>
            <div class="timetable-range-status" v-if="checkTimeTableMonth">
              <span class="mr-2">Khoảng thời gian:</span>
              từ:
              <span class="text-primary mr-2">{{firstDayMonth}}</span> đến:
              <span class="text-primary">{{lastDayMonth}}</span>
            </div>

            <ul class="timetable-list">
              <li class="timetable-list-item active" v-for="i in 10" :key="i">
                <span class="timetable-list-item__dot"></span>
                <span class="timetable-list-item__title">Làm bài kiểm tra</span>
                <span class="timetable-list-item__subtitle">Bài kiểm tra chất lượng số 2</span>
                <span class="timetable-list-item__time">Thời gian bắt đầu: 13:00</span>
              </li>
            </ul>

            <app-pagination
              class="mt-5"
              :pagination="{
                total: 4,
                size: 10,
                page: 1,
                total_elements: 45,
                first: 1,
                last: 1,
                number: 1,
                number_of_elements: 45,
                total_pages: 4
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import MyCourseSide from "~/components/page/elearning/mycourses/MyCourseSide";
import IconCalendarDay from "~/assets/svg/icons/calendar-day.svg?inline";
import IconCalendarWeek from "~/assets/svg/icons/calendar-week.svg?inline";
import IconCalendarMonth from "~/assets/svg/icons/calendar-month.svg?inline";
import IconMoreHoriz from "~/assets/svg/v2-icons/more_horiz_24px.svg?inline";
import { mapMutations } from "vuex";
import { TIMETABLE } from "../../../../utils/mutation-types";
const STORE_NAME_TIMETABLE = "elearning/mycourses/timetable";

export default {
  middleware: ["authenticated"],

  components: {
    MyCourseSide,
    IconCalendarDay,
    IconCalendarWeek,
    IconCalendarMonth,
    IconMoreHoriz
  },

  data() {
    return {
      calendar: moment(),
      dayslist: [],
      dateSchedule: moment(),
      todayDate: moment().format("D MMMM, YYYY"),
      checkTimeTable: true,
      checkTimeTableMonth: false,
      checkTimeTableWeek: false,
      firstDayWeek: moment()
        .startOf("week")
        .format("D MMMM, YYYY"),
      lastDayWeek: moment()
        .endOf("week")
        .format("D MMMM, YYYY"),
      firstDayMonth: moment()
        .startOf("month")
        .format("D MMMM, YYYY"),
      lastDayMonth: moment()
        .endOf("month")
        .format("D MMMM, YYYY")
    };
  },
  created() {
    this.changeDate(this.calendar);
  },
  methods: {
    ...mapMutations(STORE_NAME_TIMETABLE, ["setStateTimeTable"]),
    changeDate(date) {
      this.dayslist.length = 0;
      for (let i = 1; i <= 7; i++) {
        const day = moment(date).day(i);
        this.dayslist.push(day);
      }
      // console.log("this.dayslist", this.dayslist);
      // console.log("a", moment(date));
    },
    checkDate(d1) {
      let date1 = moment(d1)
        .format("YYYY-MM-DD")
        .toString();
      let date2 = moment(this.calendar)
        .format("YYYY-MM-DD")
        .toString();
      if (date1 == date2) {
        return true;
      } else return false;
    },
    changeDateInWeek(i) {
      this.calendar = moment(i);
      this.setStateTimeTable(this.calendar);
      this.todayDate = moment(i).format("D MMMM, YYYY");
      // console.log(this.calendar);
    },
    selectDay() {
      this.checkTimeTable = true;
      this.checkTimeTableMonth = false;
      this.checkTimeTableWeek = false;
    },
    selectWeek() {
      this.checkTimeTableWeek = true;
      this.checkTimeTableMonth = false;
      this.checkTimeTable = false;
    },
    selectMonth() {
      this.checkTimeTableMonth = true;
      this.checkTimeTableWeek = false;
      this.checkTimeTable = false;
    },
    changeDateToday(value) {
      this.checkTimeTable = false;
      // console.log("[changeDateToday] value", value);
      this.todayDate = value.format("D MMMM, YYYY");
    }
  }
};
</script>

<style lang="scss">
// @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
@import "~/assets/scss/components/elearning/_elearning-my-courses";
</style>

<style lang="scss" scoped>
@import "~/assets/scss/pages/elearning/mycourses/_timetable.scss";
</style>