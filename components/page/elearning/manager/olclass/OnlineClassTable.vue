<template>
  <div>
    <app-table
        :loading="loading"
        :heads="heads"
        :pagination="pagination"
        @pagechange="onPageChange"
        @selectionChange="selectRow"
        @sort="handleSort"
        :data="data"
        multiple-selection
      >
        <template v-slot:cell(online_class_name)="{row}">
          <td>
            <n-link
              :to="'/elearning/manager/online-class/' + row.online_class_id + '/invites'"
              class="link"
            >{{row.online_class_name}}</n-link>
          </td>
        </template>
        <template v-slot:cell(start_time)="{row}">
          <td>
            <div style="white-space: nowrap">
              {{getLocalTimeHH_MM_A(row.start_time)}} - {{getLocalTimeHH_MM_A(row.end_time)}}
            </div>
            <div>
              {{getDateBirthDay(row.start_time)}}
            </div>
          </td>
        </template>
        
        <template v-slot:actions="{row}">
          <a class @click="openModal(row)" v-if="actions[0]">
            <IconSwapHorizontalCircle class="fill-primary mr-2"/>Vào phòng học
          </a>
          <n-link class="link" :to="'/elearning/manager/online-class/' + row.online_class_id + '/invites'"
            v-if="actions[1]">
            <IconEdit class="fill-primary mr-2" />Chỉnh sửa
          </n-link>
          <n-link :to="'/elearning/manager/online-class/' + row.online_class_id + '/invites'" class="link"
            v-if="actions[2]">
            <IconPeople class="fill-blue mr-2"/>Xem danh sách học sinh
          </n-link>
        </template>
      </app-table>

      <ModalJoinClass :id="rowClassId" v-if="modalShow" @close="modalShow = false" :info="modalData"/>
    </div>
</template>

<script>
import IconEdit from "~/assets/svg/v2-icons/edit_24px.svg?inline";
import IconPeople from '~/assets/svg/v2-icons/people_24px.svg?inline';
import IconSwapHorizontalCircle from '~/assets/svg/v2-icons/swap_horizontal_circle_24px.svg?inline';
import ModalJoinClass from "~/components/page/elearning/manager/olclass/ModalJoinClass";

import {
  getDateBirthDay,
  getLocalTimeHH_MM_A
} from "~/utils/moment";
import { get } from "lodash";

const STORE_NAMESPACE = "elearning/teaching/olclass";
const STORE_PUBLIC_SEARCH = "elearning/public/public-search";

export default {
  components: {
    IconEdit,
    IconPeople,
    IconSwapHorizontalCircle,
    ModalJoinClass
  },

  props: {
    actions: {
      type: Array,
      default: [0,0,1]
    },
    data: {
      type: Array,
      default: []
    },
    pagination: {
      type: Object,
      default: {}
    },
    loading: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      modalShow: false,
      modalData: {},
      heads: [
        {
          name: "online_class_name",
          text: "Phòng học",
          sort: true
        },
        {
          name: "elearning_name",
          text: "Thuộc khóa học",
          sort: true
        },
        {
          name: "start_time",
          text: "Thời gian",
          sort: true
        },
        {
          name: "num_student",
          text: "Số học sinh đã mời",
          sort: true
        }
      ],
    };
  },
  computed: {
  },

  methods: {
    getDateBirthDay,
    getLocalTimeHH_MM_A,

    handleSort(e) {
      this.$emit("sort", e);
    },

    onPageChange(e) {
      this.$emit("pagechange", e);
    },

    selectRow(e) {
      this.$emit("selectionChange", e);
    },

    openModal(row) {
      this.rowClassId = row.online_class_id;
      this.modalData = row;
      this.modalShow = true;
    },

    get
  },

  created() {
  }
};
</script>

<style lang="scss" scoped>
// @import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
.appended-col {
  p {
    max-width: 15rem;
  }
  .text-description {
    color: #999;
    font-size: 1.2rem;
    line-height: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>