<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="2"/>
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
              <app-vue-select :options="opts" 
                              v-model="opt" 
                              size="sm" 
                              :placeholder="'Theo trạng thái'" 
                              label="text"
                              searchable
                              clearable
                              @input="handlerChangeStatus"
                  />
            </div>
            <div class="dates d-flex ml-auto">
              <app-date-picker  label="From"
                                square size="sm" 
                                class="ml-auto"
                                @input="changeDateFrom"
                                valueFormat="YYYY-MM-DD"
               />
              <app-date-picker  label="To" 
                                square 
                                size="sm"
                                @input="changeDateTo" 
                                valueFormat="YYYY-MM-DD"
              />
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
            <template v-slot:cell(status)="{row}">
              <td v-if="row.status=='SUCCESS'">Thành công</td>
              <td v-else-if="row.status=='FAIL'">Thất bại</td>
              <td v-else-if="row.status=='PENDING'">Chờ xử lí</td>
            </template>
          </app-table>
        </div>
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
      list:[]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("account", {
      withdrawalsList: "withdrawalsList",
    })
  },
  created(){
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
    changeDateFrom(date){
      this.params.from = date;
      this.fetchWithdrawals();
    },
    changeDateTo(date){
      this.params.to = date;
      this.fetchWithdrawals();
    },
    handlerChangeStatus(select){
      this.params.status = get(select,"value","");
      console.log(get(select,"value",""),"lol")
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