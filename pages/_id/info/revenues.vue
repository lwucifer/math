<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="'3'" :school="teacher" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <div class="elearning-history__title">
            <h5 class="color-primary mb-3">Doanh thu</h5>
            <div class="d-flex-center">
              <p>
                <span>Số dư:</span>
                <strong class="color-red h5">15.000.000 đ</strong>
              </p>
              <app-button color="secondary" size="sm" class="ml-4" square>Rút tiền</app-button>
              <n-link class="ml-auto" :to="'/elearning/revenue/withdrawal'">Xem lịch sử rút tiền</n-link>
            </div>
            <hr class="mt-3" />
          </div>

          <div class="elearning-history__statistical">
            <h5 class="mt-15 mb-3">Thống kê doanh thu</h5>
            <div class="row">
              <div class="col-md-3">
                <div class="item">
                  <p>Hôm nay</p>
                  <strong>150.000 đ</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <p>Tuần này</p>
                  <strong>550.000 đ</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <p>Tháng này</p>
                  <strong>1.500.000 đ</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <p>Tháng trước</p>
                  <strong>2.500.000 đ</strong>
                </div>
              </div>
            </div>
            <hr class="mt-4" />
          </div>

          <div class="elearning-history__table">
            <div class="d-flex mb-3 pl-4 pr-4">
              <n-link :to="'/elearning/revenue/'" class="bold text-decoration-none d-flex-center">
                <IconArrowLeft class="fill-primary" />Quay lại
              </n-link>
              <p class="ml-auto">Chi tiết doanh số từ 01/10/2019 đến 01/11/2019</p>
            </div>
            <app-table :heads="heads" :pagination="pagination" @pagechange="onPageChange" :data="list">
              <tr v-for="(item , index) in list" :key="index">
                <td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>
              </tr>
            </app-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";


import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    IconArrowLeft,
    SchoolAccountSide,
  },

  data() {
    return {
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
      list: [
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "5290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "9290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019",
          status: "<span>xxxx</span>"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "7290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "3290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "5290000",
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
          price: "4290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1590000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1660000",
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
@import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>