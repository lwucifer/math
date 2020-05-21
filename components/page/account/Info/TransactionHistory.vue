<template>
  <sub-block-section
    :title-cls="{'border-0': true }"
  >
    <template v-slot:title>
      <filter-form 
        @changeDate="changeDate"
        @changeStatus="changeStatus"
        @changePayment="changePayment"
        :selectDateDefault="DateDefault"
      />
    </template>
    
    <template v-slot:content>
      <transaction-list
        :pagination="pagination"
        :list.sync="list"
        :loading="loading"
        @changedPagination="updatePagination"
      />
    </template>
  </sub-block-section>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import UploadAvatar from "~/components/page/account/Info/UploadAvatar";
import FilterForm from "~/components/page/account/forms/TransactionFilter"
import TransactionList from "~/components/page/account/tables/TransactionList"
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import { get } from "lodash";
import { getDateBirthDay, getDateFormat } from "~/utils/moment";
import moment from "moment";
// Import faked data

export default {
  components: {
    SchoolAccountSide,
    UploadAvatar,
    FilterForm,
    TransactionList
  },
  data() {
    return {
      pagination: {},
      params: {},
      list: [],
      loading: false,
      DateDefault:[]
    }
  },
  watch:{
    transactionsList:{
      handler : function(){
        this.list = get(this,"transactionsList.data.content",[]);
        this.pagination = get(this,"transactionsList.data.page",{});
      }
    },

    forceGetTransactions(_newVal, _oldVal) {
      console.log("[forceGetTransactions] watch", _newVal);
      if(_newVal != _oldVal){
        this.fetchTransaction();
      }
    }
  },
  methods: {
    updatePagination(val) {
      this.params.size = val.size;
      this.params.page = val.number + 1;
      this.fetchTransaction();
    },
    fetchTransaction(){
      const payload = {
        params :{
          to: this.params.to,
          from: this.params.from,
          size: this.params.size,
          page: this.params.page,
          status: this.params.status,
          method:this.params.method
        }
      }
      this.$store.dispatch(`account/${actionTypes.ACCOUNT_TRANSACTIONS.LIST}`,payload)
    },
    changeDate(date){
      this.params.from = date[0];
      this.params.to = date[1];
      this.fetchTransaction();
    },
    changePayment(e){
      this.params.method = e;
      this.fetchTransaction();
    },
    changeStatus(s){
      this.params.status = s;
      this.fetchTransaction();
    },
    getDateSelect(){
      const firstday = moment().format("YYYY-MM-01");
      const today = moment().format("YYYY-MM-DD");
      this.DateDefault = [firstday,today];
      this.params.from = firstday;
      this.params.to = today;
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("account", [
      "transactionsList",
      "forceGetTransactions",
    ])
  },
  created() {
    this.getDateSelect();
    this.fetchTransaction();
  },

};
</script>

<style lang="scss">
</style>
