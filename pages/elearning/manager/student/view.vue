<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="7" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <div class="pl-4 pr-4">
            <h5 class="color-primary mb-15">Bài giảng và khóa học</h5>
            <p>Danh sách bài giảng và khóa học  > <strong>Bài giảng đại số lớp 10</strong></p>
            <hr class="mt-3 mb-3"/>

            <h5 class="mb-3">Thông tin học sinh</h5>
            <ElearningManagerStudent :data="student"/>

            <div class="d-flex-center mt-5 mb-3">
              <h5>Điểm đánh giá</h5>
              <div class="ml-auto">
                <app-button rounded size="sm" class="mr-4" normal>
                  <IconFilter />Lọc kết quả
                </app-button>
                <app-select :options="opts1" v-model="opt1" size="sm" />
              </div>
            </div>
          </div>

          <app-table
            :heads="heads"
            :pagination="pagination"
            @pagechange="onPageChange"
            @sort="sort"
            :data="list"
            :sortBy="list"
          >
            <tr v-for="(item, index) in list" :key="index">
              <td v-html="item.name"></td>
              <td v-html="item.score" v-if="item.score" class="bold color-red"></td>
              <td v-else>Chưa chấm điểm</td>
              <td v-html="item.lesson"></td>
              <td v-html="item.course"></td>
              <td>
                <n-link to>Xem chi tiết</n-link>
              </td>
            </tr>
          </app-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import ElearningManagerStudent from "~/components/page/elearning/manager/ElearningManagerStudent";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconFilter from '~/assets/svg/icons/filter.svg?inline';

// Import faked data
import {  } from "~/server/fakedata/elearning/test"

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningManagerSide,
    ElearningManagerStudent,
    IconSearch,
    IconTrashAlt,
    IconFilter
  },

  data() {
    return {
      tab: 1,
      heads: [
        {
          name: "name",
          text: "Tiêu đề",
          sort: true
        },
        {
          name: "score",
          text: "Điểm",
          sort: true
        },
        {
          name: "lesson",
          text: "Thuộc bài giảng",
          sort: true
        },
        {
          name: "course",
          text: "Thuộc khóa học",
          sort: true
        },
        {
          name: "",
          text: "",
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
      isTeacher: true,
      time1: null,
      time2: null,
      opt1: "",
      opts1: [
        { value: "", text: "Theo loại" },
        { value: "1", text: "Mua" },
        { value: "2", text: "Bán" }
      ],
      opt2: "",
      opts2: [
        { value: "", text: "Theo hiển thị" },
        { value: "1", text: "Tăng dần" },
        { value: "2", text: "Giảm dần" }
      ],
      teacher: {
        id: "1",
        name: "Savannah Mckinney",
        avatar: "https://picsum.photos/125/125"
      },
      student: {
        id: "1",
        name: "Trần Văn Nam",
        percent: "50",
        class: "10B",
      },
      list: [
        {
          id: 1,
          name: "Mua khóa học Đại số 11",
          class: "10B",
          question: "6",
          percent: "50%",
          date: "19/11/2019", 
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 11",
          class: "10B",
          question: "6",
          percent: "50%",
          date: "19/11/2019", 
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 11",
          class: "10B",
          question: "6",
          percent: "50%",
          date: "19/11/2019", 
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 11",
          class: "10B",
          question: "6",
          percent: "50%",
          date: "19/11/2019", 
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 11",
          class: "10B",
          question: "6",
          percent: "50%",
          date: "19/11/2019", 
        },
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    sort(e) {
      this.list = [...e];
    },
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";
</style>