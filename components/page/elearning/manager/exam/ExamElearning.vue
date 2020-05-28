<template>
  <!--List elearnings that have exam-->
  <div>
    <!--Filter form-->
    <elearning-manager-filter-form
      @submitFilter="submitFilter"
      @changedType="handleChangedType"
      @changedRate="handleChangedRate"
      @submitSearch="handleSubmitSearch"
    />
    <elearning-manager-filter-table
      :pagination="pagination"
      :list="list"
      :loading="loading"
      @changedPagination="updatePagination"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
import * as actionTypes from "~/utils/action-types"
import { get } from "lodash"
import { useEffect, getParamQuery } from "~/utils/common"
import ElearningManagerFilterForm from "~/components/page/elearning/manager/exam/forms/TestElearningFilter"
import ElearningManagerFilterTable from "~/components/page/elearning/manager/exam/tables/TestElearning"
import { EXERCISE_CATEGORIES } from '~/utils/constants'

const STORE_NAMESPACE = "elearning/teaching/exercise-elearning"

export default {
  layout: "manage",
    
  components: {
    ElearningManagerFilterForm,
    ElearningManagerFilterTable
  },
  filters: {
  },
  data() {
    return {
      pagination: {
        total_elements: 0,
        last: false,
        total_pages: 1,
        size: 10,
        number: 0,
        first: true,
        number_of_elements: 0
      },
      params: {
        page: 1,
        size: 10,
        category: EXERCISE_CATEGORIES.TEST
      },
      list: [],
      loading: false
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      detailInfo: 'elearnings'
    }),
  },

  methods: {
    updateFilter(val) {
      this.params = { ...this.params, ...val }
      this.refreshData()
    },
    handleChangedType(val) {
      this.updateFilter({ type: val })
    },
    handleChangedRate(val) {
      this.updateFilter({ rate: val })
    },
    handleSubmitSearch(val) {
      this.updateFilter({ query: val })
    },
    submitFilter(val) {
      this.updateFilter(val)
    },
    updatePagination(val) {
      this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number + 1
      this.params.size = val.size
      this.getList()
    },
    async getList() {
      try {
        this.loading = true
        let params = { ...this.params }
      
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_EXERCISE_ELEARNING.LIST}`, { params }
        )
        this.list = this.get(this.detailInfo, 'data.content', [])
        this.pagination.size = this.get(this.detailInfo, 'data.page.size', 10)
        this.pagination.first = this.get(this.detailInfo, 'data.page.first', 1)
        this.pagination.last = this.get(this.detailInfo, 'data.page.last', 1)
        this.pagination.number = this.get(this.detailInfo, 'data.page.number', 0)
        this.pagination.total_pages = this.get(this.detailInfo, 'data.page.total_pages', 0)
        this.pagination.total_elements = this.get(this.detailInfo, 'data.page.total_elements', 0)
        this.pagination.number_of_elements = this.get(this.detailInfo, 'data.page.number_of_elements', 0)
        // this.pagination = { ...this.get(this.detailInfo, 'data.page', {}) }
      } catch (e) {
        console.log('Get list exercise elearning', e)
      } finally {
        this.loading = false
      }
    },
    refreshData() {
      this.params.page = 1
      this.getList()
    },
    get
  },

  created() {
    this.getList()
  }
};
</script>

<style lang="scss">
</style>