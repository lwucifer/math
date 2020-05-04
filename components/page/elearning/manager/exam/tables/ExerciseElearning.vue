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
            :to="`/elearning/manager/exams/list?elearning_id=${row.id}`">
            <IconArrow />
          </n-link>
        </td>
      </template>

      <template v-slot:cell(type)="{row}">
        <td>
          {{ get(row, 'type', '') | exerciseTypeFilter }}
        </td>
      </template>

      <template v-slot:cell(created)="{row}">
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

  import { ELEARNING_TYPES } from "~/utils/constants"

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

    filters: {
      exerciseTypeFilter: function(val) {
        const MATCHED_DATA = {
          [ELEARNING_TYPES.COURSE]: 'Khóa học',
          [ELEARNING_TYPES.LECTURE]: 'Bài giảng'
        }
        if (MATCHED_DATA.hasOwnProperty(val))
        return MATCHED_DATA[val]
        return '-'
      }
    },

    data() {
      return {
        heads: [
          {
            name: "name",
            text: "Khóa học/bài giảng",
          },
          {
            name: "type",
            text: "Thể loại",
          },
          {
            name: "exercises",
            text: "Số bài tập",
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