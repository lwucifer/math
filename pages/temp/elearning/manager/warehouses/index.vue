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
          <app-divider></app-divider>
          <div>
            <ElearningManagerUploadFile
              @done="handleDoneAddFile"
            />
          </div>
          <div>
            <ElearningManagerFilterTable
              :list.sync="list"
              :pagination="pagination"
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

  import {createPayloadAddRepository} from "~/models/elearning/Repository"
  import * as actionTypes from "~/utils/action-types"
  import * as yup from "yup"
  import { mapState } from "vuex"
  import { get } from "lodash";
  import { useEffect } from "~/utils/common"

  const schema = yup.object().shape({
    name: yup.string().required(),
    // file: yup.object().required()
  });

  const STORE_NAMESPACE = 'elearning/teaching/repository-files'

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
        list: []
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      ...mapState(STORE_NAMESPACE, {
        detailInfo: 'files'
      }),
    },
    methods: {
      handleUploadChange(fileList, event) {
      },
      async handleDoneAddFile(data, event) {
        if (get(data, "success", false)) {
          await this.refreshData()
          this.$toasted.success(get(data, "message", ""));
          return;
        }
        this.$toasted.error(get(data, "message", ""));
      },
      async getList() {
        let params = {...this.params}
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.LIST}`, {params}
        )
        this.list = this.get(this.detailInfo, 'data.content', [])
        this.pagination = {...this.get(this.detailInfo, 'data.page', {})}
      },
      updateFilter(val) {
        this.params = { ...this.params, ...val }
        this.refreshData()
      },
      updatePagination(val) {
        this.params.size !== val.size ? this.params.page = 1 : this.params.page = val.number
        this.params.size = val.size
      },
      async deleteItems(items) {
        const delIds = _.map(items, 'id')
        let data = {
          ids: delIds
        }
        const res = await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.DELETE}`, { data }
        )
        if (get(res, "success", false)) {
          await this.refreshData()
          this.$toasted.success(get(res, "message", ""))
          return
        }
        this.$toasted.error(get(res, "message", ""))
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