<template>
  <div class="elearning-wrapper">
    <!--Options group-->
    <div class="filter-form mb-4">
      <div class="filter-form__item ml-auto" @click="openModal = true">
        <app-button color="secondary" class="filter-form__item__btn" square :size="'sm'">
          <IconPlusCircle class="fill-white" height="14" width="14"/>
          <span class="ml-3">Mời thêm học sinh</span>
        </app-button>
      </div>
    </div>
    <!--Options group-->

    <!--Info group-->
    <div class="class-info">
      <strong>Tổng số học sinh đã mời: <span class="color-primary">50</span></strong>
      <div class="class-info-content">
        <div class="item">Tỷ lệ có mặt: <strong class="color-primary">95%</strong></div>
        <div class="item">Tỷ lệ vắng có mặt: <strong class="color-primary">5%</strong></div>
        <div class="item">Tỷ lệ vắng mặt có phép: <strong class="color-primary">5%</strong></div>
        <div class="item">Tỷ lệ vắng mặt không phép: <strong class="color-primary">1%</strong></div>
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
            v-model="filter.query"
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
      :data="classList"
    >
      <template v-slot:cell(action)="{row}">
        <td class="nowrap">
          <button type="button" @click="block(row.id)">
            <IconLockOpenAlt class="fill-primary" v-if="!row.block" width="16" height="16"/>
            <IconLock2 v-else width="16" height="16"/>
          </button>
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
import ModalInviteStudent from "~/components/page/elearning/manager/olclasses/ModalInviteStudent"
import IconLock2 from '~/assets/svg/icons/lock2.svg?inline';
import IconLockOpenAlt from '~/assets/svg/design-icons/lock-open-alt.svg?inline';

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/creating/creating-olclasses";

import OlclassesService from "~/services/elearning/creating/Olclasses";

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
    ModalInviteStudent
  },

  data() {
    return {
      tab: 1,
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
          name: "date_invite",
          text: "Ngày tham gia",
          sort: true
        },
        {
          name: "point",
          text: "Điểm chuyên cần",
          sort: true
        },
        {
          name: "action",
          text: ""
        }
      ],
      filter: {
        query: null,
        status: null,
        query_date: null,
        search_type: null
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
      filterCourse: null,
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
        page: 1,
        pager: 10,
        totalElements: 55,
        first: 1,
        last: 10
      },
      classList: [],
      params: {
        page: 1,
        size: 10,
      },
      loading: false,
      query_status: ["STARTING", "ACTIVE", "DRAFT", "FINISHED"]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      classes: "Olclasses"
    })
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
    },
    submit() {
      this.params = {...this.params, ...this.filter};
      console.log(this.params);
      this.getList();
    },
    handleChangedCourse(val) {
      this.filter.course = this.filterCourse.value;
    },
    handleFocusSearchInput() {
    },
    handleBlurSearchInput() {
    },
    handleSearch() {
    },
    selectRow(data) {
      this.ids = data.map((row, index, data) => {
          return row.online_class_id
      });
    },

    async getList() {
      try {
        this.loading = true;
        //const room_id = this.$router.params.id;
        this.params.online_class_id = 'c0d65259-4b7f-487c-8a05-41f91d74e8a7';
        let params = { ...this.params };
        console.log(room_id)
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.CREATING_OLCLASSES.INVITATIONS}`,
          { params }
        );
        this.classList = this.get(this.classes, 'data.content', [])
        this.pagination.size = this.get(this.detailInfo, 'data.page.size', 10)
        this.pagination.first = this.get(this.detailInfo, 'data.page.first', 1)
        this.pagination.last = this.get(this.detailInfo, 'data.page.last', 1)
        this.pagination.number = this.get(this.detailInfo, 'data.page.number', 0)
        this.pagination.totalPages = this.get(this.detailInfo, 'data.page.total_pages', 0)
        this.pagination.totalElements = this.get(this.detailInfo, 'data.page.total_elements', 0)
        this.pagination.numberOfElements = this.get(this.detailInfo, 'data.page.number_of_elements', 0)
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
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
.class-info {
  margin: 0 2rem;
  padding: 1rem 1.5rem 1.5rem;
  background: #f8f8f8;
  .class-info-content {
    display: table;
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
</style>