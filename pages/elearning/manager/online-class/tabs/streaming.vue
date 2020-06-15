<template>
  <div class="elearning-wrapper">
    <!--Filter form-->
    <div class="filter-form">
      <div class="d-flex">
      <div class="filter-form__item" style="max-width:36rem;min-width:30rem;">
        <div style="width: 100%">
          <app-search
            class
            :placeholder="'Nhập để tìm kiếm...'"
            bordered
            v-model="params.query"
            :size="'sm'"
            @submit="submit"
            @keyup.enter.native="submit"
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
          :options="courseOpts"
          label="text"
          placeholder="Bài giảng/khóa học"
          @input="handleChangedCourse"
          :all-opt="allOpt"
          has-border
        ></app-vue-select>
      </div>
    </div>
    </div>
    <!--End filter form-->

    <!--Options group-->
    <div class="filter-form">
      <div class="filter-form__item">
        <app-button class="filter-form__item__btn m-0" color="pink" square :size="'sm'"
        :disabled="ids.length == 0" @click="showModalConfirm = true">
          <IconTrash class="fill-white"/>
          <span class="ml-3">Hủy phòng học</span>
        </app-button>
      </div>
    </div>
    <!--Options group-->

    <!--Table-->
    <OnlineClassTable 
      :loading="loading" 
      :pagination="pagination" 
      @pagechange="onPageChange"
      @selectionChange="selectRow"
      @sort="handleSort"
      :actions="[1,0,1]"
      :data="classList"/>
    <!--End table-->

    <ModalJoinClass :id="rowClassId" v-if="modalShow" @close="modalShow = false" :info="modalData"/>

    <app-modal-confirm
        v-if="showModalConfirm"
        @ok="deleteRows"
        :width="550"
        @cancel="showModalConfirm = false"
        :footer="false"
        :header="false"
        title="Bạn có chắc chắn muốn hủy phòng học?"
        description="Bạn sẽ không thể khôi phục phòng học bị xóa."
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
import OnlineClassTable from "~/components/page/elearning/manager/olclass/OnlineClassTable";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get, reduce } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";

export default {
  components: {
    IconTimesCircle,
    IconFilter,
    IconSearch,
    IconArrow,
    IconCalendar,
    IconTrash,
    IconHamberger,
    OnlineClassTable
  },

  data() {
    return {
      allOpt: {
        value: null,
        text: 'Tất cả'
      },
       showModalConfirm: false,
      rowClassId: null,
      showFilter: false,
      modalShow: false,
      modalData: {},
      filterCourse: null,
      courses: [],
      pagination: {
        total: 0,
        number: 0,
        size: 10,
        total_elements: 0,
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
        search_type: null,
        sort: 'start_time,desc'
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
      stateElearnings: "Elearnings"
    }),
    courseOpts() {
      let list = [];
      let elearnings = get(this.stateElearnings, 'data', []);
      elearnings.forEach(element => {
        if (!element.is_hidden) {
          list.push({
            value: element.id,
            text: element.name
          });
        }
      });
      return [this.allOpt, ...list]
    }
  },

  methods: {
    handleSort(e) {
      const sortBy = e.sortBy + ',' + e.order;
      this.params = {...this.params, sort: sortBy};
      this.getList();
    },

    toggleFilter() {
      if (this.showFilter && this.filterCourse != null) {
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
    handleChangedCourse() {
      this.params.elearning_id = this.filterCourse.value;
      this.getList();
    },
    handleFocusSearchInput() {},
    handleBlurSearchInput() {},
    handleSearch() {},
    selectRow(data) {
      this.ids = data.map((row, index, data) => {
        return row.online_class_id;
      });
    },

    

    formatAMPM(time) {
      let date = new Date(time.getTime() + 7*60*60*1000);
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

        self.classList = self.get(self.stateClass, "data.content", []);
        self.pagination.size = self.get(self.stateClass, "data.size", 10);
        self.pagination.first = self.get(self.stateClass, "data.first", 1);
        self.pagination.last = self.get(self.stateClass, "data.last", 1);
        self.pagination.number = self.get(self.stateClass, "data.number", 0);
        self.pagination.total_pages = self.get(
          self.stateClass,
          "data.total_pages",
          0
        );
        self.pagination.total_elements = self.get(
          self.stateClass,
          "data.total_elements",
          0
        );
        self.pagination.number_of_elements = self.get(
          self.stateClass,
          "data.number_of_elements",
          0
        );
      } catch (e) {
      } finally {
        self.loading = false;
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
      
      this.showModalConfirm = false;
    },

    openModal(row) {
      this.rowClassId = row.online_class_id;
      this.modalData = row;
      this.modalShow = true;
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