<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="7" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <header-breadcrumb
              title="Bài giảng và khóa học"
              :breadcrumb="breadcrumb"
            />
          </div>
          
          <div class="elearning-manager-content__main">
            <elearning-manager-student :data="student"/>
            <student-review-mark-table
              :list.sync="list"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import ElearningManagerStudent from "~/components/page/elearning/manager/ElearningManagerStudent";
import StudentReviewMarkTable from "~/components/page/elearning/manager/student/tables/Mark";
import HeaderBreadcrumb from "~/components/page/elearning/HeadBreadcrumb"

// Import faked data
import {  } from "~/server/fakedata/elearning/test"

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningManagerSide,
    ElearningManagerStudent,
    HeaderBreadcrumb,
    StudentReviewMarkTable
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
        percent: "69",
        class: "10B",
      },
      list: [
        {
          id: 1,
          name: "Bài tập 1",
          points: "10",
          mark: "6",
          lesson: "Bài tập tích phân",
          elearning: "Khóa học đại số lớp 10",
          status: "0",
          date: "19/11/2019",
        },
        {
          id: 1,
          name: "Bài tập 1",
          points: "10",
          mark: "6",
          lesson: "Bài tập tích phân",
          elearning: "Khóa học đại số lớp 10",
          status: "-1",
          date: "19/11/2019",
        },
        {
          id: 1,
          name: "Bài tập 1",
          points: "10",
          mark: "6",
          lesson: "Bài tập tích phân",
          elearning: "Khóa học đại số lớp 10",
          status: "0",
          date: "19/11/2019",
        },
        {
          id: 1,
          name: "Bài tập 1",
          points: "10",
          mark: "6",
          lesson: "Bài tập tích phân",
          elearning: "Khóa học đại số lớp 10",
          status: "1",
          date: "19/11/2019",
        },
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    breadcrumb: function() {
      let data = [
        {
          text: 'Bài giảng và khóa học',
          link: '/elearning/manager/exams'
        },
        {
          text: 'Bài tập đại số lớp 10',
          link: '/elearning/manager/exams'
        },
        {
          text: 'Nguyễn Văn Nam',
          link: '/'
        }
      ]
      return data
    }
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
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>