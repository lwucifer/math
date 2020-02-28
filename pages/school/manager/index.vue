<template>
  <div class="container school-manager">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="1" />
      </div>
      <div class="col-md-9">
        <div class="box">
          <h5 class="color-primary">Tổng quan</h5>
          <hr class="mt-3 mb-4" />
          <div>
            <div class="box-primary">
              <app-avatar :src="school.avatar" :size="150" />
              <div class="text">
                <h3>{{school.name}}</h3>
                <p class="mt-3 mb-4 color-666">{{school.desc}}</p>
                <p class="color-999">
                  Mã trường:
                  <span class="h6">{{school.code}}</span>
                </p>
              </div>
            </div>
            <div class="row text-center mt-4">
              <div class="col-3">
                <p class="h2 color-primary">59</p>
                <p>Tổng số giáo viên</p>
              </div>
              <div class="col-3">
                <p class="h2 color-primary">1875</p>
                <p>Tổng số học sinh toàn trường</p>
              </div>
              <div class="col-3">
                <p class="h2 color-primary">41</p>
                <p>Số bài giảng đã duyệt</p>
              </div>
              <div class="col-3">
                <p class="h2 color-primary">33</p>
                <p>Số khoá học đã duyệt</p>
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

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";
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
      school: SCHOOL
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/manager/_school-manager.scss";
</style>