<template>
  <!--List of exam into an elearning-->
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      @sort="sortTable"
      :data="list"
      :loading="loading"
    >
      <template v-slot:cell(title)="{row}">
        <td :title="get(row, 'title', '')">
          {{ get(row, 'title', '') | truncStrFilter(30) }}
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
            <div class="nowrap rate-result-wrapper">
              <span class="status-item status-item--success d-inline-block">
                {{ row | resultFigureRate('passed_percent') }}%
              </span>
              <span class="status-item status-item--fail d-inline-block">
                {{ row | resultFigureRate('failed_percent') }}%
              </span>
              <span class="status-item status-item--pending d-inline-block">
                {{ row | resultFigureRate('pending_percent') }}%
              </span>
            </div>
            
            <template slot="popover" class="tooltip-detail">
              <div>
                <rate-status
                  :total="get(row, 'participants', 0)"
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
      
      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            class
            title="Chi tiết"
            :to="`/elearning/manager/exams/${row.id}/participants`"
          >
            <IconArrow height="13"/>
          </n-link>
        </td>
      </template>
      
      <template v-slot:cell(type)="{row}">
        <td>
          {{ get(row, 'type', '') | exType2Txt }}
        </td>
      </template>
  
      <template v-slot:cell(participants)="{row}">
        <td>
          {{ get(row, 'participants', 0) | toThousandFilter }}
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
  import { numeralFormat } from "~/plugins/filters";

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
            total_elements: 0,
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
            text: "Tiêu đề bài tập",
          },
          {
            name: "type",
            text: "Thể loại",
          },
          {
            name: "participants",
            text: "Học sinh làm bài",
            sort: true
          },
          {
            name: "rate",
            text: "Tỷ lệ hoàn thành",
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
      sortTable(info) {
        this.$emit('changedSort', info)
      },
      numeralFormat,
      get
    },
  }
</script>

<style lang="scss">
</style>