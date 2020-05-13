<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide :active="3"/>
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main py-0" style="background: transparent;">
          <block-section
            title="Doanh thu"
          >
            <template v-slot:content>
              <sub-block-section class="mb-0">
                <template v-slot:title>
                  <div class="row">
                    <div class="col-md-6 d-flex align-items-center">
                      <span class="mr-3">Số dư khả dụng:</span>
                      <strong class="color-red h3 mr-4">{{ balance | toThousandFilter('.') }} {{ CURRENCY }}</strong>
                      <app-button
                        size="sm"
                        nuxt
                        :disabled="!accountInfo"
                        :to="accountInfo ? '/' + accountInfo.id + '/info/do_withdrawals' : '/'"
                      >
                        Rút tiền
                      </app-button>
                    </div>
                    <div class="col-md-6">
                      <div class="text-md-right">
                        <app-button
                          nuxt
                          color="transparent"
                          :disabled="!accountInfo"
                          :to="accountInfo ? '/' + accountInfo.id + '/info/withdrawals' : '/'"
                          style="color: #656565; font-weight: normal;"
                          class="px-0"
                        >
                          <slot name="icon">
                            <icon-clock class="icon--btn icon--btn--pre"/>
                          </slot>
                          Xem lịch sử rút tiền
                        </app-button>
                      </div>
                    </div>
                  </div>
                </template>
                
                <template v-slot:content>
                  <div class="elearning-history__statistical">
                    <h5 class="mb-3 font-weight-semi-bold">Thống kê nhanh</h5>
                    <div class="row">
                      <div class="col-6 col-md-3">
                        <div class="item">
                          <p class="title">Hôm nay</p>
                          <span class="value">
                            <strong class="text-primary">{{ today_revenue | toThousandFilter }} {{ CURRENCY }}</strong>
                          </span>
                        </div>
                      </div>
                      <div class="col-6 col-md-3">
                        <div class="item">
                          <p class="title">Tuần này</p>
                          <span class="value">
                            <strong class="color-blue">{{ week_revenue | toThousandFilter }} {{ CURRENCY }}</strong>
                          </span>
                        </div>
                      </div>
                      <div class="col-6 col-md-3">
                        <div class="item">
                          <p class="title">Tháng này</p>
                          <span class="value">
                            <strong class="color-yellow">{{ month_revenue | toThousandFilter }} {{ CURRENCY }}</strong>
                          </span>
                        </div>
                      </div>
                      <div class="col-6 col-md-3">
                        <div class="item">
                          <p class="title">Tháng trước</p>
                          <span class="value">
                            <strong>{{ last_month_revenue | toThousandFilter }} {{ CURRENCY }}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </sub-block-section>
            </template>
          </block-section>
          
          <block-section
            title="Chi tiết doanh thu"
          >
            <template v-slot:content>
              <sub-block-section
              >
                <template v-slot:title>
                  <div class="row">
                    <div class="col-md-9 mb-3">
                      <filter-form>
                        <div class="mb-2">
                        <span class="filter-form__title">
                          Chọn khoảng thời gian
                        </span>
                        </div>
                        
                        <div class="d-flex filter-form__input-wrapper">
                          <div
                            class="filter-form__item"
                            style="min-width: 25rem;"
                          >
                            <app-date-picker
                              class="w-100"
                              popupClass="datepicker-range-v2"
                              v-model="dateDefault"
                              square
                              range
                              size="sm"
                              placeholder="DD/MM/YYYY - DD/MM/YYYY"
                              :shortcuts="DATE_SHORTCUT"
                              @input="changeDate"
                              valueFormat="YYYY-MM-DD"
                            >
                              <!--<template v-slot:icon-calendar>-->
                              <!--<IconCalendar />-->
                              <!--</template>-->
                            </app-date-picker>
                          </div>
                        </div>
                      </filter-form>
                    </div>
                    <div class="col-md-3 text-md-right">
                      <p class="font-weight-semi-bold mb-2">Tổng tiền</p>
                      <p class="font-weight-bold h3">{{ revenue | toThousandFilter('.') }} {{ CURRENCY }}</p>
                    </div>
                  </div>
                </template>
                
                <template v-slot:content>
                  <app-table :heads="heads" :pagination="pagination" @pagechange="onPageChange" :data="list" style="margin-left: -1.5rem; margin-right: -1.5rem;">
                    <!--<tr v-for="(item , index) in list" :key="index">-->
                      <!--<td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>-->
                    <!--</tr>-->
                    <template v-slot:cell(cost)="{row}">
                      <td>{{ get(row, 'cost', '') | toThousandFilter('.') }} {{ CURRENCY }}</td>
                    </template>
                    <template v-slot:cell(fee)="{row}">
                      <td class="text-primary">{{ formatFee(get(row, 'fee', ''))}}%</td>
                    </template>
                    <template v-slot:cell(total)="{row}">
                      <td>{{ formatFee(get(row, 'total', '')) | toThousandFilter('.') }} {{ CURRENCY }}</td>
                    </template>
                    <template v-slot:cell(timestamp)="{row}">
                      <td> {{ get(row, 'timestamp', '-') | moment("DD-MM-YYYY") }}</td>
                    </template>
                    <template v-slot:cell(desc)="{row}">
                      <td style="width:30%"> {{ get(row, 'desc', '-') }}</td>
                    </template>
                  </app-table>
                </template>
              </sub-block-section>
            </template>
          </block-section>
          
          <!--<div class="elearning-history__title">-->
          <!--<h5 class="color-primary mb-3">Doanh thu</h5>-->
          <!--<div class="d-flex-center">-->
          <!--<p>-->
          <!--<span>Số dư:</span>-->
          <!--<strong class="color-red h5">{{this.balance}}</strong>-->
          <!--</p>-->
          <!--<app-button color="secondary" size="sm" class="ml-4" square>Rút tiền</app-button>-->
          <!--<n-link class="ml-auto" :to="'/elearning/revenue/withdrawal'">Xem lịch sử rút tiền</n-link>-->
          <!--</div>-->
          <!--<hr class="mt-3" />-->
          <!--</div>-->
          
          <!--<div class="elearning-history__statistical">-->
          <!--<h5 class="mt-15 mb-3">Thống kê doanh thu</h5>-->
          <!--<div class="row">-->
          <!--<div class="col-md-3">-->
          <!--<div class="item">-->
          <!--<p>Hôm nay</p>-->
          <!--<strong>{{this.today_revenue}} đ</strong>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="col-md-3">-->
          <!--<div class="item">-->
          <!--<p>Tuần này</p>-->
          <!--<strong>{{this.week_revenue}} đ</strong>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="col-md-3">-->
          <!--<div class="item">-->
          <!--<p>Tháng này</p>-->
          <!--<strong>{{this.month_revenue}} đ</strong>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="col-md-3">-->
          <!--<div class="item">-->
          <!--<p>Tháng trước</p>-->
          <!--<strong>{{this.last_month_revenue}}</strong>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<hr class="mt-4" />-->
          <!--</div>-->
          
          <!--<h3>Chi tiết doanh thu</h3>-->
          <!--<div class="elearning-history__table">-->
          <!--<div class="d-flex mb-3 pl-4 pr-4">-->
          <!--<app-date-picker label="from" -->
          <!--@input="changeDateFrom" -->
          <!--v-model="params.from"-->
          <!--valueFormat="YYYY-MM-DD"-->
          <!--/>-->
          <!--<app-date-picker label="to"-->
          <!--@input="changeDateTo"-->
          <!--v-model="params.to"-->
          <!--valueFormat="YYYY-MM-DD"-->
          <!--/>-->
          <!--<div class="ml-auto">-->
          <!--<p class="text-right">Tổng tiền</p>-->
          <!--<h3>{{this.revenue}}</h3>-->
          <!--</div>-->
          <!--</div>-->
          <!--<app-table :heads="heads" :pagination="pagination" @pagechange="onPageChange" :data="list">-->
          <!--<tr v-for="(item , index) in list" :key="index">-->
          <!--<td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>-->
          <!--</tr>-->
          <!--<template v-slot:cell(fee)="{row}">-->
          <!--<td>{{ formatFee(get(row, 'fee', ''))}}%</td>-->
          <!--</template>-->
          <!--<template v-slot:cell(total)="{row}">-->
          <!--<td>{{ formatFee(get(row, 'total', ''))}} đ</td>-->
          <!--</template>-->
          <!--</app-table>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";
  import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
  
  import {mapState} from "vuex";
  import * as actionTypes from "~/utils/action-types";
  import {get} from "lodash";
  import numeral from "numeral";
  import {number} from 'yup';
  import {CURRENCY} from "~/utils/config";
  import IconClock from "~/assets/svg/design-icons/clock.svg?inline";
  import {getToken} from "~/utils/auth";
  import {DATE_SHORTCUT} from "~/utils/config";
  
  export default {
    name: "E-learning",
    layout: 'account-info',
    
    components: {
      IconArrowLeft,
      SchoolAccountSide,
      IconClock
    },
    
    data() {
      return {
        CURRENCY: CURRENCY,
        DATE_SHORTCUT: DATE_SHORTCUT,
        balance: '',
        today_revenue: '',
        week_revenue: '',
        month_revenue: '',
        last_month_revenue: '',
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
            name: "desc",
            text: "Nội dung"
          },
          {
            name: "cost",
            text: "Giá trị",
            sort: true
          },
          {
            name: "fee",
            text: "Phí GD",
          },
          {
            name: "total",
            text: "Tổng"
          }
        ],
        pagination: {},
        list: [],
        params: {
          from: "",
          to: "",
          size: "",
          page: ""
        },
        revenue: "",
        dateDefault: ''
      };
    },
    created() {
      this.fetchRevenue();
      this.fetchEarning();
    },
    watch: {
      revenueList: {
        handler: function () {
          this.balance = get(this, "revenueList.data.balance", '');
          this.today_revenue = get(this, "revenueList.data.today_revenue", '');
          this.week_revenue = get(this, "revenueList.data.week_revenue", '');
          this.month_revenue = get(this, "revenueList.data.month_revenue", '');
          this.last_month_revenue = get(this, "revenueList.data.last_month_revenue", '');
        }
      },
      earningList: {
        handler: function () {
          this.pagination = get(this, "earningList.data.earnings.page", {});
          this.list = get(this, "earningList.data.earnings.content", []);
          this.revenue = get(this, "earningList.data.revenue", "");
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
      }),
      accountInfo() {
        return getToken()
      }
    },
    
    methods: {
      fetchRevenue() {
        const res = this.$store.dispatch(`account/${actionTypes.ACCOUNT_REVENUE.LIST}`)
      },
      fetchEarning() {
        const payload = {
          params: {
            to: this.params.to,
            from: this.params.from,
            size: this.params.size,
            page: this.params.page
          }
        }
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_EARNING.LIST}`, payload)
      },
      onPageChange(e) {
        this.params.size = e.size;
        this.params.page = e.number + 1;
        this.fetchEarning();
      },
      formatFee(fee) {
        return numeral(fee).format('0')
      },
      changeDate(date){
        this.params.from = date[0];
        this.params.to = date[1];
        this.fetchEarning();
      },
      get,
      numeral
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>