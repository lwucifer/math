<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="8"/>
      </div>
      <div class="col-md-9 wrapContent__ElearningManagerRC">
        <div class="titleRateComment__ElearningManagerRC">
          <span>Đánh giá và bình luận</span>
        </div>
        <div>
          <app-divider class="divider__ElearningManagerRC"></app-divider>
        </div>
        <div>
          <ElearningManagerRateComment
            :list.sync="list"
            :pagination="pagination"
            @changedFilter="updateFilter"
            @changedPagination="updatePagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
  import ElearningManagerRateComment from "~/components/page/elearning/manager/ratecomment/ElearningManagerRateComment";

  import {mapState} from "vuex"
  import { useEffect, getParamQuery } from "~/utils/common"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"

  const STORE_NAMESPACE = 'elearning/public/public-vote'

  export default {
    components: {
      ElearningManagerSide,
      ElearningManagerRateComment
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
          elearning_id: "39fe1dd5-2df2-465f-8cf7-59d4ead68189"
        },
        list: []
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      ...mapState(STORE_NAMESPACE, {
        detailInfo: 'votes'
      }),
    },
    methods: {
      updateFilter(val) {
        this.params = { ...this.params, ...val }
        this.refreshData()
      },

      updatePagination(val) {
        this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number + 1
        this.params.size = val.size
      },
      async getList() {
        // this.params.elearning_id = getParamQuery('elearning_id')
        let params = { ...this.params }

        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_PUBLIC_VOTE.LIST}`, { params }
        )
        this.list = this.get(this.detailInfo, 'content', [])
        this.pagination = { ...this.get(this.detailInfo, 'page', {}) }
      },
      refreshData() {
        this.params.page = 1
        this.getList()
      },
      get
    },
    created() {
      useEffect(this, this.getList.bind(this), [
        "params.page",
        "params.size",
        "params.elearning_id"
      ])
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-rate-comment-index.scss";
</style>