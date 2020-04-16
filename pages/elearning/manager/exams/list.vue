<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <h5 class="color-primary mb-3">Bài tập và bài kiểm tra</h5>
            <hr class/>
          </div>

          <div class="elearning-manager-content__main">
            <div>
              <!--Filter form-->
              <elearning-manager-filter-form
                @submitFilter="submitFilter"
                @changedType="handleChangedType"
                @submitSearch="handleSubmitSearch"
              />
              <elearning-manager-filter-table
                :pagination="pagination"
                :list="list"
                :loading="loading"
                @changedPagination="updatePagination"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
import ElearningManagerFilterForm from "~/components/page/elearning/manager/exam/forms/ExerciseElearningFilter"
import ElearningManagerFilterTable from "~/components/page/elearning/manager/exam/tables/ExerciseElearning"
import { mapState } from "vuex"
import { get } from "lodash"
import * as actionTypes from "~/utils/action-types"

const STORE_NAMESPACE = 'elearning/teaching/exercise'

export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    ElearningManagerFilterForm,
    ElearningManagerFilterTable
  },

  data() {
    return {
      pagination: {
        totalElements: 0,
        totalPages: 1,
        numberOfElements: 0,
        last: false,
        size: 10,
        number: 0,
        first: true,
      },
      params: {
        page: 1,
        size: 10,
      },
      list: [],
      loading: false
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
  },

  methods: {
    updateFilter(val) {
      this.params = { ...this.params, ...val }
      this.refreshData()
    },
    handleChangedType(val) {
      this.updateFilter({ type: val })
    },
    handleSubmitSearch(val) {
      this.updateFilter({ name: val })
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
    this.getList()
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>