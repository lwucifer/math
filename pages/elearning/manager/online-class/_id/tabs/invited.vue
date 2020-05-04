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
      :data="students"
    >
      <template v-slot:cell(is_block_on_next_lesson)="{row}">
        <td class="nowrap">
          <button type="button" @click="block(row.invitation_id, row.student_id,row.is_block_on_next_lesson)">
            <IconLockOpenAlt class="fill-primary" v-if="!row.is_block_on_next_lesson" width="16" height="16"/>
            <IconLock2 v-else width="16" height="16"/>
          </button>
        </td>
      </template>
      <template v-slot:cell(attendance_point)="{row}">
        <td>
          {{row.attendance_point}}%
        </td>
      </template>
    </app-table>
    <!--End table-->

    <div class="pl-4 pr-4 mt-4">
      <i class="color-999">*Điểm chuyên cần của học sinh được tính dựa trên tỷ lệ tham gia tất cả các phòng học online theo yêu cầu của giáo viên</i>
    </div>

    <!-- Modal invite students -->
    <ModalInviteStudent @close="closeModal" v-if="openModal"/>
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

import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { useEffect, getParamQuery } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_SCHOOL_CLASSES = "elearning/school/school-classes";

export default {
  layout: "manage",
    
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
          name: "join_date",
          text: "Ngày tham gia",
          sort: true
        },
        {
          name: "attendance_point",
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
      pagination: {
        total: 0,
        number: 0,
        size: 10,
        totalElements: 0,
        first: 0,
        last: 0
      },
      students: [],
      params: {
        page: 1,
        size: 10,
        query: null
      },
      loading: false,
      listSchoolClasses: [],
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateInvites: "Invites"
    }),
    ...mapState(STORE_SCHOOL_CLASSES, {
      stateSchoolClasses: "schoolClasses"
    }),
  },

  methods: {
    closeModal(e) {
      this.openModal = false;
      if (e) this.getList();
    },
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
    handleChangedCourse() {
      this.params.class_id = this.filterCourse.value;
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

    async block(invitationId, studentId, isBlock) {
      const online_class_id = this.$route.params.id ? this.$route.params.id : "";
      const params = {
        invitation_ids: [invitationId],
        online_class_id: online_class_id,
        student_id: studentId
      };
      if (isBlock) {
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.UNBLOCK}`,
          params
        );
      } else {
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.BLOCK}`,
          params
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
        let params = { ...this.params };
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASS_INVITES.LIST}`,
          { params }
        );
        this.students = this.get(this.stateInvites, 'data.content', [])
        this.pagination.size = this.get(this.stateInvites, 'data.size', 10)
        this.pagination.first = this.get(this.stateInvites, 'data.first', 1)
        this.pagination.last = this.get(this.stateInvites, 'data.last', 1)
        this.pagination.number = this.get(this.stateInvites, 'data.number', 0)
        this.pagination.totalPages = this.get(this.stateInvites, 'data.total_pages', 0)
        this.pagination.totalElements = this.get(this.stateInvites, 'data.total_elements', 0)
        this.pagination.numberOfElements = this.get(this.stateInvites, 'data.number_of_elements', 0)
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