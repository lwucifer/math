<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="updating"
    >
      <template v-slot:cell(timestamp)="{row}">
        <td>
          {{ get(row, 'timestamp', '') | moment("hh:mm A DD/MM/YYYY") }}
        </td>
      </template>
      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            class
            :to="`/elearning/manager/exams/${$route.params.id}/submissions/${row.id}`">
            Xem chi tiết
          </n-link>
        </td>
      </template>
    </app-table>
  </div>
</template>

<script>
  import { get } from "lodash"

  export default {
    components: {
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

    },

    data() {
      return {
        heads: [
          {
            name: "student",
            text: "Học sinh",
            sort: false
          },
          {
            name: "class",
            text: "Lớp",
            sort: false
          },
          {
            name: "mark",
            text: "Kết quả",
            sort: false
          },
          {
            name: "times",
            text: "Số lần làm bài",
            sort: false
          },
          {
            name: "timestamp",
            text: "Thời gian nộp bài",
            sort: false
          },
          {
            name: "action",
            text: "",
            sort: false
          },
        ],
      }
    },

    computed: {
      updating: function () {
        return this.loading
      }
    },
    methods: {
      onPageChange(e) {
        this.$emit('changedPagination', e)
      },
      get
    },
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/material/_elearning-filtertable.scss";
</style>