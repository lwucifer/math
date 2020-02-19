<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningSide active="3" :teacher="teacher" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <div class="elearning-history__title">
            <h5 class="color-primary mb-3">Lịch sử giao dịch</h5>
            <hr />
          </div>
          <div class="dates d-flex mb-4 mt-4">
            <app-date-picker v-model="time1" label="From" square size="sm" class="ml-auto" />
            <app-date-picker v-model="time2" label="To" square size="sm" />
            <app-button size="sm" square normal class="ml-1">Tìm</app-button>
          </div>
          <app-table
            :heads="heads"
            :pagination="pagination"
            @pagechange="onPageChange"
            :data="list"
          >
            <tr v-for="(item , index) in list" :key="index">
              <td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>
            </tr>
          </app-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningSide from "~/components/page/elearning/ElearningSide";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningSide
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
          text: "Phương thức thanh toán",
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
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Mua",
          type: "Thanh toán Online",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Bán",
          type: "Chuyển khoản",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Mua",
          type: "Thanh toán Online",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Bán",
          type: "Chuyển khoản",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Mua",
          type: "Thanh toán Online",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Bán",
          type: "Chuyển khoản",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "9290000",
          code: "S88HKDKD",
          pay: "Mua",
          type: "Thanh toán Online",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1590000",
          code: "S88HKDKD",
          pay: "Bán",
          type: "Chuyển khoản",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Mua",
          type: "Thanh toán Online",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Bán",
          type: "Chuyển khoản",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Mua",
          type: "Thanh toán Online",
          time: "16:50:30 19-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "1290000",
          code: "S88HKDKD",
          pay: "Bán",
          type: "Chuyển khoản",
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