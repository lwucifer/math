<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="7" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <h5 class="color-primary mb-3 elearning-history__title">Bài giảng và khóa học</h5>
          <div class="elearning-manager__tab">
              <div></div>
          </div>

          <div class="elearning-history__statistical">
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
            <app-table
              :heads="heads"
              :pagination="pagination"
              @pagechange="onPageChange"
              @sort="sort"
              :data="list"
              :sortBy="list"
            >
                <tr v-for="(item, index) in list" :key="index">
                    <td>
                        <app-checkbox/>
                    </td>
                    <td v-html="item.time"></td>
                    <td v-html="item.code"></td>
                    <td v-html="item.customer"></td>
                    <td v-html="item.name"></td>
                    <td v-html="item.price"></td>
                </tr>
            </app-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningManagerSide,
    IconArrowLeft
  },

  data() {
    return {
      heads: [
        {
          name: "",
          text: "",
          selectAll: true
        },
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
          sort: true
        },
        {
          name: "price",
          text: "Giá trị",
          sort: true
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
          name: "Mua khóa học Đại số 11",
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
          name: "Mua khóa học Đại số 22",
          price: "7290000",
          customer: "Nguyễn Văn A",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 44",
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
          name: "Mua khóa học Đại số 25",
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
    ...mapState("auth", ["loggedUser"]),
  },

  methods: {
    sort(e){
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
</style>