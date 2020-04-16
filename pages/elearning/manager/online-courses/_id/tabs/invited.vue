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
      :data="classList"
    >
      <template v-slot:cell(is_block_on_next_lesson)="{row}">
        <td class="nowrap">
          <button type="button" @click="block(row.invitation_id, row.is_block_on_next_lesson)">
            <IconLockOpenAlt class="fill-primary" v-if="!row.is_block_on_next_lesson" width="16" height="16"/>
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

import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { useEffect, getParamQuery } from "~/utils/common";

const STORE_NAMESPACE = "elearning/creating/creating-olclasses";
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
          name: "invited_time",
          text: "Ngày tham gia",
          sort: true
        },
        {
          name: "point",
          text: "Điểm chuyên cần",
          sort: true
        },
        {
          name: "is_block_on_next_lesson",
          text: ""
        }
      ],
      courses: [],
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
        params: ''
      },
      loading: false,
      listSchoolClasses: [],
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      classes: "Olclasses"
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
      that.params.page = that.pagination.page;
      that.getList();
    },
    submit() {
      this.params = {...this.params, ...this.filter};
      console.log(this.params);
      this.getList();
    },
    handleChangedCourse() {
      
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

    async block(id, isBlock) {
      if (isBlock) {
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.CREATING_OLCLASSES.BLOCK}`,
          { invitation_ids: [id] }
        );
      } else {
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.CREATING_OLCLASSES.UNBLOCK}`,
          { invitation_ids: [id] }
        );
      }
    },

    async getList() {
      try {
        this.loading = true;
        const online_class_id = this.$route.params.id ? this.$route.params.id : "";
        this.params.online_class_id = online_class_id;
        if ( this.filterCourse ) {
          this.params.class_id = this.filterCourse.value 
        }
        if ( this.filterCourse ) {
          this.params.class_id = this.filterCourse.value 
        }
        let params = { ...this.params };
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

    async inviteStudents() {
      this.openModal = true;
    },

    get
  },

  created() {
    this.getList();
    this.getSchoolClasses();
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