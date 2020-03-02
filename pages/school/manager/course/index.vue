<template>
  <div class="container school-manager">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="1" />
      </div>
      <div class="col-md-9">
        <div class="bg-white ">
          <h5 class="color-primary pt-3 mb-3 pl-4 pr-4">Danh sách bài giảng của giáo viên</h5>

          <div class="school-manager__nav pl-4 pr-4">
            <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Đang chờ duyệt (29)</a>
            <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Đã duyệt (11)</a>
            <a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Bị từ chối (5)</a>
            <hr class />
          </div>

          <div class="p-4">
            <app-button :size="'sm'" normal rounded>
              <IconFilter />
              <span>Lọc kết quả</span>
            </app-button>
          </div>

          <keep-alive>
            <component v-bind:is="currentTabComponent"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import SchoolManagerSide from "~/components/page/school/manager/SchoolManagerSide";
import IconCalendar from "~/assets/svg/icons/calendar.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconDollarAlt from "~/assets/svg/design-icons/dollar-alt.svg?inline";
import IconChartLine from "~/assets/svg/design-icons/chart-line.svg?inline";
import IconUserUser from "~/assets/svg/icons/user-user.svg?inline";

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

const PublishedTab = () => import("./tabs/published");
const PendingTab = () => import("./tabs/pending");
const DeniedTab = () => import("./tabs/denied");

export default {
  name: "E-learning",

  components: {
    IconFilter,
    SchoolManagerSide,
    IconUserUser,
    IconBook,
    IconCalendar,
    IconDollarAlt,
    IconChartLine,
    IconChartLine,
    PublishedTab,
    PendingTab,
    DeniedTab
  },

  data() {
    return {
      tab: 1,
      isAuthenticated: true,
      school: SCHOOL
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    currentTabComponent: function() {
      // List of tabs
      const MATCHED_TABS = ["PendingTab", "PublishedTab", "DeniedTab"];
      return this.tab > 0 ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0];
    }
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/manager/_school-manager.scss";
</style>