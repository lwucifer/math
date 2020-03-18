<template>
  <div class="container school-manager">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="5" />
      </div>
      <div class="col-md-9">
        <div class="bg-white">
          <div class="d-flex-center box12">
            <h5 class="color-primary">Hồ sơ giáo viên (Năm học 2018-2019)</h5>
            <n-link
              :to="'/school/manager/classroom/create'"
              class="ml-auto btn btn--size-sm btn--color-white btn--square btn--normal"
            >
              Thêm mới giáo viên
              <IconPlusCircle class="fill-primary ml-2" width="13" height="13" />
            </n-link>
          </div>
          <hr />
          <div>
            <div class="filter-form mt-4">
              <div class="filter-form__item">
                <app-button :size="'sm'" normal rounded>
                  <IconFilter />
                  <span>Lọc kết quả</span>
                </app-button>
              </div>

              <div class="filter-form__item" style="min-width: 12rem">
                <app-vue-select
                  class="app-vue-select filter-form__item__selection"
                  v-model="filter.course"
                  :options="courses"
                  label="text"
                  placeholder="Theo khối"
                  searchable
                  clearable
                  @input="handleChangedInput"
                  @search:focus="handleFocusSearchInput"
                  @search:blur="handleBlurSearchInput"
                ></app-vue-select>
              </div>

              <div class="filter-form__item" style="min-width: 22rem">
                <app-vue-select
                  class="app-vue-select filter-form__item__selection"
                  v-model="filter.status"
                  :options="statuses"
                  label="text"
                  placeholder="Theo giáo viên chủ nhiệm"
                  searchable
                  clearable
                  @input="handleChangedInput"
                  @search:focus="handleFocusSearchInput"
                  @search:blur="handleBlurSearchInput"
                ></app-vue-select>
              </div>

              <!--Right form-->
              <div class="filter-form__right">
                <div class="filter-form__item filter-form__item--search">
                  <app-input
                    type="text"
                    v-model="filter.query"
                    placeholder="Nhập để tìm kiếm..."
                    :size="'sm'"
                    @input="handleSearch"
                  />
                  <button type="submit">
                    <IconSearch width="15" height="15" />
                  </button>
                </div>
              </div>
              <!--End right form-->
            </div>
            <!--End filter form-->

            <!--Options group-->
            <div class="filter-form mt-3 mb-4">
              <app-button color="secondary" square :size="'sm'" normal>
                <IconTrash class="fill-white mr-2" width="13" height="13" />Xoá khỏi danh sách
              </app-button>
            </div>
            <!--Options group-->

            <!--Table-->
            <app-table
              :heads="heads"
              :pagination="pagination"
              @pagechange="onPageChange"
              :data="list"
              multiple-selection
              @selectionChange="selectRow"
            >
              <template v-slot:cell(teacher)="{row}">
                <td class="school-manager__table-tooltip">
                  <span class="text">{{row.teacher.name}}</span>
                  <div class="box-tooltip">
                    <h3>{{row.teacher.name}}</h3>
                    <div class="row">
                      <div class="col-md-6 mt-2">
                        <span>Số bài giảng: </span>
                        {{row.teacher.lessons}}
                      </div>
                      <div class="col-md-6 mt-2">
                        <span>Số bài tập: </span>
                        {{row.teacher.exercises}}
                      </div>
                      <div class="col-md-6 mt-2">
                        <span>Số học sinh: </span>
                        {{row.teacher.students}}
                      </div>
                      <div class="col-md-6 mt-2">
                        <span>Điểm đánh giá: </span>
                        {{row.teacher.rate}}
                      </div>
                    </div>
                  </div>
                </td>
              </template>
            </app-table>
            <!--End table-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolManagerSide from "~/components/page/school/manager/SchoolManagerSide";
import IconCalendar from "~/assets/svg/icons/calendar.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconDollarAlt from "~/assets/svg/design-icons/dollar-alt.svg?inline";
import IconChartLine from "~/assets/svg/design-icons/chart-line.svg?inline";
import IconUserUser from "~/assets/svg/icons/user-user.svg?inline";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrow from "~/assets/svg/icons/arrow.svg?inline";
import IconTrash from "~/assets/svg/icons/trash-alt.svg?inline";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";

// Import faked data
import { SCHOOL, CLASSROOMS } from "~/server/fakedata/school/test";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    SchoolManagerSide,
    IconUserUser,
    IconBook,
    IconCalendar,
    IconDollarAlt,
    IconChartLine,
    IconArrow,
    IconTrash,
    IconFilter,
    IconSearch,
    IconPlusCircle
  },

  data() {
    return {
      school: SCHOOL,
      heads: [
        {
          name: "name",
          text: "Khối"
        },
        {
          name: "grade",
          text: "Mã giáo viên"
        },
        {
          name: "teacher",
          text: "Giáo viên chủ nhiệm"
        }
      ],
      filter: {
        course: null,
        status: null,
        time: null
      },
      courses: [
        {
          value: 1,
          text: "Khóa học 1"
        },
        {
          value: 2,
          text: "Khóa học 2"
        }
      ],
      statuses: [
        {
          value: 1,
          text: "Status 1"
        },
        {
          value: 2,
          text: "Status 2"
        }
      ],
      isAuthenticated: true,
      pagination: {
        total: 15,
        page: 6,
        pager: 20,
        totalElements: 55,
        first: 1,
        last: 10
      },
      list: CLASSROOMS
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    },
    submit() {
      console.log("[Component] Elearning classroom: submitted");
    },
    handleChangedInput(val) {
      if (val !== null) {
      } else {
      }
      console.log("[Component] Elearning classroom: changing input...", val);
    },
    handleFocusSearchInput() {
      console.log("[Component] Elearning classroom: focus searching ");
    },
    handleBlurSearchInput() {
      console.log("[Component] Elearning exam: blur searching ");
    },
    handleSearch() {
      console.log("[Component] Elearning exam: searching");
    },
    selectRow(data) {
      console.log("change row: ", data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
@import "~/assets/scss/components/school/manager/_school-manager.scss";
</style>