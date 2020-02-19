<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3" />
      </div>
      <div class="col-md-9">
        <div class="elearning-test">
          <div class="elearning-test__title">
            <h5 class="color-primary mb-3">Bài tập và bài kiểm tra</h5>
            <div class="elearning-test__title__nav">
                <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Bài tập</a>
                <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Bài kiểm tra</a>
            </div>
            <hr class />
          </div>

          <div class="elearning-test__table">
            <keep-alive>
              <component v-bind:is="currentTabComponent" class="tab"></component>
            </keep-alive>
            <!--<app-table :heads="heads" :pagination="pagination" @pagechange="onPageChange" :data="list"/>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

const ExerciseTab = () => import("./tabs/exercise");
const ExamTab = () => import("./tabs/exam");

export default {

  components: {
    ElearningManagerSide,
    ExerciseTab,
    ExamTab,
  },

  data() {
    return {
      tab: 1,
      heads: [
        {
          name: "time",
          text: "Thời gian",
          sort: true
        },
        {
          name: "code",
          text: "Mã đơn hàng",
          sort: true
        },
        {
          name: "customer",
          text: "Khách hàng",
          sort: false
        },
        {
          name: "name",
          text: "Nội dung",
          sort: false
        },
        {
          name: "price",
          text: "Giá trị",
          sort: true
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
      active_el: 0
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    currentTabComponent: function() {
      // List of tabs
      const MATCHED_TABS = ['ExerciseTab', 'ExamTab']
      return (this.tab > 0) ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0]
    }
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-test.scss"
</style>