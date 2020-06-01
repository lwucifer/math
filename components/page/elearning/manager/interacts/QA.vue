<template>
  <div class="container">
    <div class="d-flex interacts-filter">
      <app-search
        class="interacts-qa-search mb-0 mr-3"
        bordered
        size="sm"
        placeholder="Nhập để tìm kiếm"
        v-model="listQuery.keyword"
        @submit="handleSearch"
      ></app-search>

      <app-button class="mr-3" :color="isFilter ? 'primary' : 'default'" :outline="!isFilter" size="sm" @click="clickSubmit">
        <IconHamberger class="icon mr-1" />&nbsp;Lọc kết quả
      </app-button>

      <template v-if="isFilter">
        <app-vue-select
          class="app-vue-select filter-course"
          :options="lessonOpts"
          placeholder="Bài giảng/khóa học"
          searchable
          has-border
          @input="handleChangedInputLesson"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
          :all-opt="allOpt"
          v-model="filters.lesson"
        />

        <app-vue-select
          class="app-vue-select filter-status"
          :options="resultsOpts"
          placeholder="Trạng thái"
          searchable
          has-border
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
          :all-opt="allOpt"
          v-model="filters.result"
        />
      </template>
    </div>

    <div class="wrapTable__ElearningManagerInteractive">
      <app-table
        :heads="heads"
        :pagination="filterPagination"
        @pagechange="onPageChange"
        :data="filterListQuestions"
      >
        <template v-slot:cell(action)="{row}">
          <td>
            <n-link class title="Chi tiết" :to="'/elearning/' + row.elearning_id">
              <IconArrowForwardIos24pxOutlined />
            </n-link>
          </td>
        </template>
        <template v-slot:cell(content)="{row}">
          <td v-html="row.content"></td>
        </template>
        <template v-slot:cell(status)="{row}">
          <td v-if="row.status=='ANSWER'">Đã trả lời</td>
          <td v-else class="status-not-reply">Chưa trả lời</td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrowForwardIos24pxOutlined from "~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline";

import { mapState, mapActions } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { QUESTIONS } from "~/server/fakedata/elearning/materials";
import { get } from 'lodash'
const STORE_NAME_INTERACTS = "elearning/teaching/interactive-listquestion";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";
const STORE_TEACHING_PUBLIC_LIST = "elearning/teaching/teaching-public";
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
          name: "content",
          text: "Câu hỏi",
          sort: false
        },
        {
          name: "elearning_name",
          text: "Bài giảng khóa học",
          sort: false
        },
        {
          name: "student_name",
          text: "Người hỏi",
          sort: false
        },
        {
          name: "class_name",
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
        keyword: null
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
          value: "ANSWER",
          label: "Đã trả lời"
        },
        {
          value: "UNANSWER",
          label: "Chưa trả lời"
        }
      ],
      isAuthenticated: true,
      pagination: {
        total: 15,
        page: 6,
        pager: 20,
        total_elements: 55,
        first: 1,
        last: 10
      },
      list: QUESTIONS,
      listQuery: {
        page: 1,
        size: 10,
        keyword: null,
        status: null,
        elearning_id: null
      },
      isFilter: false,
      allOpt: {
          value: null,
          label: 'Tất cả'
        },
      filters:{
        lesson: null,
        result: null

      }
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAME_INTERACTS, ["listQuestions"]),
    // ...mapState(STORE_PUBLIC_SEARCH, ["Lessons"]),
    ...mapState(STORE_TEACHING_PUBLIC_LIST, ["teachingPublicList"]),
    filterListQuestions() {
      return this.listQuestions && this.listQuestions.content
        ? this.listQuestions.content
        : [];
    },
    filterPagination() {
      return {
        size:
          this.listQuestions && this.listQuestions.size
            ? this.listQuestions.size
            : 10,
        total_pages:
          this.listQuestions && this.listQuestions.total_pages
            ? this.listQuestions.total_pages
            : 1,
        total_elements:
          this.listQuestions && this.listQuestions.total_elements
            ? this.listQuestions.total_elements
            : 0,
        first:
          this.listQuestions && this.listQuestions.first
            ? this.listQuestions.first
            : 1,
        last:
          this.listQuestions && this.listQuestions.last
            ? this.listQuestions.last
            : 1,
        number_of_elements:
          this.listQuestions && this.listQuestions.number_of_elements
            ? this.listQuestions.number_of_elements
            : 0,
        number:
          this.listQuestions && this.listQuestions.number
            ? this.listQuestions.number
            : 0
      };
    },
    filterListLesson() {
      const data = this.teachingPublicList ? this.teachingPublicList : [];
      const filterData = data.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
      return filterData;
    },
    lessonOpts() {
        return [this.allOpt, ...this.filterListLesson]
      },
    resultsOpts(){
      return [this.allOpt, ...this.results]
    }
  },

  methods: {
    ...mapActions(STORE_NAME_INTERACTS, ["teachingInteractiveListquestion"]),
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
      const query = {
        params: {
          ...this.listQuery,
          page : get(e,"number",0) + 1,
          size : get(e,"size",0)
        }
      }
      this.teachingInteractiveListquestion(query);
    },
    submit() {
      console.log("[Component] Elearning exam: submitted");
    },
    handleChangedInput(val) {
      this.listQuery.status = val ? val.value : null;
      // if (val !== null) {
      const query = {
        params: {
          ...this.listQuery,
          status: val && val.value ? val.value : null
        }
      };
      this.teachingInteractiveListquestion(query);
      // } else {
      //   const query = {
      //     params: {
      //       ...this.listQuery,
      //       status: val && val.value ? val.value : ""
      //     }
      //   };
      // this.teachingInteractiveListquestion(query);
      // }
      console.log("[Component] Elearning exam: changing input...", val);
    },
    handleChangedInputLesson(val) {
      this.listQuery.elearning_id = val ? val.value : null;
      const query = {
        params: {
          ...this.listQuery,
          elearning_id: val ? val.value : null
        }
      };
      this.teachingInteractiveListquestion(query);
      console.log("[Component] Elearning exam: changing input...", val);
    },
    handleFocusSearchInput() {
      console.log("[Component] Elearning exam: focus searching ");
    },
    handleBlurSearchInput() {
      console.log("[Component] Elearning exam: blur searching ");
    },
    handleSearch(val) {
      console.log("[Component] Elearning exam: searching", val);
      this.listQuery.keyword = val ? val : null;
      const query = {
        params: { ...this.listQuery }
      };
      this.teachingInteractiveListquestion(query);
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
    },
    clickSubmit(){
      if (this.isFilter) {
          this.resetForm()
          this.isFilter = false
          this.handleChangedInputLesson()
          this.handleChangedInput()
      } else {
          this.isFilter = true
      }
    },
    resetForm(){
      this.filters.lesson = null,
      this.filters.result = null
    }
  },

  created() {
    // this.getList();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-interactive.scss";
</style>