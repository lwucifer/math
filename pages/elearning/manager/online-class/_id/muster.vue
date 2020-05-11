<template>
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="5" />
      </div>
      <div class="col-md-9">
        <h5 class="page-title">
          {{lessonInfo.name}}
        </h5>
        <div class="elearning-manager-content">

          <div class="elearning-manager-content__main pt-3">
            <div class="elearning-wrapper">
              <!--Info group-->
              <h5 class="color-primary mb-15">{{lessonInfo.name}}</h5>
              <div class="class-info mb-4 border">
                <strong>
                  {{lessonInfo.start_time}} - {{lessonInfo.end_time}}
                </strong>
                <div class="class-info-content mt-3">
                  <div class="item">
                    Tỷ lệ có mặt:
                    <strong class="color-primary">{{summary.total_student_absent_allowed}}</strong>
                  </div>
                  <div class="item">
                    Tỷ lệ vắng có mặt:
                    <strong class="color-primary">{{summary.total_student_absent_not_allowed}}</strong>
                  </div>
                  <div class="item">
                    Tỷ lệ vắng mặt có phép:
                    <strong class="color-primary">{{summary.total_student_late}}</strong>
                  </div>
                  <div class="item">
                    Tỷ lệ vắng mặt không phép:
                    <strong class="color-primary">{{summary.total_student_present}}</strong>
                  </div>
                </div>
              </div>
              <!--end info group-->

              <!--Filter form-->
              <div class="filter-form">
                <div class="filter-form__item flex-1">
                  <div style="width: 100%">
                    <app-search
                      class
                      :placeholder="'Nhập để tìm kiếm...'"
                      v-model="params.query"
                      :size="'sm'"
                    ></app-search>
                  </div>
                </div>

                <div class="filter-form__item">
                  <app-button
                    color="primary"
                    square
                    class="filter-form__item__btn filter-form__item__btn--submit"
                    :size="'sm'"
                    @click="submit"
                  >
                    <IconHamberger class="fill-white mr-2" />
                    <span class="color-white">Lọc kết quả</span>
                  </app-button>
                </div>

                <div class="filter-form__item" style="min-width: 12rem">
                  <app-vue-select
                    class="app-vue-select filter-form__item__selection"
                    v-model="filterCourse"
                    :options="courses"
                    label="text"
                    placeholder="Lớp học"
                    searchable
                    clearable
                    @input="handleChangedCourse"
                    @search:focus="handleFocusSearchInput"
                    @search:blur="handleBlurSearchInput"
                  ></app-vue-select>
                </div>
                <div class="filter-form__item" style="min-width: 12rem">
                  <app-vue-select
                    class="app-vue-select filter-form__item__selection"
                    v-model="filterCourse"
                    :options="courses"
                    label="text"
                    placeholder="Điểm danh"
                    searchable
                    clearable
                    @input="handleChangedCourse"
                    @search:focus="handleFocusSearchInput"
                    @search:blur="handleBlurSearchInput"
                  ></app-vue-select>
                </div>
              </div>
              <!--End filter form-->

              <div class="d-flex mb-15">
                <button class="color-primary bold">Cập nhật kết quả điểm danh</button>
                <i class="ml-auto">*Kết quả điểm danh được cập nhật lần cuối vào lúc 10:00 AM, 18/10/2020</i>
              </div>

              <!--Table-->
              <app-table
                :heads="heads"
                :pagination="pagination"
                @pagechange="onPageChange"
                :data="lessons"
              >
                <template v-slot:cell(attendance_status)="{row, index}">
                  <td>
                    <div class="div-table">
                      <app-checkbox :checked="row.attendance_status == 'M'" @change="updateStatus(row.online_attendance_id, 'M', index)"/>
                      <app-checkbox :checked="row.attendance_status == 'K'" @change="updateStatus(row.online_attendance_id, 'K', index)"/>
                      <app-checkbox :checked="row.attendance_status == 'P'" @change="updateStatus(row.online_attendance_id, 'P', index)"/>
                      <app-checkbox :checked="row.attendance_status == 'C'" @change="updateStatus(row.online_attendance_id, 'C', index)"/>
                    </div>
                  </td>
                </template>
                <template v-slot:cell(attendance_point)="{row}">
                  <td class="text-center">
                    {{row.attendance_point}}%
                  </td>
                </template>
              </app-table>
              <!--End table-->
            </div>

            <div class="bottom-content">
              <div class="top">
                <i >
                  *Điểm chuyên cần của học sinh được tính dựa trên tỷ lệ tham gia <b>Phòng học online số 1</b> theo yêu cầu của giáo viên
                </i>
              </div>
              <div class="bottom">
                <p><strong class="color-primary">M</strong> = Đi muộn</p>
                <p><strong class="color-primary">K</strong> = Không phép</p>
                <p><strong class="color-primary">P</strong> = Có phép</p>
                <p><strong class="color-primary">C</strong> = Có mặt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrow from "~/assets/svg/icons/arrow.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconTrash from "~/assets/svg/icons/trash-alt.svg?inline";
import IconPlusCircle from '~/assets/svg/design-icons/plus-circle.svg?inline';
import IconLock2 from '~/assets/svg/icons/lock2.svg?inline';
import IconLockOpenAlt from '~/assets/svg/design-icons/lock-open-alt.svg?inline';
import IconHamberger from '~/assets/svg/icons/hamberger.svg?inline';
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";

