<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="4"/>
      </div>
      <div class="col-md-9">
        <div class="wrapContentMaterials__ElearningManager">
          <div class="titleMaterials__ElearningManager">
            <span>Danh sách bài giảng và khóa học</span>
          </div>
          <app-divider />
          <ElearningManagerUploadFile
            :on-success="handleDoneAddFile"
            :max-capacity="get(capacityInfo, 'data.max_repository_capacity', 0)"
            :used-capacity="get(capacityInfo, 'data.used_repository_capacity', 0)"
          />
          <div>
            <ElearningManagerFilterTable
              :list.sync="list"
              :pagination="pagination"
              :loading="loading"
              @changedFilter="updateFilter"
              @changedPagination="updatePagination"
              @deletedItems="deleteItems"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
  import ElearningManagerUploadFile from "~/components/page/elearning/manager/materials/ElearningManagerUploadFile"
  import ElearningManagerFilterTable from "~/components/page/elearning/manager/materials/ElearningManagerFilterTable"

  import * as actionTypes from "~/utils/action-types"
  import { mapState } from "vuex"
  import { get } from "lodash";
  import { useEffect } from "~/utils/common"

  const STORE_NAMESPACE = 'elearning/teaching/repository-files'
  const REPOSITORY_STORE_NAMESPACE = 'elearning/teaching/repository'

  export default {
    components: {
      ElearningManagerSide,
      ElearningManagerUploadFile,
      ElearningManagerFilterTable
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
        },
        list: [],
        loading: false
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      ...mapState(STORE_NAMESPACE, {
        detailInfo: 'files'
      }),
      ...mapState(REPOSITORY_STORE_NAMESPACE, {
        capacityInfo: 'info'
      }),
    },
    methods: {
      handleUploadChange(fileList, event) {
      },
      async handleDoneAddFile(data) {
        if (get(data, "success", false)) {
          await this.refreshData()
          return;
        }
        this.$toasted.error(get(data, "message", ""));
      },
      async getList() {
        try {
          this.loading = true
          let params = {...this.params}
          await this.$store.dispatch(
            `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.LIST}`, {params}
          )
          this.list = this.get(this.detailInfo, 'data.content', [])
          this.pagination = {...this.get(this.detailInfo, 'data.page', {})}
        } catch (e) {

        } finally {
          this.loading = false
        }

      },
      async getInfoCapacity() {
        try {
          await this.$store.dispatch(
            `${REPOSITORY_STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY.INFO}`, {}
          )
        } catch (e) {
        } finally {
        }
      },
      updateFilter(val) {
        this.params = { ...this.params, ...val }
        this.refreshData()
      },
      updatePagination(val) {
        this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number + 1
        this.params.size = val.size
      },
      async deleteItems(data) {
        // const delIds = _.map(items, 'id')
        // let data = {
        //   ids: delIds
        // }
        // const res = await this.$store.dispatch(
        //   `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.DELETE}`, { data }
        // )
        if (get(data, "success", false)) {
          await this.refreshData()
          this.$toasted.success(get(data, "message", "Xóa tài liệu không thành công. Vui lòng thử lại"))
          return
        }
        this.$toasted.error(get(data, "message", "Xóa tài liệu thành công"))
      },
      refreshData() {
        this.params.page = 1
        this.getList()
        this.getInfoCapacity()
      },
      get
    },
    created() {
      useEffect(this, this.getList.bind(this), [
        "params.page",
        "params.size",
        "params.type",
        "params.used",
        "params.query",
      ])
  
      useEffect(this, this.getInfoCapacity.bind(this), [
        "params.page",
        "params.size",
        "params.type",
        "params.used",
        "params.query",
      ])
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-material.scss";
</style>