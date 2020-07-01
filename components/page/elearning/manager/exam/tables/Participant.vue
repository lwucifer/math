<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      :data="list"
      :loading="updating"
    >
      <template v-slot:cell(name)="{row}">
        <td :title="get(row, 'name', '')">
          {{ get(row, 'name', '') | truncStrFilter(30) }}
        </td>
      </template>
      
      <template v-slot:cell(mark)="{row}">
        <td>
          <!--<v-popover-->
            <!--offset="10"-->
            <!--trigger="hover"-->
          <!--&gt;-->
            <span
              class="font-weight-semi-bold nowrap"
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
              <span v-if="isPending(row)">Chưa chấm</span>
              <span v-if="isMarked(row)">
                {{ get(row, 'mark', 0)}}/{{ get(row, 'points', 10) }}
                ({{ get(row, 'result')  | subResult2Txt }})
              </span>
          </span>
    
            <!--<template slot="popover">-->
              <!--{{ get(row, 'result')  | subResult2Txt }}-->
            <!--</template>-->
  
          <!--</v-popover>-->
          
        </td>
      </template>
      <template v-slot:cell(school_year)="{row}">
        <td>
          {{ get(row, 'school_year', '--') }}
        </td>
      </template>
      <template v-slot:cell(submission)="{row}">
        <td>
          <span v-if="get(row, 'submission')">
            {{ get(row, 'submission', '') | getDateTimeHH_MM_A_DD_MM_YY }}
          </span>
        </td>
      </template>
      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            class
            v-if="isPending(row) || isMarked(row)"
            title="Chi tiết"
            :to="`/elearning/manager/exams/${$route.params.id}/results?user_id=${row.id}&elearning_name=${getParamQuery('elearning_name')}&item_name=${getParamQuery('item_name')}&student_name=${get(row, 'name', '')}&student_id=${row.student_id ? row.student_id: ''}`">
            <IconArrow height="13" style="height: 1.5rem;"/>
          </n-link>
        </td>
      </template>
    </app-table>
  </div>
</template>

<script>
  import { SUBMISSION_RESULTS, SCALE_MARK } from "~/utils/constants"
  import IconArrow from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline"
  import { get } from "lodash"
  import { getParamQuery } from "~/utils/common"

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
            name: "name",
            text: "Học sinh",
          },
          {
            name: "class_name",
            text: "Lớp",
          },
          {
            name: "school_year",
            text: "Năm học",
          },
          {
            name: "mark",
            text: "Kết quả",
          },
          {
            name: "reworks",
            text: "Số lần làm bài",
          },
          {
            name: "submission",
            text: "Thời gian nộp bài",
          },
          {
            name: "action",
            text: "",
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
      getParamQuery,
      get
    },
  }
</script>

<style lang="scss">
</style>