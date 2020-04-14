<template>
  <div class="wrapfilterbar__ElearningManagerFilterTable">
    <elearning-manager-filter-form
      @changedFilter="updateFilter"
      @submitFilter="submitFilter"
      @changedType="handleChangedType"
      @changedQuery="handleChangedSearch"
      @changedStatus="handleChangedStatus"
      @submitSearch="handleSubmitSearch"
      class="mb-4"
    />
    <div>
      
        <v-popover
          :disabled="additionalActions.delete"
          trigger="hover"
          placement="top"
          offset="5"
        >
          <app-button
            size="sm"
            square
            normal
            :disabled="!additionalActions.delete"
            :color="additionalActions.delete ? 'secondary' : 'disabled'"
            @click="visible.delete = true"
            class="bntRemoveList__ElearningManagerFilterTable"
          >
            <IconTrashAlt/>
            <span>Xóa tài liệu</span>
          </app-button>
  
          <template slot="popover">
            <span>Bạn vui lòng chọn tài liệu cần xóa</span>
          </template>
        </v-popover>
        
    </div>

    <div class="wrapTable__ElearningManagerFilterTable">
      <app-table
        :heads="heads"
        :pagination="pagination"
        :data.sync="list"
        :opts="[
          { value: 10, text: '10' },
          { value: 25, text: '25' },
          { value: 50, text: '50' },
          { value: 100, text: '100' }]"
        multiple-selection
        @pagechange="onPageChange"
        @selectionChange="selectRow"
        class="tableUploadFile__ElearningManagerFilterTable"
        :loading="updating"
      >
        <template v-slot:cell(status)="{row}">
          <td>
            {{ get(row, 'used', false ) | statusFilter }}
          </td>
        </template>
        <template v-slot:cell(size)="{row}">
          <td>
            {{ get(row, 'size', 0 ) }} MB
          </td>
        </template>
        <template v-slot:cell(created_at)="{row}">
          <td>
            {{ get(row, 'created_at', '-') | moment("DD/MM/YYYY") }}
          </td>
        </template>
      </app-table>
    </div>

    <app-modal-confirm
      v-if="visible.delete"
      @cancel="cancelDel"
      @ok="confirmDel"
    >
      <b>Bạn có chắc muốn xóa tài liệu không?</b>
    </app-modal-confirm>
  </div>
</template>

<script>
  import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline"
  import ElearningManagerFilterForm from "./ElearningManagerFilterForm";

  import {mapState} from "vuex"
  import { get } from "lodash"
  import * as actionTypes from "~/utils/action-types"

  const STORE_NAMESPACE = 'elearning/teaching/repository-files'

  export default {
    components: {
      IconTrashAlt,
      ElearningManagerFilterForm
    },

    props: {
      list: {
        type: Array,
        default: () => []
      },
      pagination: {
        type: Object,
        default: () => {
          return {
            total: 0,
            size: 10,
            page: 1,
            totalElements: 0,
            first: 1,
            last: 1,
            number: 0
          }
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },

    filters: {
      statusFilter: function(val) {
        if (val) return 'Đã sử dụng'
        return '-'
      }
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
            name: "status",
            text: "Trạng thái",
          },
          {
            name: "size",
            text: "Dung lượng",
          },
          {
            name: "created_at",
            text: "Ngày tải lên",
            sort: true
          },
        ],
        selectedItems: [],
        visible: {
          delete: false
        }
      }
    },

    computed: {
      ...mapState("auth", ["loggedUser"]),
      additionalActions: function() {
        let data = {
          delete: this.selectedItems.length > 0
        }
        return data
      },
      updating: function () {
        return this.loading
      }
    },
    methods: {
      onPageChange(e) {
        this.resetData()
        this.$emit('changedPagination', e)
      },
      selectRow(data) {
        this.selectedItems = data
      },
      handleChangedSearch(val) {
        this.$emit('changedQuery', val)
      },
      handleChangedType(val) {
        this.$emit('changedType', val)
      },
      handleChangedStatus(val) {
        this.$emit('changedStatus', val)
      },
      handleSubmitSearch(val) {
        this.$emit('submitSearch', val)
      },
      updateFilter(val) {
        this.$emit('changedFilter', val)
      },
      submitFilter(val) {
        this.$emit('submitFilter', val)
      },
      async deleteItems(items) {
        const delIds = _.map(items, 'id')
        let data = {
          ids: delIds
        }
        const res = await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.ELEARNING_TEACHING_REPOSITORY_FILE.DELETE}`, { data }
        )
        return res
      },
      async confirmDel() {
        this.visible.delete = false
        const res = await this.deleteItems(this.selectedItems)
        this.$emit('deletedItems', res)
        if (get(res, "success", false)) {
          this.selectedItems = []
        }
      },
      cancelDel() {
        this.visible.delete = false
      },
      resetData() {
        this.selectedItems = []
      },
      get
    },
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/material/_elearning-filtertable.scss";
</style>