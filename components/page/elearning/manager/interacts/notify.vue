<template>
  <div class="container">
    <div class="d-flex interacts-filter mb-4">
      <app-search
        class="interacts-qa-search mb-0 mr-3"
        bordered
        size="sm"
        placeholder="Nhập để tìm kiếm"
        v-model="filter.query"
        @submit="handleSearch"
      ></app-search>

      <app-button
        class="mr-3"
        :color="isFilter ? 'primary' : 'default'"
        :outline="!isFilter"
        size="sm"
        @click="isFilter = !isFilter"
      >
        <IconHamberger class="icon mr-1" />&nbsp;Lọc kết quả
      </app-button>

      <template v-if="isFilter">
        <app-vue-select
          class="app-vue-select filter-course"
          v-model="filter.province"
          :options="lessonOpts"
          placeholder="Bài giảng/khóa học"
          searchable
          has-border
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
          :all-opt="allOpt"
        />
      </template>
    </div>

    <app-button color="pink" size="sm">
      <IconDeleteForever class="icon body-1 mr-2" />Xoá
    </app-button>

    <div class="wrapTable__ElearningManagerInteractive">
      <app-table
        :heads="heads"
        :pagination="pagination"
        @pagechange="onPageChange"
        :data="list"
        multiple-selection
      >
        <template v-slot:cell(action)="{row}">
          <td>
            <n-link class title="Chi tiết" :to="'/elearning/manager/test/' + row.id">
              <IconArrowForwardIos24pxOutlined />
            </n-link>
          </td>
        </template>

        <template v-slot:cell(content)="{row}">
          <td>
            <v-popover
              trigger="hover"
            >
              <span>{{row.content | truncStrFilter(30)}}</span>
              <template slot="popover">
                <span>{{row.content}}</span>
              </template>
            </v-popover>
          </td>
        </template>

        <template v-slot:cell(title)="{row}">
          <td>
            <v-popover
              trigger="hover"
            >
              <span>{{row.title | truncStrFilter(30)}}</span>
              <template slot="popover">
                <span>{{row.title}}</span>
              </template>
            </v-popover>
          </td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconArrowForwardIos24pxOutlined from "~/assets/svg/icons/arrow-forward-ios-24px-outlined.svg?inline";
import IconDeleteForever from "~/assets/svg/v2-icons/delete_forever_24px.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { NOTIFIES } from "~/server/fakedata/elearning/materials";
import { get } from 'lodash'
const STORE_TEACHING_PUBLIC_LIST = "elearning/teaching/teaching-public";
export default {
  layout: "manage",

  components: {
    IconHamberger,
    IconSearch,
    IconDeleteForever,
    IconArrowForwardIos24pxOutlined
  },
  data() {
    return {
      currentQuestionIndex: null,
      tab: 1,
      heads: [
        {
          name: "",
          text: "",
          selectAll: true
        },
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
        total_elements: 55,
        first: 1,
        last: 10
      },
      list: NOTIFIES,
      listQuery: {
        page: 1,
        size: 10
      },
      isFilter: false,
      allOpt: {
        value: null,
        label: 'Tất cả'
      }
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_TEACHING_PUBLIC_LIST, ["teachingPublicList"]),
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