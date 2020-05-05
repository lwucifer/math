<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide :active="2"/>
      </div>
      <div class="col-md-9">
        <block-section
          title="Lịch sử rút tiền"
          has-icon
        >
          <template v-slot:content>
            <sub-block-section
            >
              <template v-slot:title>
                <filter-form>
                  <div class="mb-2">
                    <span class="filter-form__title">
                      Chọn khoảng thời gian
                    </span>
                  </div>
    
                  <div class="d-flex filter-form__input-wrapper">
                    <div
                      class="filter-form__item"
                      style="min-width: 21rem;"
                    >
                      <app-date-picker
                        class="w-100"
                        v-model="dateDefault"
                        square
                        range
                        size="sm"
                        placeholder="DD/MM/YYYY - DD/MM/YYYY"
                        :shortcuts="DATE_SHORTCUT"
                        @input="handlerChangeDate"
                        valueFormat="YYYY-MM-DD"
                      >
                      </app-date-picker>
                    </div>
                    <div class="filter-form__item d-flex">
                      <filter-button @click="filterSelect= !filterSelect">
                        Lọc kết quả
                      </filter-button>
                    </div>
                    <div class="filter-form__item" v-if="filterSelect">
                      <app-vue-select
                        :options="opts"
                        v-model="opt"
                        size="sm"
                        :placeholder="'Theo trạng thái'"
                        label="text"
                        searchable
                        clearable
                        class="app-vue-select"
                        @input="handlerChangeStatus"
                      />
                    </div>
                  </div>
                </filter-form>
              </template>
              <template v-slot:content>
                <app-table
                  :heads="heads"
                  :pagination="pagination"
                  @pagechange="onPageChange"
                  :data="list"
                  style="margin-left: -1.5rem; margin-right: -1.5rem;"
                >
                  <template v-slot:cell(status)="{row}">
                    <td>
                      <span class="status-item d-inline-block" :class="statusClass(row.status)" style="min-width: 10.1rem;">
                        {{ row.status | withdrawalStatus2Txt}}
                      </span>
                    </td>
                  </template>
                </app-table>
              </template>
            </sub-block-section>
          </template>
        </block-section>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { DATE_SHORTCUT} from "~/utils/config";
import moment from "moment";
import {
  WITHDRAWAL_STATUSES
} from "~/utils/constants"

export default {
  name: "E-learning",

  components: {
    IconFilter,
    SchoolAccountSide,
  },

  data() {
    return {
      heads: [
        {
          name: "timestamp",
          text: "Thời gian",
          sort: true,
          time: true
        },
        {
          name: "amount",
          text: "Giá trị",
          sort: true
        },
        {
          name: "desc",
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
      pagination: {},
      params:{
        from:"",
        to:"",
        page:"",
        size:"",
        status:""
      },
      opt: "",
      opts: [
        { value: 'SUCCESS', text: 'Thành công' },
        { value: 'PENDING', text: 'Chờ xử lí' },
        { value: 'FAIL', text: 'Thất bại' }

      ],
      list:[],
      DATE_SHORTCUT: DATE_SHORTCUT,
      dateDefault:null,
      filterSelect: false
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("account", {
      withdrawalsList: "withdrawalsList",
    })
  },
  created(){
    this.getDateSelect();
    this.fetchWithdrawals();
  },
  watch:{
    withdrawalsList:{
      handler:function(){
        this.list = get(this,"withdrawalsList.data.content",[]);
        this.pagination = get(this,"withdrawalsList.data.page",{});
      }
    }
  },
  methods: {
    getDateSelect(){
      const firstday = moment().format("YYYY-MM-01");
      const today = moment().format("YYYY-MM-DD");
      this.dateDefault = [firstday,today];
      this.params.from = firstday;
      this.params.to = today;
    },
    fetchWithdrawals(){
      const payload = {
        params :{
          to: this.params.to,
          from: this.params.from,
          size: this.params.size,
          page: this.params.page,
          status: this.params.status
        }
      }
      this.$store.dispatch(`account/${actionTypes.ACCOUNT_WITHDRAWALS.LIST}`,payload)
    },
    handlerChangeStatus(select){
      this.params.status = get(select,"value","");
      this.fetchWithdrawals();
    },
    handlerChangeDate(date){
      this.params.from = date[0];
      this.params.to = date[1];
      this.fetchWithdrawals();
    },
    onPageChange(e) {
      this.params.size = e.size;
      this.params.page = e.number + 1;
      this.fetchWithdrawals();
    },
    statusClass(type) {
      if (type == WITHDRAWAL_STATUSES.SUCCESS) {
        return { 'status-item--success': true }
      } else if (type == WITHDRAWAL_STATUSES.PENDING) {
        return { 'status-item--pending': true }
      } else if (type == WITHDRAWAL_STATUSES.FAILED) {
        return { 'status-item--fail': true }
      } else {
        return {}
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>