<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningSide active="3" :teacher="teacher" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <h3 class="color-primary mb-3">Lịch sử giao dịch</h3>
          <hr>
          <div class="dates d-flex mb-4 mt-4">
            <app-date-picker v-model="time1" label="From" square size="sm" class="ml-auto" />
            <app-date-picker v-model="time2" label="To" square size="sm" />
            <app-button size="sm" square normal class="ml-1">Tìm</app-button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Mã đơn hàng</th>
                <th>Nội dung</th>
                <th>Giá trị</th>
                <th v-if="isTeacher">Loại GD</th>
                <th>Phương thức thanh toán</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td>{{ item.time }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }} đ</td>
                <td v-if="isTeacher && item.type === 1">Mua</td>
                <td v-if="isTeacher && item.type === 2">Bán</td>
                <td v-if="item.pay == 1">Chuyển khoản</td>
                <td v-else>Thanh toán online</td>
              </tr>
            </tbody>
          </table>
          <app-pagination
            :type="2"
            :pagination="pagination"
            @pagechange="onPageChange"
            class="mt-4 mb-3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningSliderTab from "~/components/page/elearning/ElearningSliderTab";
import ElearningSide from "~/components/page/elearning/ElearningSide";
import IconExclamation from "~/assets/svg/icons/exclamation.svg?inline";
import IconUser3 from "~/assets/svg/icons/user3.svg?inline";
import IconHistory from "~/assets/svg/icons/history.svg?inline";
import IconBell from "~/assets/svg/icons/bell.svg?inline";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search2.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningSliderTab,
    ElearningSide,
    IconHistory,
    IconBell,
    IconUser3,
    IconExclamation,
    IconPhoto,
    IconSearch,
    IconFilter
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
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: 2,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: 1,
          type: 2,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: 1,
          type: 1,
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
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