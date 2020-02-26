<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="1" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager box">
          <h5 class="color-primary">
            Tổng quan
            <hr class="mt-3" />
          </h5>

          <div class="elearning-manager__dashboard mt-15">
            <div class="row row-space-5">
              <div class="col-md-3">
                <div class="item">
                  <div class="top">
                    <IconBook class="fill-primary mr-3" />Số bài giảng
                  </div>
                  <strong>35</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <div class="top">
                    <IconCalendar class="fill-primary mr-3" />Số khóa học
                  </div>
                  <strong>59</strong>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item">
                  <div class="top">
                    <IconChartLine class="fill-primary mr-3" />Điểm bình chọn giáo viên
                  </div>
                  <div class="bottom">
                    <strong class="mr-4">4/5</strong>
                    <app-stars :stars="4" :size="16" />
                  </div>
                </div>
              </div>
            </div>
            <hr class="mt-4 mb-4" />
            <div class="d-flex">
              <div class="item">
                <div class="top">
                  <IconUserUser class="fill-primary mr-3" />Số học sinh tham gia
                </div>
                <strong>33</strong>
              </div>
              <div class="ml-auto">
                <app-select size="sm" />
              </div>
            </div>
            <hr class="mt-4 mb-4" />
            <div class="d-flex">
              <div class="item">
                <div class="top">
                  <IconUserUser class="fill-primary mr-3" />Doanh thu
                </div>
                <strong class="mb-3">1.250.330 VNĐ</strong>
                <n-link :to="'/elearning/manager/revenue'" class="color-red">Xem chi tiết doanh thu</n-link>
              </div>
              <div class="ml-auto">
                <app-select size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolManagerSide from "~/components/page/school/manager/SchoolManagerSide";
import IconCalendar from "~/assets/svg/icons/calendar.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconDollarAlt from "~/assets/svg/design-icons/dollar-alt.svg?inline";
import IconChartLine from "~/assets/svg/design-icons/chart-line.svg?inline";
import IconUserUser from "~/assets/svg/icons/user-user.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    SchoolManagerSide,
    IconUserUser,
    IconBook,
    IconCalendar,
    IconDollarAlt,
    IconChartLine,
    IconChartLine
  },

  data() {
    return {
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
      list: [
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        }
      ],
      active_el: 0
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
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/manager/_school-manager.scss";
</style>