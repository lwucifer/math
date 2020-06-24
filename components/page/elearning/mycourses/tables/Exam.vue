<template>
  <div>
    <app-table
      :heads="heads"
      :pagination="pagination"
      @pagechange="onPageChange"
      @sort="sortTable"
      :data="list"
      :loading="loading"
    >
      <template v-slot:cell(name)="{row}">
        <td :title="get(row, 'name', '')">
          <span>
            {{ get(row, 'name', '') | truncStrFilter(30) }}
          </span>
        </td>
      </template>

      <template v-slot:cell(open_time)="{row}">
        <td>
          <span v-if="get(row, 'open_time', false)">{{ get(row, 'open_time') | getDateBirthday }}</span>
          <span v-else>-</span>
        </td>
      </template>

      <template v-slot:cell(deadline)="{row}">
        <td>
          <span v-if="get(row, 'deadline', false)">{{ get(row, 'deadline') | getDateBirthday }}</span>
          <span v-else>-</span>
        </td>
      </template>

      <template v-slot:cell(status)="{row}">
        <td>
          <span class="nowrap" :class="statusCls(row)" v-if="get(row, 'result', '') == SUBMISSION_RESULTS.NONE">
            <span>{{ getScoreDetail(row)}}</span>
          </span>
          <span v-else>
            <v-popover trigger="hover" placement="bottom-end" popover-class="tooltip--submit-status">
              <span class="nowrap" :class="statusCls(row)">
                <span>{{ getScoreDetail(row)}}</span>
              </span>
              <template slot="popover" class="tooltip-detail">
                <div>
                  <submit-status
                    :timestamp="get(row, 'submission_time', false) ? getDateTimeHhMmDdMmYyDash(get(row, 'submission_time')): null"
                    :scoreDetail="getScoreDetail(row)"
                    :result="get(row, 'result')"
                  ></submit-status>
                </div>
              </template>
            </v-popover>
          </span>
        </td>
      </template>

      <template v-slot:cell(type)="{row}">
        <td>{{ get(row, 'type', '') | exType2Txt }}</td>
      </template>

      <template v-slot:cell(action)="{row}">
        <td>
          <n-link
            class
            title="Chi tiết"
            :to="`/elearning/${$route.params.id}/study?lesson_id=${row.id}`"
          >
            <IconArrow height="13" />
          </n-link>
        </td>
      </template>

      <template v-slot:cell(type)="{row}">
        <td>
          <span class="nowrap">{{ get(row, 'type', '') | exType2Txt }}</span>
        </td>
      </template>

      <template v-slot:cell(created)="{row}">
        <td>{{ get(row, 'created', '') | moment("DD/MM/YYYY") }}</td>
      </template>
    </app-table>
    <!--End table-->
  </div>
</template>

<script>
import { get } from "lodash";
import IconArrow from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline";
import IconStar from "~/assets/svg/v2-icons/star_rate_18px.svg?inline";
import SubmitStatus from "~/components/page/elearning/mycourses/SubmitStatus";
import { subResult2Txt } from "~/plugins/filters";
import { SUBMISSION_RESULTS } from "~/utils/constants";
import { getDateTimeHhMmDdMmYyDash } from "~/plugins/filters";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    IconArrow,
    IconStar,
    SubmitStatus
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
        };
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
          text: "Tiêu đề bài kiểm tra"
        },
        {
          name: "type",
          text: "Thể loại"
        },
        {
          name: "open_time",
          text: "Ngày mở đề"
        },
        {
          name: "deadline",
          text: "Hạn nộp"
        },
        {
          name: "status",
          text: "Trạng thái"
        },
        {
          name: "action",
          text: ""
        }
      ],
      SUBMISSION_RESULTS: SUBMISSION_RESULTS
    };
  },

  computed: {
    ...mapGetters("auth", ["isTeacherRole", "isStudentRole"])
  },
  methods: {
    onPageChange(e) {
      this.$emit("changedPagination", e);
    },
    sortTable(info) {
      this.$emit("changedSort", info);
    },
    statusCls(item) {
      return {
        "text-primary": get(item, "result") === SUBMISSION_RESULTS.PASSED,
        "text-warning":
          get(item, "result") === SUBMISSION_RESULTS.PENDING ||
          get(item, "result") === SUBMISSION_RESULTS.NONE,
        "text-pink-2": get(item, "result") === SUBMISSION_RESULTS.FAILED
      };
    },
    hasScore(item) {
      return (
        get(item, "result") === SUBMISSION_RESULTS.PASSED ||
        get(item, "result") === SUBMISSION_RESULTS.FAILED
      );
    },
    getScoreDetail(item) {
      let desc = "";
      if (this.hasScore(item)) {
        desc = `(${get(item, "mark", 0)}/${get(
          item,
          "max_score",
          0
        )}) ${subResult2Txt(get(item, "result", 10))}`;
      } else {
        desc = `${subResult2Txt(get(item, "result"))}`;
      }
      return desc;
    },
    subResult2Txt,
    getDateTimeHhMmDdMmYyDash,
    get
  }
};
</script>

<style lang="scss">
</style>
