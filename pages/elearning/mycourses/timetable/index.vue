<template>
  <div class="container wrap__study-space page-mycourses-timetable">
    <div class="row">
      <div class="col-md-3">
        <MyCourseSide :active="5">
          <template slot="calendar">
            <div class="timetable-calendar-divider"></div>
            <app-calendar v-model="calendar" format="DD-MM-YYYY" />
          </template>
        </MyCourseSide>
      </div>

      <div class="col-md-9">
        <div class="mycourses">
          <h1 class="mycourses__title heading-4">Thời khoá biểu</h1>

          <div class="mycourses__content">
            <nav class="timetable-nav">
              <div class="timetable-nav__left">
                <h2 class="timetable-nav__title title">Học gì hôm nay?</h2>
                <a href class="timetable-nav__date">15 tháng 5, 2020</a>
              </div>

              <div class="timetable-nav__right">
                <a href class="timetable-nav__icon-text">
                  <IconCalendarDay class="icon fill-opacity-1" />Hôm nay
                </a>
                <a href class="timetable-nav__icon-text">
                  <IconCalendarWeek class="icon fill-opacity-1" />Tuần này
                </a>
                <a href class="timetable-nav__icon-text">
                  <IconCalendarMonth class="icon fill-opacity-1" />Tháng này
                </a>
                <app-dropdown>
                  <a slot="activator" href class="timetable-nav__more">
                    <IconMoreHoriz class="icon fill-opacity-1" />
                  </a>

                  <div>Dropdown content</div>
                </app-dropdown>
              </div>
            </nav>

            <div class="timetable-table">
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
                  <tr>
                    <td>
                      <span>26</span>
                    </td>
                    <td>
                      <span>27</span>
                    </td>
                    <td>
                      <span>28</span>
                    </td>
                    <td>
                      <span>29</span>
                    </td>
                    <td>
                      <span>29</span>
                    </td>
                    <td class="active">
                      <span class="active">1</span>
                    </td>
                    <td>
                      <span class="disabled">2</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="timetable-range-status">
              <span class="mr-2">Khoảng thời gian:</span>
              từ:
              <span class="text-primary mr-2">15 tháng 5, 2020</span> đến:
              <span class="text-primary">25 tháng 5, 2020</span>
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
      calendar: null
    };
  },

  methods: {}
};
</script>

<style lang="scss">
// @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
@import "~/assets/scss/components/elearning/_elearning-my-courses";
</style>

<style lang="scss" scoped>
@import "~/assets/scss/pages/elearning/mycourses/_timetable.scss";
</style>