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
                  <strong>{{stateTeaching.total_lectures}}</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <div class="top">
                    <IconCalendar class="fill-primary mr-3" />Số khóa học
                  </div>
                  <strong>{{stateTeaching.total_courses}}</strong>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item">
                  <div class="top">
                    <IconChartLine class="fill-primary mr-3" />Điểm bình chọn giáo viên
                  </div>
                  <div class="bottom">
                    <strong class="mr-4">{{stateTeaching.voting_rate}}/5</strong>
                    <app-stars :stars="stateTeaching.voting_rate" :size="16" />
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
                <strong>{{stateTeaching.participants}}</strong>
              </div>
              <div class="ml-auto">
                <app-vue-select
                  style="width: 17rem"
                  class="app-vue-select"
                  v-model="time"
                  :options="times"
                  label="text"
                  searchable
                  clearable
                  @input="handleChangedTime"
                ></app-vue-select>
              </div>
            </div>
            <hr class="mt-4 mb-4" />
            <div class="d-flex">
              <div class="item">
                <div class="top">
                  <IconUserUser class="fill-primary mr-3" />Doanh thu
                </div>
                <strong class="mb-3">{{stateTeaching.revenue}} VNĐ</strong>
                <n-link :to="'/elearning/manager/revenue'" class="color-red">Xem chi tiết doanh thu</n-link>
              </div>
              <div class="ml-auto">
                <app-vue-select
                  style="width: 17rem"
                  class="app-vue-select"
                  v-model="time"
                  :options="times"
                  label="text"
                  searchable
                  clearable
                  @input="handleChangedTime"
                ></app-vue-select>
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

const STORE_NAMESPACE = "elearning/teaching/summary";

export default {
  layout: "manage",
  name: "E-learning",

  components: {
    ElearningManagerSide,
    IconUserUser,
    IconBook,
    IconCalendar,
    IconDollarAlt,
    IconChartLine
  },

  data() {
    return {
      time: {
        value: null,
        text: "Toàn thời gian"
      },
      times: [
        {
          value: null,
          text: "Toàn thời gian"
        },
        {
          value: "year",
          text: "Năm"
        },
        {
          value: "month",
          text: "Tháng"
        },
        {
          value: "week",
          text: "Tuần"
        },
        {
          value: "day",
          text: "Trong ngày"
        }
      ],
      teacherInfo: {}
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateTeaching: "teachingInfo"
    })
  },

  methods: {
    handleChangedTime() {
      this.getSummary();
    },

    async getSummary() {
      const today = new Date();
      let from_date;
      let fromdate;
      switch (this.time.value) {
        case 'day':
          fromdate = new Date(today.getTime() - 24*60*60*1000);
          from_date = fromdate.getDate()+'/0'+(fromdate.getMonth()+1)+'/'+fromdate.getFullYear();
          break;
        case 'week':
          fromdate = new Date(today.getTime() - 7*24*60*60*1000);
          from_date = fromdate.getDate()+'/0'+(fromdate.getMonth()+1)+'/'+fromdate.getFullYear();
          break;
        case 'month':
          from_date = today.getDate()+'/0'+(today.getMonth())+'/'+today.getFullYear();
          break;
        case 'year':
          from_date = (today.getDate()-1)+'/0'+(today.getMonth()+1)+'/'+today.getFullYear();
          break;
      }
      const to_date = today.getDate()+'/0'+(today.getMonth()+1)+'/'+today.getFullYear();
      let params = {};
      if (from_date) {
        params = {
          from_date: from_date,
          to_date: to_date,
        };
      }
      console.log(params);
      await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_SUMMARY.INFO}`,
        params
      );
    },

    get
  },

  created() {
    this.getSummary();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";
</style>