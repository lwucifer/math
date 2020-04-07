<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="updating"
    >
      <template v-slot:cell(mark)="{row}">
        <td>
          <v-popover
            offset="10"
            trigger="hover"
          >
            <span
              class="font-weight-bold"
              :class="{
                'score--pass': (get(row, 'result') == SUBMISSION_RESULTS.PASS),
                'score--fail': (get(row, 'result') == SUBMISSION_RESULTS.FAIL),
                'score--empty': (get(row, 'result') == SUBMISSION_RESULTS.NO_SCORE),
              }"
            >
            {{ get(row, 'mark', 'Chưa chấm điểm') }}
          </span>
    
            <template slot="popover">
              {{ get(row, 'result')  | submissionStatus }}
            </template>
  
          </v-popover>
          
        </td>
      </template>
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
  import { SUBMISSION_RESULTS, SCALE_MARK } from "~/utils/constants"
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
      submissionStatus: function(val) {
        if (val == SUBMISSION_RESULTS.NO_SCORE) {
          return 'Chưa chấm điểm'
        } else if (val == SUBMISSION_RESULTS.PASS) {
           return 'Đạt'
        } else if (val == SUBMISSION_RESULTS.FAIL) {
          return 'Không đạt'
        }
        return ''
      }
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
        SUBMISSION_RESULTS: SUBMISSION_RESULTS
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
</style>