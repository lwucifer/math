<template>
  <div class="container">
    <div class="row wrap-filter-form__ElearningManagerInteractive justify-content-between">
      <!-- <app-button square size="sm" class="btnCreate-notify__ElearningManagerInteractive mr-4">
        <n-link
          :to="'/elearning/manager/interactive/createnotify'"
          class="n-link__ElearningManagerInteractive"
        >Tạo thông báo</n-link>
      </app-button> -->

     
      <div class="wrapSearchForm___ElearningManagerFilterTable search--modifer">
        <app-input
          type="text"
          v-model="filter.query"
          placeholder="Nhập để tìm kiếm..."
          :size="'sm'"
          @input="handleSearch"
          class="inputSearch"/>

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
          @search:blur="handleBlurSearchInput"></app-vue-select>
      </div>
    </div>

    <div class="wrapTable__ElearningManagerInteractive">
      <app-table :heads="heads" :pagination="pagination" @pagechange="onPageChange" :data="list">
        <template v-slot:cell(action)="{row}">
          <td>
            <n-link class title="Chi tiết" :to="'/elearning/manager/test/' + row.id">Xem chi tiết</n-link>
          </td>
        </template>
        <template v-slot:cell(content)="{row,index}">
          <td
            title="Chi tiết"
            class="table-notify__ElearningManagerInteractive"
            v-on:mouseover="clickQuestion({row, index})"
            v-on:mouseleave="closeDetail()"
          >
            <span v-if="row.content.length>200">{{row.content.slice(0,200)}}...</span>
            <span v-if="row.content.length<=200">{{row.content}}</span>
            <div
              class="content-detail__notify"
              v-if="(currentQuestionIndex >=0) && (index == currentQuestionIndex)"
            >
              <span>{{row.content}}</span>
            </div>
          </td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
import IconHamberger from '~/assets/svg/icons/hamberger.svg?inline';
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { NOTIFIES } from "~/server/fakedata/elearning/materials";
export default {
  layout: "manage",
    
  components: {
    IconHamberger,
    IconSearch
  },
  data() {
    return {
      currentQuestionIndex: null,
      tab: 1,
      heads: [
        {
          name: "title",
          text: "Tiêu đề",
          sort: false
        },
        {
          name: "content",
          text: "Nội dung thông báo",
          sort: false
        },
        {
          name: "lesson",
          text: "Bài giảng khoa học",
          sort: false
        },
        {
          name: "time",
          text: "Thời gian",
          sort: false
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
      list: NOTIFIES,
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
    clickQuestion({ row, index }) {
      console.log("click question");
      this.currentQuestionIndex = index;
    },
    closeDetail() {
      console.log("close");
      this.currentQuestionIndex = null;
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