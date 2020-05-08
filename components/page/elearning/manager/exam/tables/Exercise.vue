<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="loading"
    >
      <template v-slot:cell(rate)="{row}">
        <td>
          <v-popover
            offset="10"
            trigger="hover"
            placement="top"
            popover-class="tooltip--rate"
          >
            <div>
              <span class="status-item status-item--success d-inline-block">
                {{get(row, 'passed_percent', 0)}}%
              </span>
              <span class="status-item status-item--fail d-inline-block">
                {{get(row, 'failed_percent', 0)}}%
              </span>
              <span class="status-item status-item--pending d-inline-block">
                {{get(row, 'pending_percent', 0)}}%
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
  import IconArrow from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline"
  import RateStatus from "~/components/page/elearning/manager/exam/RateStatus"

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
            sort: true
          },
          {
            name: "created_at",
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