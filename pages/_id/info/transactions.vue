<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide active="4"/>
      </div>
      <div class="col-md-9">
        <!--<div class="elearning-history__main">-->
        <div class="">
          <!--<div class="elearning-history__toolbar">-->
            <!--<div>-->
              <!--<app-button rounded size="sm" class="mr-4">-->
                <!--<IconFilter />Lọc kết quả-->
              <!--</app-button>-->
              <!--<app-select :options="opts" v-model="opt" size="sm" />-->
            <!--</div>-->
            <!--<div class="dates d-flex ml-auto">-->
              <!--<app-date-picker v-model="time1" label="From" square size="sm" class="ml-auto" />-->
              <!--<app-date-picker v-model="time2" label="To" square size="sm" />-->
              <!--<app-button size="sm" square normal class="ml-1">Tìm</app-button>-->
            <!--</div>-->
          <!--</div>-->
          <!--<app-table-->
            <!--:heads="heads"-->
            <!--:pagination="pagination"-->
            <!--@pagechange="onPageChange"-->
            <!--:data="list"-->
          <!--&gt;-->
            <!--<tr v-for="(item , index) in list" :key="index">-->
              <!--<td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>-->
            <!--</tr>-->
          <!--</app-table>-->
          <block-section
            title="Lịch sử giao dịch"
          >
            <template v-slot:content>
              <transaction-history />
            </template>
          </block-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide"
import TransactionHistory from "~/components/page/account/Info/TransactionHistory"
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    IconFilter,
    SchoolAccountSide,
    TransactionHistory
  },

  data() {
    return {
  
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  methods: {
    onPageChange(e) {
      const that = this
      that.pagination = { ...that.pagination, ...e }
      console.log(that.pagination);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
</style>