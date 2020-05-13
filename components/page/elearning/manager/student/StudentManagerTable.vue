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
          <n-link class title="Chi tiết" :to="`/elearning/manager/students/${row.student_id}`">
            <IconArrow height="13" />
          </n-link>
        </td>
      </template>

      <template v-slot:cell(confirm)>
        <td style="width:32%;">
          <app-button square size="sm" color="transparent">
            <IconCheckGreen class="icon mr-2" />Xác nhận
          </app-button>
          <app-button square size="sm" color="transparent" class="text-secondary">
            <IconClear24px class="icon mr-2" />Từ chối
          </app-button>
        </td>
      </template>

      <template v-slot:cell(name)="{row}">
        <td style="width:30%">{{ get(row, 'name', '') }}</td>
      </template>
      <template v-slot:cell(class)="{row}">
        <td style="width:30%">{{ get(row, 'class_name', '') }}</td>
      </template>
      <template v-slot:cell(date)="{row}">
        <td style="width:25%">{{ get(row, 'submission', '') | moment("DD/MM/YYYY") }}</td>
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
          totalElements: 0,
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

  computed: {},
  methods: {
    onPageChange(e) {
      this.$emit("changedPagination", e);
    },
    get
  }
};
</script>

<style lang="scss">
</style>