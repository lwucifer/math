<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="4" :school="teacher" />
      </div>
      <div class="col-md-9">
        <!--<div class="elearning-history__main">-->
        <div class="">
          <!--<div class="elearning-history__toolbar">-->
            <!--<div>-->
              <!--<app-button rounded size="sm" class="mr-4">-->
                <!--<IconFilter />Lọc kết quả-->
              <!--</app-button>-->
              <!--<app-select :options="opts" v-model="opt" size="sm" />-->
            <!--</div>-->
            <!--<div class="dates d-flex ml-auto">-->
              <!--<app-date-picker v-model="time1" label="From" square size="sm" class="ml-auto" />-->
              <!--<app-date-picker v-model="time2" label="To" square size="sm" />-->
              <!--<app-button size="sm" square normal class="ml-1">Tìm</app-button>-->
            <!--</div>-->
          <!--</div>-->
          <!--<app-table-->
            <!--:heads="heads"-->
            <!--:pagination="pagination"-->
            <!--@pagechange="onPageChange"-->
            <!--:data="list"-->
          <!--&gt;-->
            <!--<tr v-for="(item , index) in list" :key="index">-->
              <!--<td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>-->
            <!--</tr>-->
          <!--</app-table>-->
          <block-section
            title="Lịch sử giao dịch"
          >
            <template v-slot:content>
              <transaction-history />
            </template>
          </block-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide"
import TransactionHistory from "~/components/page/account/Info/TransactionHistory"
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    IconFilter,
    SchoolAccountSide,
    TransactionHistory
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
          name: "name",
          text: "Nội dung",
          sort: true
        },
        {
          name: "price",
          text: "Giá trị",
          sort: true
        },
        {
          name: "type",
          text: "Loại GD",
          sort: true
        },
        {
          name: "pay",
          text: "Phương thức thanh toán",
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
      opt: "",
      opts: [
        { value: "", text: "Tất cả các loại giao dịch" },
        { value: "1", text: "Theo trạng thái" },
        { value: "2", text: "Theo giá trị" }
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
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    onPageChange(e) {
      const that = this
      that.pagination = { ...that.pagination, ...e }
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>