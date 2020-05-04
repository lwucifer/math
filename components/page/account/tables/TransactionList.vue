<template>
  <app-table
    :heads="heads"
    :pagination="pagination"
    @pagechange="onPageChange"
    :data="list"
  >
    <tr v-for="(item , index) in list" :key="index">
      <td v-html="item[head.name]" v-for="(head , j) in heads" :key="j"></td>
    </tr>
    <template v-slot:cell(status)="{row}">
      <td v-if="row.status=='-1'">Thất bại</td>
      <td v-else-if="row.status=='0'">Chờ xử lí</td>
      <td v-else-if="row.status=='1'">Thành công</td>
    </template>
  </app-table>
</template>

<script>
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
    }
  }
</script>

<style scoped>

</style>