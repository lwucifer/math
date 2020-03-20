<template>
  <div class="elearning-">
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

      <div class="filter-form__item">
        <app-vue-select
          class="app-vue-select filter-form__item__selection"
          v-model="filter.type"
          :options="types"
          label="text"
          placeholder="Theo thể loại"
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
        <div class="filter-form__item filter-form__item--search">
          <app-input
            type="text"
            v-model="filter.query"
            placeholder="Nhập để tìm kiếm..."
            :size="'sm'"
            @input="handleSearch"
          />
          <button type="submit">
            <IconSearch width="15" height="15" />
          </button>
        </div>
      </div><!--End right form-->

    </div><!--End filter form-->

    <!--Table-->
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
    >
      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            class
            title="Chi tiết"
            :to="'/elearning/manager/exams/' + row.id">
            <IconArrow />
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
import { mapState } from "vuex"
import * as actionTypes from "~/utils/action-types"
// Import faked data
import { EXERCISES } from "~/server/fakedata/elearning/test"

export default {

  components: {
    IconFilter,
    IconSearch,
    IconArrow
  },

  data() {
    return {
      tab: 1,
      heads: [
        {
          name: "name",
          text: "Tiêu đề",
          sort: false
        },
        {
          name: "type",
          text: "Thể loại",
          sort: false
        },
        {
          name: "lesson",
          text: "Thuộc bài giảng",
          sort: false
        },
        {
          name: "course",
          text: "Thuộc khóa học",
          sort: false
        },
        {
          name: "studentNum",
          text: "Học sinh làm bài",
          sort: true
        },
        {
          name: "createdAt",
          text: "Ngày khởi tạo",
          sort: true
        },
        {
          name: "action",
          text: "",
          sort: false
        }
      ],
      filter: {
          type: null,
          query: null
      },
      types: [
        {
            value: 1,
            text: 'Trắc nghiệm'
        },
        {
            value: 2,
            text: 'Tự luận'
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
      list: EXERCISES,
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    },
    submit() {
      console.log('[Component] Elearning exercise: submitted')
    },
    handleChangedInput(val) {
      if (val !== null) {} else {}
      console.log('[Component] Elearning exercise: changing input...', val)
    },
    handleFocusSearchInput() {
      console.log('[Component] Elearning exercise: focus searching ')
    },
    handleBlurSearchInput() {
      console.log('[Component] Elearning exercise: blur searching ')
    },
    handleSearch() {
      console.log('[Component] Elearning exercise: searching')
    }
  }
};
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
  /*@import "~/assets/scss/components/elearning/manager/_elearning-exercise.scss";*/
</style>