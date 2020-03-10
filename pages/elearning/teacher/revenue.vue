<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningSide active="3" :teacher="teacher" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <h5 class="color-primary mb-3 elearning-history__title">
            Lịch sử giao dịch
            <hr class="mt-3" />
          </h5>
          <div class="elearning-history__toolbar">
            <div>
              <app-button rounded size="sm" class="mr-4">
                <IconFilter />Lọc kết quả
              </app-button>
              <app-select :options="opts" v-model="opt" size="sm" />
            </div>
            <div class="dates d-flex ml-auto">
              <app-date-picker v-model="time1" label="From" square size="sm" class="ml-auto" />
              <app-date-picker v-model="time2" label="To" square size="sm" />
              <app-button size="sm" square normal class="ml-1">Tìm</app-button>
            </div>
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
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningSide,
    IconFilter
  },

  data() {
    return {
      heads: [
        {
          name: "time",
          text: "Thời gian",
          sort: true,
          time: true
        },
        {
          name: "price",
          text: "Giá trị",
          sort: true
        },
        {
          name: "name",
          text: "Nội dung",
          sort: true
        },
        {
          name: "status",
          text: "Trạng thái",
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
          time: "16:50:30 20-11-2019",
          status: "<span class='status'>Thành công</span>"
        },
       {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "3290000",
          code: "S88HKDKD",
          time: "16:50:30 22-11-2019",
          status: "<span class='status-2'>Chờ duyệt</span>"
        },
       {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          time: "16:50:30 20-11-2018",
          status: "<span class='status'>Thành công</span>"
        },
       {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "3290000",
          code: "S88HKDKD",
          time: "16:50:30 22-11-2017",
          status: "<span class='status-2'>Chờ duyệt</span>"
        },
       {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          time: "16:50:30 20-11-2019",
          status: "<span class='status'>Thành công</span>"
        },
       {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "3290000",
          code: "S88HKDKD",
          time: "16:50:30 22-11-2019",
          status: "<span class='status-2'>Chờ duyệt</span>"
        },
       {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          time: "16:50:30 20-11-2018",
          status: "<span class='status'>Thành công</span>"
        },
       {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "3290000",
          code: "S88HKDKD",
          time: "16:50:30 20-11-2017",
          status: "<span class='status-2'>Chờ duyệt</span>"
        },
      ]
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