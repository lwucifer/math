<template>
  <div class="elearning-wrapper">
    <!--Filter form-->
    <div class="filter-form">
      <div class="d-flex">
      <div class="filter-form__item">
        <app-date-picker
          v-model="params.query_date"
          square
          size="sm"
          placeholder="dd/mm/yyyy"
        >
          <template v-slot:icon-calendar>
            <IconCalendar class="fill-primary"/>
          </template>
        </app-date-picker>
      </div>

      <div class="filter-form__item" style="max-width:36rem;min-width:30rem;">
        <div style="width: 100%">
          <app-search
            class
            :placeholder="'Nhập để tìm kiếm...'"
            v-model="params.query"
            :size="'sm'"
            @submit="submit"
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

      <div class="filter-form__item" style="min-width: 19rem" v-if="showFilter">
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
    </div>
    <!--End filter form-->

    <!--Options group-->
    <div class="filter-form">
      <div class="filter-form__item" @click="showModalConfirm = true">
        <app-button class="filter-form__item__btn button-delete m-0" square :size="'sm'">
          <IconTrash class="fill-white"/>
          <span class="ml-3 color-white">Hủy lớp</span>
        </app-button>
      </div>
    </div>
    <!--Options group-->

    <!--Table-->
    <app-table
      :loading="loading"
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      @selectionChange="selectRow"
      :data="classList"
      primaryKey="online_class_id"
      multiple-selection
    >
      <template v-slot:cell(online_class_name)="{row}">
        <td>
          <n-link :to="'/elearning/manager/online-class/' + row.online_class_id + '/invites'" class="link">
          {{row.online_class_name}}
          </n-link>
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
          <div>
            {{getLocalTimeHH_MM_A(row.start_time)}} - {{getLocalTimeHH_MM_A(row.end_time)}}
          </div>
          <div>
            {{getDateBirthDay(row.start_time)}}
          </div>
        </td>
      </template>

      <template v-slot:actions="{row}">
        <n-link :to="'/elearning/manager/online-class/' + row.online_class_id + '/invites'" class="link">
          <IconPeople class="fill-yellow mr-2"/>Xem danh sách học sinh
        </n-link>
      </template>
    </app-table>
    <!--End table-->

    <app-modal-confirm
        v-if="showModalConfirm"
        :confirmLoading="confirmLoading"
        @ok="deleteRows"
        :width="550"
        @cancel="showModalConfirm = false"
        :footer="false"
        :header="false"
        title="Bạn có chắc chắn muốn hủy lớp học?"
        description="Bạn sẽ không thể khôi phục lớp học bị xóa."
      />
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrow from "~/assets/svg/icons/arrow.svg?inline";
import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline";
import IconTrash from "~/assets/svg/icons/trash-alt.svg?inline";
import IconHamberger from '~/assets/svg/icons/hamberger.svg?inline';
import IconTimesCircle from '~/assets/svg/design-icons/times-circle.svg?inline';
import IconPeople from '~/assets/svg/v2-icons/people_24px.svg?inline';

import {
  getDateBirthDay,
  getLocalTimeHH_MM_A
} from "~/utils/moment";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";

export default {
  layout: "manage",
    
  components: {
    IconTimesCircle,
    IconFilter,
    IconSearch,
    IconArrow,
    IconCalendar,
    IconTrash,
    IconPeople,
    IconHamberger
  },

  data() {
    return {
      showFilter: false,
      showModalConfirm: false,
      rowClassId: null,
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
          name: "time",
          text: "Thời gian",
          sort: true
        },
        {
          name: "num_invitation",
          text: "Số học sinh đã mời",
          sort: true
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
      classList: [],
      lessonList: [],
      ids: [],
      params: {
        page: 1,
        size: 10,
        class_status: "SCHEDULED",
        elearning_id: null,
        status: null,
        query_date: null,
        query: null,
      },
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateClass: "OnlineClass"
    }),
    ...mapState(STORE_PUBLIC_SEARCH, {
      stateElearnings: "Elearnings"
    })
  },

  methods: {
    getDateBirthDay,
    getLocalTimeHH_MM_A,

    toggleFilter() {
      if (this.showFilter) {
        this.filterCourse = null;
        this.params = {...this.params,
          elearning_id: null
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

    handleChangedCourse(val) {
      this.params.elearning_id = this.filterCourse.value;
      this.getList();
    },

    selectRow(data) {
      this.ids = data.map((row, index, data) => {
        return row.online_class_id;
      });
    },

    async getElearnings() {
      try {
        let userId = this.$store.state.auth.token
          ? this.$store.state.auth.token.id
          : "";
        await this.$store.dispatch(
          `${STORE_PUBLIC_SEARCH}/${actionTypes.ELEARNING_PUBLIC_ELEARNING.LIST}`,
          { params: {teacher_id: userId} }
        );
        let lessonList = this.get(this.stateElearnings, "data", []);
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

    async getList() {
      const self = this;
      try {
        self.loading = true;
        let params = { ...self.params };
        await self.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_OLCLASSES.LIST}`,
          { params }
        );

        this.classList = this.get(self.stateClass, "data.content", []);
        this.pagination.size = this.get(this.stateClass, "data.size", 10);
        this.pagination.first = this.get(this.stateClass, "data.first", 1);
        this.pagination.last = this.get(this.stateClass, "data.last", 1);
        this.pagination.number = this.get(this.stateClass, "data.number", 0);
        this.pagination.totalPages = this.get(this.stateClass, "data.total_pages", 0);
        this.pagination.totalElements = this.get(this.stateClass, "data.total_elements", 0);
        this.pagination.numberOfElements = this.get(this.stateClass, "data.number_of_elements", 0);
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
        this.showModalConfirm = false;
        this.getList();
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    get
  },

  created() {
    this.getList();
    this.getElearnings();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
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