<template>
  <div class="elearning-wrapper">
    <!--Options group-->
    <div class="filter-form">
       <div class="filter-form__item top" @click="openModal = true">
        <app-button color="info" class="filter-form__item__btn" square :size="'sm'">
          <IconPlusCircle class="mr-2 fill-white"/>
          <span class="color-white">Mời thêm học sinh</span>
        </app-button>
      </div>
    </div>
    <!--Options group-->

    <!--Info group-->
    <div class="class-info mb-4">
      <strong>Tổng số học sinh đã tham bài giảng của bạn: <span class="color-primary">{{summary.total_student}}</span></strong>
      <div class="class-info-content mt-3">
        <div class="item">Tỷ lệ có mặt: <strong class="color-primary">{{summary.attendant_rate}}%</strong></div>
        <div class="item">Tỷ lệ vắng mặt: <strong class="color-primary">{{summary.absence_rate}}%</strong></div>
        <div class="item">Tỷ lệ vắng mặt có phép: <strong class="color-primary">{{summary.absence_with_permission_rate}}%</strong></div>
        <div class="item">Tỷ lệ vắng mặt không phép: <strong class="color-primary">{{summary.absent_without_permisson_rate}}%</strong></div>
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
            <IconHamberger :class="showFilter ? 'fill-white' : 'fill-primary'" class="mr-2" />
            <span>Lọc kết quả</span>
          </app-button>
        </div>

        <div class="filter-form__item" style="min-width: 22rem" v-if="showFilter">
          <app-vue-select
            class="app-vue-select filter-form__item__selection"
            v-model="filterIndex"
            :options="indexOpts"
            label="text"
            placeholder="Thứ tự buổi học"
            @input="handleChangedIndex"
            :all-opt="allOpt"
            has-border
          ></app-vue-select>
        </div>
      </div>

      <div class="text-right mb-3 mt-2">
        <i>Thống kê tỷ lệ học sinh tham gia từng buổi học online của bạn.</i>
      </div>
    </div>
    <!--End filter form-->

    <!--Table-->
    <app-table
      :loading="loading"
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="lessons"
    >
      <template v-slot:cell(start_time)="{row}">
        <td>
          <div>
            {{getLocalTimeHH_MM_A(row.start_time)}} - {{getLocalTimeHH_MM_A(row.end_time)}}
          </div>
          <div>
            {{getDateBirthDay(row.start_time)}}
          </div>
        </td>
      </template>
      <template v-slot:cell(num_students)="{row}">
        <td class="color-blue">
          {{row.participants}}/{{row.num_students}}
        </td>
      </template>
      <template v-slot:cell(action)="{row}">
        <td class="nowrap">
          <n-link :to="'/elearning/manager/online-class/' + row.lesson_id + '/muster'" class="none-decoration">
          <IconArrowRight/>
          </n-link>
        </td>
      </template>
    </app-table>
    <!--End table-->

    <!-- Modal invite students -->
    <ModalInviteStudent @close="openModal = false" v-if="openModal"/>
    <!-- End -->
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrow from "~/assets/svg/icons/arrow.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconTrash from "~/assets/svg/icons/trash-alt.svg?inline";
import IconPlusCircle from '~/assets/svg/design-icons/plus-circle.svg?inline';
import ModalInviteStudent from "~/components/page/elearning/manager/olclass/ModalInviteStudent"
import IconLock2 from '~/assets/svg/icons/lock2.svg?inline';
import IconLockOpenAlt from '~/assets/svg/design-icons/lock-open-alt.svg?inline';
import IconHamberger from '~/assets/svg/icons/hamberger.svg?inline';
import IconArrowRight from '~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline';

