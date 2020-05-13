<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="loading"
    >
      <template v-slot:cell(action)>
        <td class="text-primary">
          <n-link
            class="text-decoration-none"
            title="Chi tiết"
            :to="`/elearning/manager/students`">
            Xem chi tiết
          </n-link>
        </td>
      </template>
      
      <template v-slot:cell(name)="{row}">
        <td style="width:60%">
          {{ get(row, 'name', '')  }}
        </td>
      </template>
      
      
      <template v-slot:cell(mark)="{row}">
        <td style="width:25%">
          <span v-if="!row.mark" class="text-warning">Chưa chấm điểm</span>
          <span v-else-if="row.mark > 6" class="text-primary">{{ get(row, 'mark', '')  }}/10</span>
          <span v-else-if="row.mark < 6" class="text-secondary">{{ get(row, 'mark', '')  }}/10</span>
        </td>
      </template>
    </app-table><!--End table-->
  </div>
</template>

<script>
  import { get } from "lodash"
  import IconArrow from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline"
  import RateStatus from "~/components/page/elearning/manager/exam/RateStatus"
  import { ELEARNING_TYPES } from "~/utils/constants"
  
  export default {
    components: {
      IconArrow,
      RateStatus
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
      heads: {
        type: Array,
        default: () => []
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