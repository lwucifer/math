<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="loading"
    >
      <template v-slot:cell(name)="{row}">
        <td :title="get(row, 'name', '')">
          {{ get(row, 'name', '') | truncStrFilter(30) }}
        </td>
      </template>
      
      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            class
            title="Chi tiết"
            :to="`/elearning/manager/exams/test?elearning_id=${row.id}`">
            <IconArrow height="13"/>
          </n-link>
        </td>
      </template>
      
      <template v-slot:cell(type)="{row}">
        <td class="nowrap">
          {{ get(row, 'type', '') | exerciseTypeFilter }}
        </td>
      </template>
      
      <template v-slot:cell(rate)="{row}">
        <td>
          <v-popover
            offset="10"
            trigger="hover"
            placement="top"
            popover-class="tooltip--rate"
          >
            <div class="nowrap">
              <span class="status-item status-item--success d-inline-block">
                {{get(row, 'passed_percent', 0) | numeralFormat('0.0')}}%
              </span>
              <span class="status-item status-item--fail d-inline-block">
                {{get(row, 'failed_percent', 0) | numeralFormat('0.0')}}%
              </span>
              <span class="status-item status-item--pending d-inline-block">
                {{get(row, 'pending_percent', 0) | numeralFormat('0.0')}}%
              </span>
            </div>
            
            <template slot="popover" class="tooltip-detail">
              <div>
                <rate-status
                  :total="get(row, 'total_students', 0)"
                  :passed="get(row, 'passed', 0)"
                  :failed="get(row, 'failed', 0)"
                  :pending="get(row, 'pending', 0)"
                >
                </rate-status>
              </div>
            </template>
          
          </v-popover>
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
            name: "tests",
            text: "Số bài tập",
            sort: true
          },
          {
            name: "rate",
            text: "Tỷ lệ hoàn thành",
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