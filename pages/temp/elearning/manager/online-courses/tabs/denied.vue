<template>
  <div class="elearning-wrapper">
    <!--Filter form-->
    <div class="filter-form">
      <div class="filter-form__item">
        <label for="">Chọn ngày</label>
        <app-date-picker
          class="ml-3"
          v-model="filter.time"
          square
          size="sm"
          placeholder="dd/mm/yyyy"
        >
          <template v-slot:icon-calendar>
            <IconCalendar />
          </template>
        </app-date-picker>
      </div>
    </div>

    <div class="filter-form">
      <div class="filter-form__item">
        <app-button
          color="primary"
          class="filter-form__item__btn filter-form__item__btn--submit"
          :size="'sm'"
          @click="submit"
        >
          <IconFilter/>
          <span>Lọc kết quả</span>
        </app-button>
      </div>

      <div class="filter-form__item" style="min-width: 15rem">
        <app-vue-select
          class="app-vue-select filter-form__item__selection"
          v-model="filter.course"
          :options="courses"
          label="text"
          placeholder="Theo khóa học"
          searchable
          clearable
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
        >
        </app-vue-select>
      </div>

      <div class="filter-form__item" style="min-width: 15rem">
        <app-vue-select
          class="app-vue-select filter-form__item__selection"
          v-model="filter.status"
          :options="statuses"
          label="text"
          placeholder="Theo trạng thái"
          searchable
          clearable
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
        >
        </app-vue-select>
      </div>

      <!--Right form-->
      <div class="filter-form__right">
        <div style="width: 31.8rem;">
          <app-search
            class=""
            :placeholder="'Nhập để tìm kiếm...'"
            v-model="filter.query"
            :size="'sm'"
          >
          </app-search>
        </div>
      </div><!--End right form-->

    </div><!--End filter form-->

    <!--Options group-->
    <div
      class="filter-form mb-0"
    >
      <div class="filter-form__item">
        <app-button
          color="secondary"
          class="filter-form__item__btn"
          square
          :size="'sm'"
        >
          <IconTrash/>
          <span class="ml-3">Hủy lớp</span>
        </app-button>
      </div>
    </div> <!--Options group-->

    <!--Table-->
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      multiple-selection
      @selectionChange="selectRow"
    >
      <template v-slot:cell(action)="{row}">
        <td class="nowrap">
          <n-link
            class
            to
          >
            Chi tiết
          </n-link>
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
  import IconFilter from "~/assets/svg/icons/filter.svg?inline"
  import IconSearch from "~/assets/svg/icons/search.svg?inline"
  import IconArrow from "~/assets/svg/icons/arrow.svg?inline"
  import IconCalendar from "~/assets/svg/icons/calendar2.svg?inline"
  import IconTrash from "~/assets/svg/icons/trash-alt.svg?inline"
  import {mapState} from "vuex"
  import * as actionTypes from "~/utils/action-types"
  // Import faked data
  import { SCHEDULES } from "~/server/fakedata/elearning/test"

  export default {

    components: {
      IconFilter,
      IconSearch,
      IconArrow,
      IconCalendar,
      IconTrash
    },

    data() {
      return {
        tab: 1,
        heads: [
          {
            name: "room",
            text: "Phòng học",
          },
          {
            name: "course",
            text: "Thuộc khóa học",
          },
          {
            name: "visibility",
            text: "Hiển thị",
          },
          {
            name: "time",
            text: "Thời gian",
            sort: true
          },
          {
            name: "view",
            text: "Lượt xem",
            sort: true
          },
          {
            name: "studentNum",
            text: "Số học sinh tham gia",
            sort: true
          },
          {
            name: "action",
            text: "",
          }
        ],
        filter: {
          course: null,
          status: null,
          time: null
        },
        courses: [
          {
            value: 1,
            text: 'Khóa học 1'
          },
          {
            value: 2,
            text: 'Khóa học 2'
          },
        ],
        statuses: [
          {
            value: 1,
            text: 'Status 1'
          },
          {
            value: 2,
            text: 'Status 2'
          },
        ],
        isAuthenticated: true,
        pagination: {
          total: 15,
          page: 6,
          pager: 20,
          totalElements: 55,
          first: 1,
          last: 10
        },
        list: SCHEDULES,
      };
    },
    computed: {
      ...mapState("auth", ["loggedUser"])
    },

    methods: {
      onPageChange(e) {
        const that = this;
        that.pagination = {...that.pagination, ...e};
        console.log(that.pagination);
      },
      submit() {
        console.log('[Component] Elearning classroom: submitted')
      },
      handleChangedInput(val) {
        if (val !== null) {
        } else {
        }
        console.log('[Component] Elearning classroom: changing input...', val)
      },
      handleFocusSearchInput() {
        console.log('[Component] Elearning classroom: focus searching ')
      },
      handleBlurSearchInput() {
        console.log('[Component] Elearning exam: blur searching ')
      },
      handleSearch() {
        console.log('[Component] Elearning exam: searching')
      },
      selectRow(data) {
        console.log('change row: ', data)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
</style>