export default {
  layout: "manage",
    
  components: {
    IconHamberger,
    IconFilter,
    IconSearch,
    IconArrow,
    IconCalendar,
    IconTrash,
    IconPlusCircle,
    IconLock2,
    IconLockOpenAlt,
    ElearningManagerSide
  },

  data() {
    return {
      lessonInfo: {},
      openModal: false,
      heads: [
        {
          name: "student_name",
          text: "Học sinh",
          sort: true
        },
        {
          name: "class_name",
          text: "Lớp",
          sort: true
        },
        {
          name: "attendance_status",
          text: "<p class='text-center'>Điểm danh</p><div class='bottom'><span>M</span><span>K</span><span>P</span><span>C</span></div>",
          sort: true
        },
        {
          name: "attendance_point",
          text: "<p class='text-center'>Điểm chuyên cần</p>",
          sort: true
        },
      ],
      summary: {
        total_student_absent_allowed: 0,
        total_student_absent_not_allowed: 0,
        total_student_late: 0,
        total_student_present: 0,
      },
      courses: [],
      filterCourse: null,
      pagination: {
        total: 0,
        number: 0,
        size: 10,
        totalElements: 0,
        first: 0,
        last: 0
      },
      lessons: [],
      params: {
        page: 1,
        size: 10,
        class_id: null,
        query: null
      },
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateLessonInfo: "LessonInfo"
    }),
    ...mapState(STORE_SCHOOL_CLASSES, {
      stateSchoolClasses: "schoolClasses"
    }),
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      that.params.size = that.pagination.size;
      that.params.page = that.pagination.number + 1;
      that.getList();
    },
    submit() {
      this.params = {...this.params};
      this.getList();
    },
    handleChangedCourse(val) {
      this.params.class_id = this.filterCourse.value;
    },
    handleFocusSearchInput() {
    },
    handleBlurSearchInput() {
    },
    handleSearch() {
    },

    formatAMPM(date, year = false) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      let strDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
      let str = year ? strTime + ' ' + strDate : strTime;
      return str;
    },
    async getLessonInfo() {
      try {
        this.loading = true;
        const lesson_id  = this.$route.params.id ? this.$route.params.id : "";
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSONS.INFO}`,
          lesson_id
        );
        this.lessonInfo = this.get(this.stateLessonInfo, 'data', []);
        this.lessonInfo = {
          ...this.lessonInfo,
          start_time: this.formatAMPM(new Date(this.lessonInfo.start_time)),
          end_time: this.formatAMPM(new Date(this.lessonInfo.end_time), true),
        };
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    async getList() {
      try {
        this.loading = true;
        const lesson_id  = this.$route.params.id ? this.$route.params.id : "";
        let params = { ...this.params };
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.LIST}`,
          { params, id: lesson_id, after: 'attendances'}
        );
        this.lessons = this.get(this.stateAttendances, 'data.attendance_list.content', [])
        this.pagination.size = this.get(this.stateAttendances, 'data.attendance_list.size', 10)
        this.pagination.first = this.get(this.stateAttendances, 'data.attendance_list.first', 1)
        this.pagination.last = this.get(this.stateAttendances, 'data.attendance_list.last', 1)
        this.pagination.number = this.get(this.stateAttendances, 'data.attendance_list.number', 0)
        this.pagination.totalPages = this.get(this.stateAttendances, 'data.attendance_list.total_pages', 0)
        this.pagination.totalElements = this.get(this.stateAttendances, 'data.attendance_list.total_elements', 0)
        this.pagination.numberOfElements = this.get(this.stateAttendances, 'data.attendance_list.number_of_elements', 0)
        this.summary.total_student_absent_allowed = this.get(this.stateAttendances, 'data.total_student_absent_allowed', 0)
        this.summary.total_student_absent_not_allowed = this.get(this.stateAttendances, 'data.total_student_absent_not_allowed', 0)
        this.summary.total_student_late = this.get(this.stateAttendances, 'data.total_student_late', 0)
        this.summary.total_student_present = this.get(this.stateAttendances, 'data.total_student_present', 0)
      } catch (e) {

      } finally {
        this.loading = false
      }
    },
    
    async updateStatus(id, status, index) {
      let list = [...this.lessons];
      list[index] = {...list[index], attendance_status: status};
      this.lessons = list;
      try {
        let attendances = [
          {
            online_attendance_id: id,
            attendance_status: status
          }
        ];
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.EDIT}`,
          { attendances }
        );
      } catch (e) {
      } finally {
      }
    },

    async getSchoolClasses() {
      try {
        await this.$store.dispatch(
          `${STORE_SCHOOL_CLASSES}/${actionTypes.SCHOOL_CLASSES.LIST}`
        );
        let lessonList = this.get(this.stateSchoolClasses, "data.content", []);
        let list = [];
        lessonList.forEach(element => {
          list.push({
            value: element.id,
            text: element.name
          });
        });
        this.courses = list;
      } catch (e) {
      } finally {
      }
    },

    get
  },

  created() {
    this.getList();
    this.getLessonInfo();
    this.getSchoolClasses();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";

.class-info {
  margin: 0;
  padding: 1rem 1.5rem 1.5rem;
  background: #f8f8f8;
  .class-info-content {
    display: table;
    width: 100%;
    .item {
      display: table-cell;
    }
  }
}
.appended-col {
  p {
    max-width: 15rem;
  }
  .text-description {
    color: #999;
    font-size: 1.2rem;
    line-height: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.bottom-content {
  padding: 1.5rem 2rem;
  background: #f8f8f8;
  .top {
    color: #222;
    margin-bottom: 2.5rem;
  }
  .bottom {
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    p >span {
      width: 12px;
      display: inline-block;
    }
  }
}

.app-table .bottom {
    display: table;
    width: 100%;
    margin-top: 1rem;
    >span {
      display: table-cell;
      text-align: center;
      color: #333;
      width: 20%;
    }
  }
  .div-table {
    display: table;
    width: 100%;
    text-align: center;
    > * {
      display: table-cell;
      .app-checkbox__checkmark {
        margin: 0 auto !important;
      }
    }
  }

</style>