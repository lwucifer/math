<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningSide active="3" :teacher="teacher" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <h5 class="color-primary mb-3">
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
          <table class="table">
            <thead>
              <tr>
                <th>
                  Thời gian
                  <hr />
                </th>
                <th>
                  Giá trị
                  <hr />
                </th>
                <th>
                  Nội dung
                  <hr />
                </th>
                <th>
                  Trạng thái
                  <hr />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td>{{ item.time }}</td>
                <td>{{ item.price }} đ</td>
                <td>{{ item.name }}</td>
                <td v-if="item.type === 1"><span class="status">Thành công</span></td>
                <td v-if="item.type === 2"><span class="status-2">Chờ duyệt</span></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <hr class="mb-3"/>
            <app-pagination
              :type="2"
              :pagination="pagination"
              @pagechange="onPageChange"
            />
          </div>
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