<template>
  <div>
    <div class="wrapFilterBar__ElearningManagerRC">
      <div>
        <button class="btnFitlerSummit__ElearningManagerFilterTable" @click="submit">
          <IconFilter/>
          <span>Lọc kết quả</span>
        </button>
      </div>
      <div>
        <app-checkbox>Có bình luận</app-checkbox>
      </div>
      <div>
        <app-vue-select
          class="selectComment__ElearningManagerRC"
          :options="status"
          label="text"
          placeholder="Theo bình chọn"
          searchable
          clearable
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
        >
        </app-vue-select>
      </div>
      <div>
        <app-vue-select
          class="selectClass__ElearningManagerRC"
          :options="status"
          label="text"
          placeholder="Lớp"
          searchable
          clearable
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
        >
        </app-vue-select>
      </div>
    </div>
    <div class="wrapTable__ElearningManagerRC">
      <app-table
        :heads="heads"
        :pagination="pagination"
        @pagechange="onPageChange"
        :data="list"
        class="table__ElearningManagerRC"
      >
        <template v-slot:cell(action)="{row}">
          <td>
            <app-stars :stars="row.vote" :size="16" class="mt-2 mb-2"/>
          </td>
        </template>

        <template v-slot:cell(creator)="{row}">
          <td>
            {{ get(row, 'creator.name', '') }}
          </td>
        </template>

        <template v-slot:cell(created_at)="{row}">
          <td>
            {{ get(row, 'timestamp', '') | moment("hh:mm A DD/MM/YYYY") }}
          </td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
  import IconFilter from "~/assets/svg/icons/filter.svg?inline"
  import IconArrow from "~/assets/svg/icons/arrow.svg?inline"
  import {mapState} from "vuex"
  import { useEffect, getParamQuery } from "~/utils/common"
  import * as actionTypes from "~/utils/action-types"
  import { get } from "lodash"

  const STORE_NAMESPACE = 'elearning/public/public-vote'

  export default {
    components: {
      IconFilter,
      IconArrow,
    },
    data() {
      return {
        heads: [
          {
            name: "action",
            text: "Đánh giá",
            sort: false,
          },
          {
            name: "creator",
            text: "Người đánh giá",
            sort: false,
          },
          {
            name: "class",
            text: "Lớp",
            sort: false,
          },
          {
            name: "created_at",
            text: "Thời gian",
            sort: true,
          }

        ],
        status: [
          {
            value: 1,
            text: '10B'
          },
          {
            value: 2,
            text: '10A'
          },
        ],
        pagination: {
          total: 11,
          size: 10,
          page: 1,
          totalElements: 0,
          first: 1,
          last: 1,
          number: 0
        },
        params: {
          page: 1,
          size: 10,
          elearning_id: "39fe1dd5-2df2-465f-8cf7-59d4ead68189"
        },
        list: [],
      };
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      ...mapState(STORE_NAMESPACE, {
        detailInfo: 'votes'
      }),
    },
    methods: {
      onPageChange(e) {
        this.params.size !== e.size ? this.params.page = 1 : this.params.page = e.number
        this.params.size = e.size
      },
      submit() {
        this.refreshData()
      },
      handleChangedInput(val) {
        this.refreshData()
      },
      handleFocusSearchInput() {
        console.log('[Component] Elearning exam: focus searching ')
      },
      handleBlurSearchInput() {
        console.log('[Component] Elearning exam: blur searching ')
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
  @import "~/assets/scss/components/elearning/manager/_elearning-rate-comment.scss"
</style>