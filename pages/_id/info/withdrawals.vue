<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="2"/>
      </div>
      <div class="col-md-9">
        <block-section
          title="Lịch sử giao dịch"
          has-icon
        >
          <template v-slot:content>
            <div class="elearning-history__main">
              <h5 class="mb-3 elearning-history__title">
                Chọn khoảng thời gian
              </h5>
              <div class="elearning-history__toolbar">
                <div class="date_withdrawals">
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
                <div class="d-flex ml-3">
                  <filter-button @click="filterSelect= !filterSelect">
                    Lọc kết quả
                  </filter-button>
                  <app-vue-select 
                    :options="opts" 
                    v-model="opt" 
                    size="sm" 
                    :placeholder="'Theo trạng thái'" 
                    label="text"
                    searchable
                    clearable
                    class="app-vue-select ml-3"
                    @input="handlerChangeStatus"
                    v-if="filterSelect"
                      />
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
                <template v-slot:cell(status)="{row}">
                  <td v-if="row.status=='SUCCESS'">Thành công</td>
                  <td v-else-if="row.status=='FAIL'">Thất bại</td>
                  <td v-else-if="row.status=='PENDING'">Chờ xử lí</td>
                </template>
              </app-table>
            </div>
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
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>