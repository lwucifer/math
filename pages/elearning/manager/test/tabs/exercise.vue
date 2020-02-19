<template>
  <div>
    <!--Filter form-->
    <div class="filter-form">
      <div class="filter-form__item">
        <app-button
          color="primary"
          @click="submit"
          class="filter-form__item__btn filter-form__item__btn--submit"
        >
          <IconFilter />
          <span>Lọc kết quả</span>
        </app-button>
      </div>

      <div class="filter-form__item">
        <app-vue-select
          class="filter-form__item__selection"
          v-model="filter.province"
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
    </div><!--End filter form-->

    <!--Table-->
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
    /><!--End table-->
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline"
import { mapState } from "vuex"
import * as actionTypes from "~/utils/action-types"
// Import faked data
import { EXERCISES } from "~/server/fakedata/elearning/test";

export default {

  components: {
    IconFilter,
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
      ],
      filter: {
          type: null,
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
      isTeacher: true,
      time1: null,
      time2: null,
      opt1: "",
      opts1: [
        { value: "", text: "Loại giao dịch" },
        { value: "1", text: "Mua" },
        { value: "2", text: "Bán" }
      ],
      teacher: {
        id: "1",
        name: "Savannah Mckinney",
        avatar: "https://picsum.photos/125/125"
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
      console.log('[Component] SchoolFilter: submitted')
    },
    handleChangedInput(val) {
      if (val !== null) {} else {}
      console.log('[Component] SchoolFilter: changing input...', val)
    },
    handleFocusSearchInput() {
      console.log('[Component] SchoolFilter: focus searching ')
    },
    handleBlurSearchInput() {
      console.log('[Component] SchoolFilter: blur searching ')
    }
  }
};
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss"
</style>