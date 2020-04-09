<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="1" />
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
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import IconCalendar from "~/assets/svg/icons/calendar.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconDollarAlt from "~/assets/svg/design-icons/dollar-alt.svg?inline";
import IconChartLine from "~/assets/svg/design-icons/chart-line.svg?inline";
import IconUserUser from "~/assets/svg/icons/user-user.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

export default {
  layout: "manage",
  name: "E-learning",

  components: {
    ElearningManagerSide,
    IconUserUser,
    IconBook,
    IconCalendar,
    IconDollarAlt,
    IconChartLine,
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning/study/study/${actionTypes.ELEARNING_STURY.LIST}`
    );
  },

  data() {
    return {
      isAuthenticated: true,
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning/study/study", {
      elearning: "elearningStudy"
    })
  },

  methods: {
    get
  },

  created () {
    console.log(this.elearning);
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";
</style>