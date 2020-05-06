<template>
  <div class="elearning-wrapper">
    <!--Filter form-->
    <div class="filter-form">

      <div class="filter-form__item">
        <div style="width: 30rem;">
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
          <span>Lọc kết quả</span>
        </app-button>
      </div>

      <div class="filter-form__item" style="min-width: 19rem">
        <app-vue-select
          class="app-vue-select filter-form__item__selection"
          v-model="filterCourse"
          :options="courses"
          label="text"
          placeholder="Bài giảng/khóa học"
          searchable
          clearable
          @input="handleChangedCourse"
        ></app-vue-select>
      </div>
    </div>
    <!--End filter form-->

    <!--Options group-->
    <div class="filter-form mb-3">
      <div class="filter-form__item" @click="deleteRows">
        <app-button color="secondary" class="filter-form__item__btn" square :size="'sm'">
          <IconTrash />
          <span class="ml-3">Hủy lớp</span>
        </app-button>
      </div>
    </div>
    <!--Options group-->

    <!--Table-->
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      @selectionChange="selectRow"
      :data="classList"
      multiple-selection
    >
      <template v-slot:cell(online_class_name)="{row}">
        <td>
          <n-link
            :to="'/elearning/manager/online-class/' + row.online_class_id + '/invites'"
            class="link"
          >{{row.online_class_name}}</n-link>
        </td>
      </template>
      <template v-slot:cell(privacy)="{row}">
        <td>
          <span class="text-primary" v-if="row.privacy == 'PUBLIC'">Công khai</span>
          <span class="text-secondary" v-else>Riêng tư</span>
        </td>
      </template>

      <template v-slot:cell(time)="{row}">
        <td>
          <span>{{row.time.time}}</span>
          <br />
          <span>{{row.time.day}}</span>
        </td>
      </template>

      <template v-slot:cell(action)="{row}">
        <td class="nowrap">
          <a class @click="openModal(row.online_class_id)">Vào phòng học</a>
        </td>
      </template>
    </app-table>
    <!--End table-->
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrow from "~/assets/svg/icons/arrow.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconTrash from "~/assets/svg/icons/trash-alt.svg?inline";
import IconHamberger from '~/assets/svg/icons/hamberger.svg?inline';

import ModalJoinClass from "~/components/page/elearning/manager/olclass/ModalJoinClass";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get, reduce } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";

export default {
  layout: "manage",

  components: {
    IconFilter,
    IconSearch,
    IconArrow,
    IconCalendar,
    IconTrash,
    IconHamberger,
    ModalJoinClass
  },

  data() {
    return {
      rowClassId: null,
      modalShow: false,
      tab: 1,
      heads: [
        {
          name: "online_class_name",
          text: "Phòng học",
          sort: true
        },
        {
          name: "elearning_name",
          text: "Thuộc khóa học",
          sort: true
        },
        {
          name: "privacy",
          text: "Hiển thị",
          sort: true
        },
        {
          name: "time",
          text: "Thời gian",
          sort: true
        },
        {
          name: "num_invitation",
          text: "Số học sinh đã mời",
          sort: true
        },
        {
          name: "action",
          text: ""
        }
      ],
      filterCourse: null,
      courses: [],
      isAuthenticated: true,
      pagination: {
        total: 0,
        number: 0,
        size: 10,
        totalElements: 0,
        first: 0,
        last: 0
      },
      classList: [],
      lessonList: [],
      ids: [],
      params: {
        page: 1,
        size: 10,
        class_status: "STREAMING",
        query: null,
        query_date: null,
        search_type: null
      },
      loading: false
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateClass: "OnlineClass"
    }),
    ...mapState(STORE_PUBLIC_SEARCH, {
      stateLessons: "Lessons"
    })
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
      this.getList();
    },
    handleChangedCourse() {
      this.params.elearning_id = this.filterCourse.value;
    },
    handleFocusSearchInput() {},
    handleBlurSearchInput() {},
    handleSearch() {},
    selectRow(data) {
      this.ids = data.map((row, index, data) => {
        return row.online_class_id;
      });
    },

    async getLessons() {
      try {
        let userId = this.$store.state.auth.token
          ? this.$store.state.auth.token.id
          : "";
        await this.$store.dispatch(
          `${STORE_PUBLIC_SEARCH}/${actionTypes.ELEARNING_PUBLIC_SEARCH.DETAIL}`,
          { userId }
        );
        this.lessonList = this.get(this.stateLessons, "data.content", []);
        let list = [];
        this.lessonList.forEach(element => {
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

    formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    async getList() {
      const self = this;
      try {
        self.loading = true;
        let params = { ...self.params };
        await self.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.LIST}`,
          { params }
        );

        const classes = self.get(self.stateClass, "data.content", []);
        self.classList = classes.map(function(item) {
          const duration = parseInt(item.recent_schedule.duration) * 60 * 1000;
          const date = new Date(
            "2000-01-01 " + item.recent_schedule.start_time
          );
          const end = self.formatAMPM(new Date(date.getTime() + duration));
          return {
            ...item,
            time: {
              day: item.recent_schedule.day,
              time: item.recent_schedule.start_time + " - " + end
            }
          };
        });

        this.pagination.size = this.get(this.stateClass, "data.size", 10);
        this.pagination.first = this.get(this.stateClass, "data.first", 1);
        this.pagination.last = this.get(this.stateClass, "data.last", 1);
        this.pagination.number = this.get(this.stateClass, "data.number", 0);
        this.pagination.totalPages = this.get(
          this.stateClass,
          "data.total_pages",
          0
        );
        this.pagination.totalElements = this.get(
          this.stateClass,
          "data.total_elements",
          0
        );
        this.pagination.numberOfElements = this.get(
          this.stateClass,
          "data.number_of_elements",
          0
        );
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },

    async deleteRows() {
      let ids = { online_class_ids: [...this.ids] };
      const doDelete = await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.DELETE}`,
        JSON.stringify(ids)
      );

      if (doDelete.success) {
        this.getList();
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    openModal(id) {
      this.rowClassId = id;
      this.modalShow = true;
    },

    get
  },

  created() {
    this.getList();
    this.getLessons();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
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
</style>