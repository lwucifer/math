<template>
  <div class="container">
    <breadcrumb />
    
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="3" />
      </div>
      <div class="col-md-9">
        <sub-block-section
          title="Bài tập và bài kiểm tra"
        >
          <template v-slot:content>
            <div class="elearning-manager-content">
              <div class="elearning-manager-content__title">
                <head-tabs
                  :tabs="tabs"
                  :active.sync="tab"
                  @selectedItem="changeTab"
                />
              </div>
    
              <div class="elearning-manager-content__main">
                <keep-alive>
                  <component v-bind:is="currentTabComponent"></component>
                </keep-alive>
                
                <!--<div>-->
                  <!--&lt;!&ndash;Filter form&ndash;&gt;-->
                  <!--<elearning-manager-filter-form-->
                    <!--@submitFilter="submitFilter"-->
                    <!--@changedType="handleChangedType"-->
                    <!--@submitSearch="handleSubmitSearch"-->
                  <!--/>-->
                  <!--<elearning-manager-filter-table-->
                    <!--:pagination="pagination"-->
                    <!--:list="list"-->
                    <!--:loading="loading"-->
                    <!--@changedPagination="updatePagination"-->
                  <!--/>-->
                <!--</div>-->
              </div>
            </div>
          </template>
        </sub-block-section>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
import ElearningManagerFilterForm from "~/components/page/elearning/manager/exam/forms/ExerciseElearningFilter"
import ElearningManagerFilterTable from "~/components/page/elearning/manager/exam/tables/ExerciseElearning"
import Breadcrumb from "~/components/layout/breadcrumb/BreadCrumb";
import HeadTabs from "~/components/page/elearning/HeadTab";
import { mapState } from "vuex"
import { get } from "lodash"
import * as actionTypes from "~/utils/action-types"
// import ExerciseTab from './tabs/exercise-elearning'

const ExerciseTab = () => import("./tabs/exercise-elearning");
const ExamTab = () => import("./tabs/exam-elearning");

const STORE_NAMESPACE = 'elearning/teaching/exercise-elearning'

export default {
  layout: "manage",

  components: {
    Breadcrumb,
    HeadTabs,
    ElearningManagerSide,
    ElearningManagerFilterForm,
    ElearningManagerFilterTable,
    ExerciseTab,
    ExamTab
  },

  data() {
    return {
      tab: 'exercise',
      tabs: [
        {
          key: 'exercise',
          text: 'Bài tập'
        },
        {
          key: 'exam',
          text: 'Bài kiểm tra'
        },
      ],
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
        size: 10
      },
      list: [],
      loading: false
    }
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      detailInfo: 'elearnings'
    }),
    currentTabComponent: function() {
      const MATCHED_TABS = {
        exercise: 'ExerciseTab',
        exam: 'ExamTab'
      }
      return MATCHED_TABS[this.tab]
    }
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
        this.pagination.totalPages = this.get(this.detailInfo, 'data.page.total_pages', 0)
        this.pagination.totalElements = this.get(this.detailInfo, 'data.page.total_elements', 0)
        this.pagination.numberOfElements = this.get(this.detailInfo, 'data.page.number_of_elements', 0)
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
    changeTab(key) {
      this.tab = key
    },
    get
  },
  created() {
    // this.getList()
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>