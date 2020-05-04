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
            name: "time",
            text: "Thời gian",
            sort: true
          },
          {
            name: "code",
            text: "Mã đơn hàng",
            sort: true
          },
          {
            name: "name",
            text: "Nội dung",
            sort: true
          },
          {
            name: "price",
            text: "Giá trị",
            sort: true
          },
          {
            name: "type",
            text: "Loại GD",
            sort: true
          },
          {
            name: "pay",
            text: "Phương thức thanh toán",
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