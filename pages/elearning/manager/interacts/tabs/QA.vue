<template>
  <div class="container">
    <div class="row wrap-filter-form__ElearningManagerInteractive">
      <div class="filter-form__ElearninManagerInteractive">

        <div class="wrapSearchForm___ElearningManagerFilterTable">
          <app-input
            type="text"
            v-model="filter.query"
            placeholder="Nhập để tìm kiếm..."
            :size="'sm'"
            @input="handleSearch"
            class="inputSearch"
          />

          <button class="btn-search">
            <IconSearch width="15" height="15" />
          </button>
        </div>

        <div class="filter-results">
          <app-button
            color="primary"
            class="btnFilterSummit__ElearningManagerInteractive"
            :size="'sm'"
            @click="submit"
          >
            <IconHamberger />
            <span>Lọc kết quả</span>
          </app-button>
        </div>


        <div class="filter-course">
          <app-vue-select
            class="app-vue-select filter-form__item__selection"
            v-model="filter.province"
            :options="classes"
            label="text"
            placeholder="Bài giảng/khóa học"
            searchable
            clearable
            @input="handleChangedInput"
            @search:focus="handleFocusSearchInput"
            @search:blur="handleBlurSearchInput"
          ></app-vue-select>
        </div>


        <div class="filter-status">
          <app-vue-select
            class="app-vue-select filter-form__item__selection"
            :options="results"
            label="text"
            placeholder="Trạng thái"
            searchable
            clearable
            @input="handleChangedInput"
            @search:focus="handleFocusSearchInput"
            @search:blur="handleBlurSearchInput"
          ></app-vue-select>
        </div>
      </div>
    </div>
    
    <div class="wrapTable__ElearningManagerInteractive">
      <app-table :heads="heads" :pagination="pagination" @pagechange="onPageChange" :data="list">
        <template v-slot:cell(action)="{row}">
          <td>
            <n-link class title="Chi tiết" :to="'/elearning/manager/test/' + row.id"><IconArrowForwardIos24pxOutlined/></n-link>
          </td>
        </template>
        <template v-slot:cell(status)="{row}">
          <td v-if="row.status=='1'">Đã trả lời</td>
          <td v-else class="status-not-reply">Chưa trả lời</td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
import IconHamberger from '~/assets/svg/icons/hamberger.svg?inline';
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrowForwardIos24pxOutlined from '~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline';

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { QUESTIONS } from "~/server/fakedata/elearning/materials";
export default {
  layout: "manage",
    
  components: {
    IconHamberger,
    IconSearch,
    IconArrowForwardIos24pxOutlined
  },
  data() {
    return {
      tab: 1,
      heads: [
        {
          name: "question",
          text: "Câu hỏi",
          sort: false
        },
        {
          name: "lesson",
          text: "Bài giảng khóa học",
          sort: false
        },
        {
          name: "student",
          text: "Người hỏi",
          sort: false
        },
        {
          name: "class",
          text: "Lớp",
          sort: false
        },
        {
          name: "status",
          text: "Trạng thái",
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
      classes: [
        {
          value: 1,
          text: "11A"
        },
        {
          value: 2,
          text: "10A"
        }
      ],
      results: [
        {
          value: 1,
          text: "Đạt"
        },
        {
          value: 2,
          text: "Chưa đạt"
        }
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
      list: QUESTIONS,
      listQuery: {
        page: 1,
        size: 10
      }
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
      console.log("[Component] Elearning exam: submitted");
    },
    handleChangedInput(val) {
      if (val !== null) {
      } else {
      }
      console.log("[Component] Elearning exam: changing input...", val);
    },
    handleFocusSearchInput() {
      console.log("[Component] Elearning exam: focus searching ");
    },
    handleBlurSearchInput() {
      console.log("[Component] Elearning exam: blur searching ");
    },
    handleSearch() {
      console.log("[Component] Elearning exam: searching");
    },
    async getList() {
      const elearningType = "1";
      this.listQuery.type = elearningType;
      let params = {
        type: elearningType
      };
      params = { ...this.listQuery };
      this.$store.dispatch(
        `elearning/study/study/${actionTypes.ELEARNING_STURY.LIST}`,
        { params }
      );
    }
  },

  created() {
    this.getList();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-interactive.scss";
</style>