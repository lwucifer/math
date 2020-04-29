<template>
  <sub-block-section>
    <template v-slot:title>
      <filter-form />
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
// Import faked data

export default {
  components: {
    TransactionList,
    SchoolAccountSide,
    UploadAvatar,
    FilterForm,
    TransactionList
  },
  data() {
    return {
      pagination: {
        totalElements: 0,
        last: false,
        totalPages: 1,
        size: 10,
        number: 0,
        first: true,
        numberOfElements: 0
      },
      params: {
        page: 1,
        size: 10,
        // elearning_id: "39fe1dd5-2df2-465f-8cf7-59d4ead68189"
        elearning_id: null
      },
      list: [
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
        {
          id: 1,
          name: "Mua khóa học Đại số 10",
          price: "2290000",
          code: "D88HKDKD",
          type: "Mua",
          pay: "Thanh toán Online",
          time: "16:50:30 20-11-2019"
        },
        {
          id: 1,
          name: "Bán khóa học Đại số 10",
          price: "2990000",
          code: "D88HKDKD",
          type: "Bán",
          pay: "Chuyển khoản",
          time: "06:50:30 10-11-2019"
        },
      ],
      loading: false
    }
  },
  watch:{
  
  },
  methods: {
    updatePagination(val) {
      // this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number + 1
      // this.params.size = val.size
      // this.getList()
    },
  },
  computed: {
  
  },
  created() {
  }
};
</script>

<style lang="scss">
</style>
