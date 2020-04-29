<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="'3'"/>
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <div class="elearning-history__title">
            <h5 class="color-primary mb-3">Doanh thu</h5>
            <div class="d-flex-center">
              <p>
                <span>Số dư:</span>
                <strong class="color-red h5">{{this.balance}}</strong>
              </p>
              <app-button color="secondary" size="sm" class="ml-4" square>Rút tiền</app-button>
              <n-link class="ml-auto" :to="'/elearning/revenue/withdrawal'">Xem lịch sử rút tiền</n-link>
            </div>
            <hr class="mt-3" />
          </div>

          <div class="elearning-history__statistical">
            <h5 class="mt-15 mb-3">Thống kê doanh thu</h5>
            <div class="row">
              <div class="col-md-3">
                <div class="item">
                  <p>Hôm nay</p>
                  <strong>{{this.today_revenue}} đ</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <p>Tuần này</p>
                  <strong>{{this.week_revenue}} đ</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <p>Tháng này</p>
                  <strong>{{this.month_revenue}} đ</strong>
                </div>
              </div>
              <div class="col-md-3">
                <div class="item">
                  <p>Tháng trước</p>
                  <strong>{{this.last_month_revenue}}</strong>
                </div>
              </div>
            </div>
            <hr class="mt-4" />
          </div>

          <h3>Chi tiết doanh thu</h3>
          <div class="elearning-history__table">
            <div class="d-flex mb-3 pl-4 pr-4">
              <app-date-picker label="from" 
                              @input="changeDateFrom" 
                              v-model="params.from"
                              valueFormat="YYYY-MM-DD"
              />
              <app-date-picker label="to"
                               @input="changeDateTo"
                               v-model="params.to"
                               valueFormat="YYYY-MM-DD"
              />
              <div class="ml-auto">
                <p class="text-right">Tổng tiền</p>
                <h3>{{this.revenue}}</h3>
              </div>
            </div>
            <app-table :heads="heads" :pagination="pagination" @pagechange="onPageChange" :data="list">
              <tr v-for="(item , index) in list" :key="index">
                <td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>
              </tr>
            </app-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
export default {
  name: "E-learning",

  components: {
    IconArrowLeft,
    SchoolAccountSide,
  },

  data() {
    return {
      balance:'',
      today_revenue:'',
      week_revenue:'',
      month_revenue:'',
      last_month_revenue:'',
      heads: [
          {
            name: "code",
            text: "Mã đơn hàng",
          },
          {
            name: "timestamp",
            text: "Thời gian",
          },
          {
            name: "customer",
            text: "Khách hàng",
          },
          {
            name:"desc",
            text:"Nội dung"
          },
          {
            name: "cost",
            text: "Giá trị",
            sort: true
          },
          {
            name: "discount",
            text: "Phí GD",
          },
          {
            name:"cost",
            text:"Tổng"
          }
        ],
        pagination:{},
        list:[],
        params:{
          from:"",
          to:"",
          size:"",
          page:""
        },
        revenue:""
    };
  },
  created(){
    this.fetchRevenue();
    this.fetchEarning();
  },
  watch:{
    revenueList: {
      handler: function(){
        this.balance = get(this,"revenueList.data.balance",'');
        this.today_revenue = get(this,"revenueList.data.today_revenue",'');
        this.week_revenue = get(this,"revenueList.data.week_revenue",'');
        this.month_revenue = get(this,"revenueList.data.month_revenue",'');
        this.last_month_revenue = get(this,"revenueList.data.last_month_revenue",'');
      }
    },
    earningList:{
      handler: function(){
        this.pagination = get(this,"earningList.data.earnings.page",{});
        this.list = get(this,"earningList.data.earnings.content",[]);
        this.revenue = get(this,"earningList.data.revenue","");
      }
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("account", {
      revenueList: "revenueList",
    }),
    ...mapState("account", {
      earningList: "earningList",
    })
  },

  methods: {
    fetchRevenue(){
      const res = this.$store.dispatch(`account/${actionTypes.ACCOUNT_REVENUE.LIST}`)
    },
    fetchEarning(){
      const payload = {
        params :{
          to: this.params.to,
          from: this.params.from,
          size: this.params.size,
          page: this.params.page
        }
      }
      this.$store.dispatch(`account/${actionTypes.ACCOUNT_EARNING.LIST}`,payload)
    },
    changeDateFrom(text){
      this.params.from = text;
      this.fetchEarning()
    },
    changeDateTo(text){
      this.params.to = text;
      this.fetchEarning()
    },
    onPageChange(e) {
      this.params.size = e.size;
      this.params.page = e.number + 1;
      this.fetchEarning();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>