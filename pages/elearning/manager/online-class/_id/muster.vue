<template>
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="5" />
      </div>
      <div class="col-md-9">
        <sub-block-section :title="'Điểm danh - ' + lessonInfo.name" has-icon>
          <template v-slot:content>
            <div class="elearning-manager-content__main pt-3">
              <div class="elearning-wrapper">
                <!--Info group-->
                <h5 class="color-primary mb-15">{{lessonInfo.name}}</h5>
                <div class="class-info mb-4 border">
                  <strong class="d-flex-center">
                    <IconClock class="mr-3" />
                    {{getLocalTimeHH_MM_A(lessonInfo.start_time)}} - {{getLocalTimeHH_MM_A(lessonInfo.end_time)}},
                    {{getDateBirthDay(lessonInfo.start_time)}}
                  </strong>
                  <div class="class-info-content mt-3">
                    <div class="item">
                      Vào muộn:
                      <strong
                        class="color-primary"
                      >{{get(summary,'total_student_late', 0)}}</strong>
                    </div>
                    <div class="item">
                      Không phép:
                      <strong
                        class="color-primary"
                      >{{summary.total_student_absent_not_allowed}}</strong>
                    </div>
                    <div class="item">
                      Có phép:
                      <strong class="color-primary">{{summary.total_student_absent_allowed}}</strong>
                    </div>
                    <div class="item">
                      Có mặt:
                      <strong class="color-primary">{{summary.total_student_present}}</strong>
                    </div>
                  </div>
                </div>
                <!--end info group-->

                <!--Filter form-->
                <div class="filter-form">
                  <div class="d-flex">
                    <div class="filter-form__item" style="max-width:36rem;min-width:30rem;">
                      <div style="width: 100%">
                        <app-search
                          class
                          :placeholder="'Nhập để tìm kiếm...'"
                          v-model="params.query"
                          :size="'sm'"
                          @submit="submit"
                          @keyup.enter.native="submit"
                          bordered
                        ></app-search>
                      </div>
                    </div>

                    <div class="filter-form__item">
                      <app-button
                        :color="showFilter ? 'primary' : 'white'"
                        square
                        :size="'sm'"
                        @click="toggleFilter"
                      >
                        <IconHamberger
                          :class="showFilter ? 'fill-white' : 'fill-primary'"
                          class="mr-2"
                        />
                        <span>Lọc kết quả</span>
                      </app-button>
                    </div>

                    <div class="filter-form__item" style="min-width: 13rem" v-if="showFilter">
                      <app-vue-select
                        class="app-vue-select filter-form__item__selection"
                        v-model="filterCourse"
                        :options="courseOpts"
                        label="text"
                        placeholder="Lớp học"
                        @input="handleChangedCourse"
                        :all-opt="allOpt"
                        has-border
                      ></app-vue-select>
                    </div>
                    <div class="filter-form__item" style="min-width: 13rem" v-if="showFilter">
                      <app-vue-select
                        class="app-vue-select filter-form__item__selection"
                        v-model="filterStatus"
                        :options="statusOpts"
                        label="text"
                        placeholder="Điểm danh"
                        @input="handleChangedStatus"
                        :all-opt="allOpt"
                        has-border
                      ></app-vue-select>
                    </div>
                  </div>
                </div>
                <!--End filter form-->

                <div class="d-flex-center mb-15">
                  <button class="color-primary bold d-flex-center" @click="getList">
                    <IconRefresh class="fill-primary mr-2" />Cập nhật kết quả điểm danh
                  </button>
                  <i
                    class="ml-auto"
                  >*Kết quả điểm danh được cập nhật lần cuối vào lúc {{getLocalTimeHH_MM_A(currentTime) + ', ' + getDateBirthDay(currentTime)}}</i>
                </div>
                <!--Table-->
                <app-table
                  :heads="heads"
                  :pagination="pagination"
                  @pagechange="onPageChange"
                  @sort="handleSort"
                  :data="lessons"
                  :loading="loading"
                >
                  <template v-slot:cell(attendance_status)="{row, index}">
                    <td>
                      <div class="div-table">
                        <app-checkbox
                          label="M"
                          :checked="row.attendance_status == 'M'"
                          @change="updateStatus(row.online_attendance_id, 'M', index)"
                        />
                        <app-checkbox
                          label="K"
                          :checked="row.attendance_status == 'K'"
                          @change="updateStatus(row.online_attendance_id, 'K', index)"
                        />
                        <app-checkbox
                          label="P"
                          :checked="row.attendance_status == 'P'"
                          @change="updateStatus(row.online_attendance_id, 'P', index)"
                        />
                        <app-checkbox
                          label="C"
                          :checked="row.attendance_status == 'C'"
                          @change="updateStatus(row.online_attendance_id, 'C', index)"
                        />
                      </div>
                    </td>
                  </template>
                  <template v-slot:cell(attendance_point)="{row}">
                    <td class="text-center">{{row.attendance_point}}%</td>
                  </template>
                </app-table>
                <!--End table-->
              </div>

              <div class="bottom-content">
                <div class="top">
                  <i>
                    *Điểm chuyên cần của học sinh được tính dựa trên tỷ lệ tham gia
                    <b>{{lessonInfo.name}}</b> theo yêu cầu của giáo viên
                  </i>
                </div>
                <div class="bottom">
                  <p>
                    <strong class="color-primary">M</strong> = Đi muộn
                  </p>
                  <p>
                    <strong class="color-primary">K</strong> = Không phép
                  </p>
                  <p>
                    <strong class="color-primary">P</strong> = Có phép
                  </p>
                  <p>
                    <strong class="color-primary">C</strong> = Có mặt
                  </p>
                </div>
              </div>
            </div>
          </template>
        </sub-block-section>
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
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";
import IconLock2 from "~/assets/svg/icons/lock2.svg?inline";
import IconLockOpenAlt from "~/assets/svg/design-icons/lock-open-alt.svg?inline";
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import IconRefresh from "~/assets/svg/v2-icons/refresh_24px.svg?inline";
import IconClock from "~/assets/svg/icons/clock.svg?inline";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import { getDateBirthDay, getLocalTimeHH_MM_A } from "~/utils/moment";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";

