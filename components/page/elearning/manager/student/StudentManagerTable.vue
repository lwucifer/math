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
            :to="`/elearning/manager/courses/students/${row.student_id}?elearning_id=${filterElearningId}`"
          >
            <IconArrow height="13" />
          </n-link>
        </td>
      </template>

      <template v-slot:cell(confirm)="{row}">
        <td style="width:40%;">
          <app-button square size="sm" color="transparent" @click="acceptStudent(row.student_id)">
            <IconCheckGreen class="icon mr-2" />Xác nhận
          </app-button>
          <app-button
            square
            size="sm"
            color="transparent"
            class="text-secondary"
            @click="rejectStudent(row.student_id)"
          >
            <IconClear24px class="icon mr-2" />Từ chối
          </app-button>
        </td>
      </template>

      <template v-slot:cell(name)="{row}">
        <td style="width:30%">{{ get(row, 'student_name', '') }}</td>
      </template>
      <template v-slot:cell(class)="{row}">
        <td style="width:10%">{{ get(row, 'class_name', '') }}</td>
      </template>
      <template v-slot:cell(date)="{row}">
        <td style="width:25%">{{ get(row, 'join_date', '') | moment("DD/MM/YYYY") }}</td>
      </template>
      <template v-slot:cell(question)="{row}">
        <td style="width:25%">{{ get(row, 'questions', '') }}</td>
      </template>
      <template v-slot:cell(question)="{row}">
        <td style="width:25%">{{ get(row, 'questions', '') }}</td>
      </template>
      <template v-slot:cell(request_date)="{row}">
        <td style="width:25%">{{ get(row, 'request_date', '') | moment("DD/MM/YYYY") }}</td>
      </template>
      <template v-slot:cell(progress)="{row}">
        <td>
          <span class="text-primary" v-if="row.progress > 50">{{ get(row, 'progress', '') }} %</span>
          <span
            class="text-secondary"
            v-else-if="row.progress < 50"
          >{{ get(row, 'progress', '') }} %</span>
          <span class="text-warning" v-else-if="row.progress = 50">{{ get(row, 'progress', '') }} %</span>
        </td>
      </template>
    </app-table>
    <!--End table-->
  </div>
</template>

<script>
import { get } from "lodash";
import IconArrow from "~/assets/svg/v2-icons/arrow_forward_ios_24px.svg?inline";
import RateStatus from "~/components/page/elearning/manager/exam/RateStatus";
import { ELEARNING_TYPES } from "~/utils/constants";
import IconClear24px from "~/assets/svg/v2-icons/clear_24px.svg?inline";
import IconCheckGreen from "~/assets/svg/v2-icons/check_green.svg?inline";
import { mapState, mapActions } from "vuex";
const STORE_TEACHING_ACCEPT = "elearning/teaching/accept";
const STORE_TEACHING_REQUEST = "elearning/teaching/request";
export default {
  components: {
    IconArrow,
    IconClear24px,
    IconCheckGreen,
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
        };
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
        [ELEARNING_TYPES.COURSE]: "Khóa học",
        [ELEARNING_TYPES.LECTURE]: "Bài giảng"
      };
      if (MATCHED_DATA.hasOwnProperty(val)) return MATCHED_DATA[val];
      return "-";
    }
  },

  data() {
    return {};
  },

  computed: {
    filterElearningId() {
      return this.$route.query && this.$route.query.elearning_id
        ? this.$route.query.elearning_id
        : "";
    }
  },
  methods: {
    ...mapActions(STORE_TEACHING_ACCEPT, ["teachingElearningAccept"]),
    ...mapActions(STORE_TEACHING_REQUEST, ["teachingElearningRequestsList"]),
    get,
    onPageChange(e) {
      this.$emit("changedPagination", e);
    },
    acceptStudent(_id) {
      const data = {
        elearning_id: this.filterElearningId,
        student_id: _id,
        accept: true
      };
      this.teachingElearningAccept(data).then(result => {
        if (result && result.success == true) {
          this.teachingElearningRequestsList({
            params: {
              elearning_id: this.filterElearningId
            }
          });
        }
      });
    },
    rejectStudent(_id) {
      const data = {
        elearning_id: this.filterElearningId,
        student_id: _id,
        accept: false
      };
      this.teachingElearningAccept(data).then(result => {
        if (result && result.success == true) {
          this.teachingElearningRequestsList({
            params: {
              elearning_id: this.filterElearningId
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>