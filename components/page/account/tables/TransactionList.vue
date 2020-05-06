<template>
  <app-table
    :heads="heads"
    :pagination="pagination"
    @pagechange="onPageChange"
    :data="list"
    style="margin-left: -1.5rem; margin-right: -1.5rem;"
  >
    <template v-slot:cell(status)="{row}">
      <td>
        <span :class="statusClass(row.status)">
          {{ row.status | transactionStatus2Txt }}
        </span>
      </td>
    </template>
  </app-table>
</template>

<script>
  import {
    TRANSACTION_STATUSES
  } from "~/utils/constants"
  
  export default {
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
    data() {
      return {
        heads: [
          {
            name: "code",
            text: "Mã đơn hàng",
            sort: true
          },
          {
            name: "timestamp",
            text: "Ngày mua",
            sort: true
          },
          {
            name: "desc",
            text: "Sản phẩm",
            sort: true
          },
          {
            name: "cost",
            text: "Tổng tiền",
            sort: true
          },
          {
            name: "status",
            text: "Trạng thái",
            sort: true
          },
          {
            name: "method",
            text: "Phương thức TT",
            sort: true
          },
        ],
      }
    },
    methods: {
      onPageChange(e) {
        this.$emit('changedPagination', e)
      },
      statusClass(type) {
        if (type == TRANSACTION_STATUSES.SUCCESS) {
          return { 'text-success': true }
        } else if (type == TRANSACTION_STATUSES.PENDING) {
          return { 'text-warning': true }
        } else if (type == TRANSACTION_STATUSES.FAILED) {
          return { 'text-error': true }
        } else {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>