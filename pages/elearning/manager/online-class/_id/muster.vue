<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="5" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <h5 class="color-primary mb-15">Phòng học online</h5>
            <p>
              Phòng học online > Phòng học online số 1 > Danh sách điểm danh >
              <strong>Buổi học số 1</strong>
            </p>
            <hr class="mt-4 mb-4"/>
          </div>

          <div class="elearning-manager-content__main pt-3">
            <div class="elearning-wrapper">
              <!--Info group-->
              <div class="class-info mb-5">
                <strong>
                  Buổi học số 1 | 11:00 AM - 11:45 AM, 16/10/2019
                </strong>
                <div class="class-info-content mt-3">
                  <div class="item">
                    Tỷ lệ có mặt:
                    <strong class="color-primary">95%</strong>
                  </div>
                  <div class="item">
                    Tỷ lệ vắng có mặt:
                    <strong class="color-primary">5%</strong>
                  </div>
                  <div class="item">
                    Tỷ lệ vắng mặt có phép:
                    <strong class="color-primary">5%</strong>
                  </div>
                  <div class="item">
                    Tỷ lệ vắng mặt không phép:
                    <strong class="color-primary">1%</strong>
                  </div>
                </div>
              </div>
              <!--end info group-->

              <!--Filter form-->
              <div class="filter-form">
                <div class="filter-form__item">
                  <app-button
                    color="primary"
                    class="filter-form__item__btn filter-form__item__btn--submit"
                    :size="'sm'"
                    @click="submit"
                  >
                    <IconFilter />
                    <span>Lọc kết quả</span>
                  </app-button>
                </div>

                <div class="filter-form__item" style="min-width: 18rem">
                  <app-vue-select
                    class="app-vue-select filter-form__item__selection"
                    v-model="filterCourse"
                    :options="courses"
                    label="text"
                    placeholder="Theo lớp"
                    searchable
                    clearable
                    @input="handleChangedCourse"
                    @search:focus="handleFocusSearchInput"
                    @search:blur="handleBlurSearchInput"
                  ></app-vue-select>
                </div>

                <!--Right form-->
                <div class="filter-form__right">
                  <div style="width: 28rem;">
                    <app-search
                      class
                      :placeholder="'Nhập để tìm kiếm...'"
                      v-model="params.query"
                      :size="'sm'"
                    ></app-search>
                  </div>
                </div>
                <!--End right form-->
              </div>
              <!--End filter form-->

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
              <div class="left">
              <i class="color-999">
                *Kết quả điểm danh được cập nhật lần cuối vào lúc 10:00 AM, 18/10/2020
              </i>
              <i class="color-666">*Điểm chuyên cần của học sinh được tính dựa trên tỷ lệ tham gia tất cả các phòng học online theo yêu cầu của giáo viên</i>
              </div>
              <div class="right">
                <p><span class="color-primary">M</span> = Đi muộn</p>
                <p><span class="color-primary">K</span> = Không phép</p>
                <p><span class="color-primary">P</span> = Có phép</p>
                <p><span class="color-primary">C</span> = Có mặt</p>
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
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";

export default {
  components: {
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
      courses: [],
      filterCourse: null,
      pagination: {
        total: 15,
        page: 1,
        pager: 10,
        totalElements: 55,
        first: 1,
        last: 10
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
      stateAttendances: "Attendances"
    }),
    ...mapState(STORE_SCHOOL_CLASSES, {
      stateSchoolClasses: "schoolClasses"
    }),
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
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
    this.getSchoolClasses();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";

.class-info {
  margin: 0 2rem;
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
  display: flex;
  padding: 1rem 2rem;
  .left {
    i {
      display: block;
      margin-bottom: 1rem;
    }
  }
  .right {
    padding-left: 2rem;
    white-space: nowrap;
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