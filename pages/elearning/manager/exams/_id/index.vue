<template>
  <div class="container">
    <!--<div class="row">-->
      <!--<div class="col-md-3">-->
        <!--<ElearningManagerSide active="3"/>-->
      <!--</div>-->
      <!--<div class="col-md-9">-->
        <!--<div class="elearning-manager-content">-->
          <!--<div class="elearning-manager-content__title">-->
            <!--<header-breadcrumb-->
              <!--title="Bài tập và bài kiểm tra"-->
              <!--:breadcrumb="breadcrumb"-->
            <!--/>-->
          <!--</div>-->

          <!--<div class="elearning-manager-content__main">-->
            <!--<div>-->
              <!--&lt;!&ndash;Filter form&ndash;&gt;-->
              <!--<submission-filter-form-->
                <!--@changedFilter="updateFilter"-->
              <!--/>-->

              <!--&lt;!&ndash;Table&ndash;&gt;-->
              <!--<submission-table-->
                <!--:list.sync="list"-->
                <!--:pagination="pagination"-->
                <!--:loading="loading"-->
                <!--@changedPagination="updatePagination"-->
              <!--/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  // import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
  // import HeaderBreadcrumb from "~/components/page/elearning/HeadBreadcrumb"
  // import SubmissionFilterForm from "~/components/page/elearning/manager/exam/forms/ResultFilter"
  // import SubmissionTable from "~/components/page/elearning/manager/exam/tables/Submission"
  //
  // import {mapState} from "vuex"
  // import * as actionTypes from "~/utils/action-types"
  // import { get } from "lodash"
  // import { useEffect } from "~/utils/common"
  //
  // const STORE_NAMESPACE = "elearning/teaching/submission"
  //
  // export default {
  //   layout: "exercise",
  //   components: {
  //     ElearningManagerSide,
  //     SubmissionTable,
  //     SubmissionFilterForm,
  //     HeaderBreadcrumb
  //   },
  //
  //   data() {
  //     return {
  //       pagination: {
  //         totalElements: 0,
  //         last: false,
  //         totalPages: 1,
  //         size: 10,
  //         number: 0,
  //         first: true,
  //         numberOfElements: 0
  //       },
  //       params: {
  //         page: 1,
  //         size: 10,
  //         exercise_id: ''
  //       },
  //       list: [],
  //       loading: false,
  //     }
  //   },
  //   computed: {
  //     ...mapState("auth", ["loggedUser"]),
  //     ...mapState(STORE_NAMESPACE, {
  //       detailInfo: 'submissions'
  //     }),
  //     breadcrumb: function() {
  //       let data = [
  //         {
  //           text: 'Bài giảng và khóa học',
  //           link: '/elearning/manager/exams'
  //         },
  //         {
  //           text: 'Bài tập đại số lớp 10',
  //           link: '/elearning/manager/exams'
  //         },
  //         {
  //           text: 'Nguyễn Văn Nam',
  //           link: '/'
  //         }
  //       ]
  //       return data
  //     }
  //   },
  //
  //   methods: {
  //     async getList() {
  //       try {
  //         this.loading = true
  //         let params = {...this.params}
  //         await this.$store.dispatch(
  //           `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_SUBMISSION.LIST}`, {params}
  //         )
  //         this.list = this.get(this.detailInfo, 'data.content', [])
  //         this.pagination = {...this.get(this.detailInfo, 'data.page', {})}
  //       } catch (e) {
  //
  //       } finally {
  //         this.loading = false
  //       }
  //
  //     },
  //     updateFilter(val) {
  //       this.params = { ...this.params, ...val }
  //       this.refreshData()
  //     },
  //     updatePagination(val) {
  //       this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number + 1
  //       this.params.size = val.size
  //     },
  //     refreshData() {
  //       this.params.page = 1
  //       this.getList()
  //     },
  //     get
  //   },
  //
  //   created() {
  //     useEffect(this, this.getList.bind(this), [
  //       "params.page",
  //       "params.size",
  //       "params.exercise_id",
  //       "params.keyword",
  //       "params.class",
  //       "params.result",
  //     ])
  //   }
  // }
</script>

<style lang="scss">
  /*@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";*/
  /*@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";*/
</style>