import {
  getDateBirthDay,
  getLocalTimeHH_MM_A
} from "~/utils/moment";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";

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
    IconHamberger,
    IconArrowRight,
    ModalInviteStudent
  },

  middleware: ["teacher-role"],

  data() {
    return {
      allOpt: {
        value: null,
        text: 'Tất cả'
      },
      tab: 1,
      openModal: false,
      showFilter: false,
      summary: {},
      heads: [
        {
          name: "online_class_name",
          text: "Phòng học",
          sort: true
        },
        {
          name: "elearning_name",
          text: "Thuộc bài giảng/khóa học",
          sort: true
        },
        {
          name: "lesson_index",
          text: "Thứ tự buổi học",
          sort: true
        },
        {
          name: "start_time",
          text: "Thời gian diễn ra",
          sort: true
        },
        {
          name: "num_students",
          text: "Số học sinh có mặt"
        },
        {
          name: "action",
          text: ""
        }
      ],
      indexs: [
        {
          value: '0',
          text: '0'
        },
        {
          value: '1',
          text: '1'
        },
        {
          value: '2',
          text: '2'
        },
        {
          value: '3',
          text: '3'
        },
        {
          value: '4',
          text: '4'
        },
        {
          value: '5',
          text: '5'
        },
        {
          value: '6',
          text: '6'
        },
        {
          value: '7',
          text: '7'
        },
      ],
      filterIndex: null,
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
        query: null,
      },
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateLessons: "Lessons",
      stateAttendantSummary: "AttendantSummary",
    }),
    indexOpts() {
      return [this.allOpt, ...this.indexs]
    }
  },

  methods: {
    getDateBirthDay,
    getLocalTimeHH_MM_A,

    toggleFilter() {
      if (this.showFilter && this.filterIndex != null) {
        this.filterIndex = null;
        this.params = {...this.params,
          lesson_index: null
        }
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
      this.getList();
    },
    handleChangedIndex() {
      this.params.lesson_index = this.filterIndex.value;
      this.getList();
    },

    async getList() {
      try {
        this.loading = true;
        const online_class_id = this.$route.params.id ? this.$route.params.id : "";
        this.params.online_class_id = online_class_id;
        let params = { ...this.params };
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSONS.LIST}`,
          { params}
        );
        this.lessons = this.get(this.stateLessons, 'data.content', []);
        this.pagination.size = this.get(this.stateLessons, 'data.size', 10)
        this.pagination.first = this.get(this.stateLessons, 'data.first', 1)
        this.pagination.last = this.get(this.stateLessons, 'data.last', 1)
        this.pagination.number = this.get(this.stateLessons, 'data.number', 0)
        this.pagination.total_pages = this.get(this.stateLessons, 'data.total_pages', 0)
        this.pagination.total_elements = this.get(this.stateLessons, 'data.total_elements', 0)
        this.pagination.number_of_elements = this.get(this.stateLessons, 'data.number_of_elements', 0)
      } catch (e) {

      } finally {
        this.loading = false
      }
    },
    
    async getSummary() {
      try {
        this.loading = true;
        const online_class_id = this.$route.params.id ? this.$route.params.id : "";
        const params = {};
        await this.$store.dispatch(
          (`${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_LESSON_ATTENDANCES.SUMMARY}`),
          { params, id: online_class_id, after: 'attendant/summary/'}
        );
        this.summary = this.get(this.stateAttendantSummary, 'data', [])
      } catch (e) {

      } finally {
        this.loading = false
      }
    },

    async inviteStudents() {
      this.openModal = true;
    },

    get
  },

  created() {
    this.getList();
    this.getSummary();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
.class-info {
  margin: 0;
  padding: 1rem 1.5rem 1.5rem;
  background: #f8f8f8;
  .class-info-content {
    display: table;
    .item {
      display: table-cell;
      + .item {
        padding-left: 1.5rem;
      } 
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

.filter-form {
  position: relative;
  margin-top: 1rem;
  .filter-form__item.top {
    position: absolute;
    right: 0;
    bottom: calc(100% +  2.3rem);
    margin: 0 !important;
  }
}
</style>