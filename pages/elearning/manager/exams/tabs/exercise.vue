<template>
  <div class="elearning-">
    <!--Filter form-->
    <elearning-manager-filter-form
      @changedFilter="updateFilter"
      @submit="submitFilter"
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
import ElearningManagerFilterForm from "~/components/page/elearning/manager/exam/ElearningManagerFilterForm"
import ElearningManagerFilterTable from "~/components/page/elearning/manager/exam/ElearningManagerFilterTable"

const STORE_NAMESPACE = "elearning/teaching/exercise"

export default {
  components: {
    ElearningManagerFilterForm,
    ElearningManagerFilterTable
  },
  filters: {
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
        elearning_id: null,
        lesson_id: null
      },
      list: [],
      loading: false
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      detailInfo: 'exercises'
    }),
  },

  methods: {
    updateFilter(val) {
      this.params = { ...this.params, ...val }
      this.refreshData()
    },
    submitFilter(val) {
      this.updateFilter(val)
    },
    updatePagination(val) {
      this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number + 1
      this.params.size = val.size
    },
    async getList() {
      try {
        this.loading = true
        // this.params.elearning_id = getParamQuery('elearning_id')
        this.params.elearning_id = "230291b7-e762-4da8-b411-77c313fee652"
        let params = { ...this.params }

        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_EXERCISE.LIST}`, { params }
        )
        this.list = this.get(this.detailInfo, 'data.content', [])
        this.pagination = { ...this.get(this.detailInfo, 'data.page', {}) }
      } catch (e) {
        console.log('Get list exercise ', e)
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
    useEffect(this, this.getList.bind(this), [
      "params.page",
      "params.size",
      "params.elearning_id"
    ])
  }
};
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
  /*@import "~/assets/scss/components/elearning/manager/_elearning-exercise.scss";*/
</style>