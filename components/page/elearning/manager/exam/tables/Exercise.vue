<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="loading"
    >
      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            class
            title="Chi tiết"
            :to="`/elearning/manager/exams/${row.id}/participants`"
          >
            <IconArrow />
          </n-link>
        </td>
      </template>

      <template v-slot:cell(type)="{row}">
        <td>
          {{ get(row, 'type', '') | exType2Txt }}
        </td>
      </template>

      <template v-slot:cell(created_at)="{row}">
        <td>
          {{ get(row, 'created', '') | moment("DD/MM/YYYY") }}
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
  import { get } from "lodash"
  import IconArrow from "~/assets/svg/icons/arrow.svg?inline"

  export default {
    components: {
      IconArrow
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
    data() {
      return {
        heads: [
          {
            name: "title",
            text: "Tiêu đề",
          },
          {
            name: "type",
            text: "Thể loại",
          },
          {
            name: "lesson",
            text: "Thuộc bài giảng",
          },
          {
            name: "elearning",
            text: "Thuộc khóa học",
          },
          {
            name: "participants",
            text: "Học sinh làm bài",
            sort: true
          },
          {
            name: "created",
            text: "Ngày khởi tạo",
            sort: true
          },
          {
            name: "action",
            text: "",
          }
        ],
      }
    },

    computed: {
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
</style>