export default {
  components: {
    IconClock,
    IconRefresh,
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
      allOpt: {
        value: null,
        text: "Tất cả"
      },
      currentTime: new Date(),
      lessonInfo: {},
      showFilter: false,
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
          text: "Điểm danh",
        }
      ],
      summary: {
        total_student_absent_allowed: 0,
        total_student_absent_not_allowed: 0,
        total_student_late: 0,
        total_student_present: 0
      },
      courses: [],
      filterCourse: null,
      filterStatus: null,
      statuses: [
        {
          value: "M",
          text: "M"
        },
        {
          value: "K",
          text: "K"
        },
        {
          value: "P",
          text: "P"
        },
        {
          value: "C",
          text: "C"
        }
      ],
      pagination: {
        total: 0,
        number: 0,
        size: 10,
        total_elements: 0,
        first: 0,
        last: 0
      },
      lessons: [],
      params: {
        page: 1,
        size: 10,
        class_id: null,
        attendance_status: null,
        query: null,
       // sort: 'student_name,asc'
      },
      loading: false
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateLessonInfo: "LessonInfo"
    }),
    ...mapState(STORE_NAMESPACE, {
      stateAttendances: "Attendances"
    }),
    ...mapState(STORE_SCHOOL_CLASSES, {
      stateSchoolClasses: "schoolClasses"
    }),
    courseOpts() {
      return [this.allOpt, ...this.courses];
    },
    statusOpts() {
      return [this.allOpt, ...this.statuses];
    }
  },

  methods: {
    getDateBirthDay,
    getLocalTimeHH_MM_A,

    handleSort(e) {
      const sortBy = e.sortBy + ',' + e.order;
      this.params = {...this.params, sort: sortBy};
      this.getList();
    },

    toggleFilter() {
      if (
        this.showFilter &&
        (this.filterCourse != null || this.filterStatus != null)
      ) {
        this.filterCourse = null;
        this.filterStatus = null;
        this.params = {
          ...this.params,
          class_id: null,
          attendance_status: null
        };
        this.getList();
      }
      this.showFilter = !this.showFilter;
    },

    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      that.params.size = that.pagination.size;
      that.params.page = that.pagination.number + 1;
      that.getList();
    },
    submit() {
      this.params = { ...this.params };
      this.getList();
    },
    handleChangedCourse(val) {
      this.params.class_id = this.filterCourse.value;
      this.getList();
    },
    handleChangedStatus(val) {
      this.params.attendance_status = this.filterStatus.value;
      this.getList();
    },
    handleFocusSearchInput() {},
    handleBlurSearchInput() {},
    handleSearch() {},

    async getLessonInfo() {
      try {
        this.loading = true;
        const lesson_id = this.$route.params.id ? this.$route.params.id : "";
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSONS.INFO}`,
          lesson_id
        );
        this.lessonInfo = this.get(this.stateLessonInfo, "data", []);
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },

    async getList() {
      try {
        this.loading = true;
        const lesson_id = this.$route.params.id ? this.$route.params.id : "";
        let params = { ...this.params };
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.LIST}`,
          { params, id: lesson_id, after: "attendances" }
        );
        this.currentTime = new Date();
        console.log("xxxxxxxxxx", this.stateAttendances);
        this.lessons = this.get(
          this.stateAttendances,
          "data.attendance_list.content",
          []
        );
        this.pagination.size = this.get(
          this.stateAttendances,
          "data.attendance_list.size",
          10
        );
        this.pagination.first = this.get(
          this.stateAttendances,
          "data.attendance_list.first",
          1
        );
        this.pagination.last = this.get(
          this.stateAttendances,
          "data.attendance_list.last",
          1
        );
        this.pagination.number = this.get(
          this.stateAttendances,
          "data.attendance_list.number",
          0
        );
        this.pagination.total_pages = this.get(
          this.stateAttendances,
          "data.attendance_list.total_pages",
          0
        );
        this.pagination.total_elements = this.get(
          this.stateAttendances,
          "data.attendance_list.total_elements",
          0
        );
        this.pagination.number_of_elements = this.get(
          this.stateAttendances,
          "data.attendance_list.number_of_elements",
          0
        );
        this.summary.total_student_absent_allowed = this.get(
          this.stateAttendances,
          "data.total_student_absent_allowed",
          0
        );
        this.summary.total_student_absent_not_allowed = this.get(
          this.stateAttendances,
          "data.total_student_absent_not_allowed",
          0
        );
        this.summary.total_student_late = this.get(
          this.stateAttendances,
          "data.total_student_late",
          0
        );
        this.summary.total_student_present = this.get(
          this.stateAttendances,
          "data.total_student_present",
          0
        );
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },

    async updateStatus(id, status, index) {
      let list = [...this.lessons];
      list[index] = { ...list[index], attendance_status: status };
      this.lessons = list;
      try {
        let attendances = {
          attendances: [
            {
              attendance_id: id,
              attendance_status: status
            }
          ],
          online_lesson_id: this.$route.params.id
        };
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.EDIT}`,
          attendances
        );
      } catch (e) {
      } finally {
        this.getList();
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
  padding: 1rem 1.5rem;
  background: #f8f8f8;
  .class-info-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .item {
      display: inline-block;
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
    p > span {
      width: 12px;
      display: inline-block;
    }
  }
}

.app-table .bottom {
  display: table;
  width: 100%;
  margin-top: 1rem;
  > span {
    display: table-cell;
    text-align: center;
    color: #333;
    width: 20%;
  }
}
.div-table {
  display: table;
  width: 100%;
  text-align: left;
  .app-checkbox {
    + .app-checkbox {
      margin-left: 2.5rem;
    }
    align-items: center;
    .app-checkbox__checkmark {
      margin: 0;
    }
  }
}
</style>