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
                'score--pass': (get(row, 'result', '') == SUBMISSION_RESULTS.PASSED),
                'score--fail': (get(row, 'result', '') == SUBMISSION_RESULTS.FAILED),
                'score--empty': (get(row, 'result', '') == SUBMISSION_RESULTS.PENDING),
              }"
            >
              <span
                v-if="isNotDo(row)"
              >
                Chưa làm bài
              </span>
              <span v-if="isPending(row)">Chưa chấm điểm</span>
              <span v-if="isMarked(row)">
                {{ get(row, 'mark', 0)}}/{{ get(row, 'points', 10) }}
              </span>
          </span>
    
            <template slot="popover">
              {{ get(row, 'result')  | subResult2Txt }}
            </template>
  
          </v-popover>
          
        </td>
      </template>
      <template v-slot:cell(submission)="{row}">
        <td>
          <span v-if="get(row, 'submission')">
            {{ get(row, 'submission', '') | moment("hh:mm A DD/MM/YYYY") }}
          </span>
        </td>
      </template>
      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            v-if="isPending(row) || isMarked(row)"
            class
            :to="`/elearning/manager/exams/${$route.params.id}/results?student_id=${row.student_id}&user_id=${row.id}`">
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
    data() {
      return {
        heads: [
          {
            name: "name",
            text: "Học sinh",
            sort: false
          },
          {
            name: "class_name",
            text: "Lớp",
            sort: false
          },
          {
            name: "mark",
            text: "Kết quả",
            sort: false
          },
          {
            name: "reworks",
            text: "Số lần làm bài",
            sort: false
          },
          {
            name: "submission",
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
      },
    },
    methods: {
      onPageChange(e) {
        this.$emit('changedPagination', e)
      },
      isNotDo(item) {
        let flat = true
        if (item.result) {
          if (this.get(item, 'result') != SUBMISSION_RESULTS.NONE) {
            flat = false
          }
        }
        return flat
      },
      isPending(item) {
        return this.get(item, 'result', false) && this.get(item, 'result') == SUBMISSION_RESULTS.PENDING
      },
      isMarked(item) {
        return this.get(item, 'result', false) &&
          this.get(item, 'result') != SUBMISSION_RESULTS.NONE &&
          this.get(item, 'result') != SUBMISSION_RESULTS.PENDING
      },
      get
    },
  }
</script>

<style lang="scss">
</style>