<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <div class="pl-4 pr-4">
            <h5 class="color-primary mb-15">Bài giảng và khóa học</h5>
            <p>Danh sách bài giảng và khóa học  > <strong>Bài giảng đại số lớp 10</strong></p>
            <hr class="mt-3 mb-3"/>
            <h5>Danh sách học sinh tham gia</h5>
            <div class="d-flex-center mt-4 mb-3">
              <app-button rounded size="sm" class="mr-4" normal>
                <IconFilter />Lọc kết quả
              </app-button>
              <app-select :options="opts1" v-model="opt1" size="sm" />
              <app-input class="mb-0 ml-auto" size="sm" placeholder="Nhập để tìm kiếm...">
                <a class="d-flex" slot="unit">
                  <IconSearch width="17" height="17" />
                </a>
              </app-input>
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
              <td v-html="item.class"></td>
              <td v-html="item.date"></td>
              <td v-html="item.percent"></td>
              <td v-html="item.question"></td>
              <td>
                <n-link to="./student/view">Xem chi tiết</n-link>
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
    IconSearch,
    IconTrashAlt,
    IconFilter
  },

  // async fetch({ params, query, store }) {
  //   await Promise.all([
  //     store.dispatch(`elearning/courses/student/${actionTypes.ELEARNING_COURSES.LIST}`),
  //   ]);
  // },

  data() {
    return {
      tab: 1,
      heads: [
        {
          name: "name",
          text: "Học sinh",
          sort: true
        },
        {
          name: "class",
          text: "Lớp",
          sort: true
        },
        {
          name: "date",
          text: "Ngày tham gia",
          sort: true
        },
        {
          name: "percent",
          text: "Tiến độ học tập",
          sort: true
        },
        {
          name: "question",
          text: "Câu hỏi giáo viên",
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
        total_elements: 55,
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
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning/courses/student", {
      student: "info"
    })
  },

  methods: {
    sort(e) {
      this.list = [...e];
    },
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    },
    /**
     * DELETE
     */
    async deletePost(id) {
      const doDelete = await new CoursesService(this.$axios)[
        actionTypes.BASE.DELETE
      ](id);

      if (doDelete.success) {
        const { courses } = this;
        const newListPost =
          courses && courses.listPost
            ? courses.listPost.filter(item => item.post_id !== id)
            : [];
        this.courses = {
          listPost: newListPost,
          page: courses.page || {}
        };
      } else {
        this.$toasted.error(doDelete.message);
      }
    },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";
</style>