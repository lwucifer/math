<template>
  <div class="wrapfilterbar__ElearningManagerFilterTable">
    <div class="row">
      <div class="col-6 wrapfilterform__ElearningManagerFilterTable">
        <div>
          <button class="btnFitlerSummit__ElearningManagerFilterTable" @click="submit">
            <IconFilter/>
            <span>Lọc kết quả</span>
          </button>
        </div>
        <div>
          <app-vue-select
            class="selectTypes__ElearningManagerFilterTable"
            :options="fileTypes"
            :reduce="item => item.value"
            v-model="params.type"
            label="text"
            placeholder="Theo loại"
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
            class="selectStatus__ElearningManagerFilterTable"
            :options="statuses"
            :reduce="item => item.value"
            v-model="params.used"
            label="text"
            placeholder="Theo tình trạng"
            searchable
            clearable
            @input="handleChangedInput"
            @search:focus="handleFocusSearchInput"
            @search:blur="handleBlurSearchInput"
          >
          </app-vue-select>
        </div>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <div class="wrapSearchForm___ElearningManagerFilterTable">
          <app-input
            type="text"
            v-model="params.query"
            placeholder="Nhập để tìm kiếm..."
            :size="'sm'"
            @input="handleSearch"
            class="inputSearch"

          />
          <button type="submit">
            <IconSearch width="15" height="15"/>
          </button>
        </div>
      </div>
    </div>
    <div>
      <button
        v-if="additionalActions.delete"
        @click="deleteItems"
        class="bntRemoveList__ElearningManagerFilterTable"
      >
        <IconTrashAlt/>
        <span>Xóa khỏi danh sách</span>
      </button>
    </div>
    <div class="wrapTable__ElearningManagerFilterTable">
      <app-table
        :heads="heads"
        :pagination="pagination"
        :data.sync="list"
        multiple-selection
        @pagechange="onPageChange"
        @selectionChange="selectRow"
        class="tableUploadFile__ElearningManagerFilterTable"
      >
        <template v-slot:cell(created_at)="{row}">
          <td>
            {{ row | moment("DD/MM/YYYY") }}
          </td>
        </template>
      </app-table>
    </div>
  </div>
</template>

<script>
  import IconFilter from "~/assets/svg/icons/filter.svg?inline"
  import IconSearch from "~/assets/svg/icons/search.svg?inline"
  import IconArrow from "~/assets/svg/icons/arrow.svg?inline"
  import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline"
  import {mapState} from "vuex"
  import * as actionTypes from "~/utils/action-types"
  import { useEffect } from "~/utils/common"
  import { get } from "lodash"

  const STORE_NAMESPACE = 'elearning/teaching/repository-files'

  import {MATERIALS} from "~/server/fakedata/elearning/materials"

  export default {
    components: {
      IconFilter,
      IconSearch,
      IconArrow,
      IconTrashAlt
    },

    data() {
      return {
        heads: [
          {
            name: "name",
            text: "Tên file",
          },
          {
            name: "type",
            text: "Loại",
          },
          {
            name: "lesson",
            text: "Thuộc bài giảng",
          },
          {
            name: "created_at",
            text: "Ngày tải lên",
            sort: true
          },
        ],
        statuses: [
          {
            value: true,
            text: 'Đã sử dụng'
          },
          {
            value: false,
            text: 'Chưa sử dụng'
          },
        ],
        fileTypes: [
          {
            value: 'audio',
            text: 'Audio'
          },
          {
            value: 'video',
            text: 'Video'
          },
          {
            value: 'docs',
            text: 'Văn bản'
          },
        ],
        isAuthenticated: true,
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
          size: 10
        },
        list: [],
        selectedItems: []
      }
    },

    computed: {
      ...mapState("auth", ["loggedUser"]),
      ...mapState(STORE_NAMESPACE, {
        detailInfo: 'files'
      }),
      additionalActions: function() {
        let data = {
          delete: this.selectedItems.length > 0
        }
        return data
      }
    },
    methods: {
      onPageChange(e) {
        this.params.size !== e.size ? this.params.page = 1 : this.params.page = e.number
        this.params.size = e.size
      },
      submit() {
        this.refreshData()
        console.log('[Component] Elearning exam: submitted')
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
      handleSearch() {
        this.refreshData()
        console.log('[Component] Elearning exam: searching')
      },
      selectRow(data) {
        this.selectedItems = data
      },
      async getList() {
        console.log('calling ...')
        let params = { ...this.params }

        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.LIST}`, { params }
        )
        this.list = this.get(this.detailInfo, 'data.content', [])
        this.pagination = { ...this.get(this.detailInfo, 'data.page', {}) }
      },
      async deleteItems() {
        const delIds = _.map(this.selectedItems, 'id')
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
        this.selectedItems = []
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
  @import "~/assets/scss/components/elearning/manager/material/_elearning-filtertable.scss";
</style>