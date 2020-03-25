<template>
  <div class="wrapfilterbar__ElearningManagerFilterTable">
    <elearning-manager-filter-form
      @changedFilter="updateFilter"
    />
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
  import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline"
  import ElearningManagerFilterForm from "./ElearningManagerFilterForm";

  import {mapState} from "vuex"
  import { get } from "lodash"

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
            name: "lesson",
            text: "Thuộc bài giảng",
          },
          {
            name: "created_at",
            text: "Ngày tải lên",
            sort: true
          },
        ],

        selectedItems: [],
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
    },
    methods: {
      onPageChange(e) {
        this.$emit('changedPagination', e)
      },
      selectRow(data) {
        this.selectedItems = data
      },
      updateFilter(val) {
        this.$emit('changedFilter', val)
      },
      async deleteItems() {
        this.$emit('deletedItems', this.selectedItems)
      },
      get
    },
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/material/_elearning-filtertable.scss";
</style>