<template>
  <div>
    <app-table
            :loading="loading"
            :heads="currentHeads"
            :pagination="pagination"
            @pagechange="onPageChange"
            @selectionChange="selectRow"
            @sort="handleSort"
            :data="elearningList"
            multiple-selection
            v-if="showTable"
          >
            <template v-slot:cell(privacy)="{ row }">
              <td>
                <span v-if="row.privacy == 'PUBLIC'" class="color-primary">Công khai</span>
                <span v-if="row.privacy == 'PRIVATE'" class="color-red">Riêng tư</span>
              </td>
            </template>
            <template v-slot:cell(price)="{ row }">
              <td>{{ row.price.original_price }}</td>
            </template>
            <template v-slot:cell(vote)="{ row }">
              <td>
                <strong>{{ row.vote.average_rate }}</strong>
                <span>({{ row.vote.average_rate }})</span>
              </td>
            </template>
            <template v-slot:cell(price)="{ row }">
              <td>
                <span v-if="row.pricefree || row.price.original_price == 0">Miễn phí</span>
                <span v-if="!row.pricefree && row.price.original_price > 0" class="color-blue">
                  {{numeral(row.price.original_price).format()}}đ
                </span>
              </td>
            </template>
            <template v-slot:cell(publish_date)="{ row }">
              <td>{{getDateBirthDayUTC(row.publish_date)}}</td>
            </template>
            <template v-slot:cell(start_time)="{ row }">
              <td>{{row.start_time ? getDateBirthDayUTC(row.start_time) : getDateBirthDayUTC(row.publish_date)}}</td>
            </template>
            <template v-slot:cell(end_time)="{ row }">
              <td>{{row.end_time ? getDateBirthDayUTC(row.end_time) : 'Không thời hạn'}}</td>
            </template>
            
            <!-- <template v-slot:cell(participants)="{ row }">
              <td>
                <span v-if="row.participants > 0">{{row.participants}}</span>
                <button @click="preview(row)" v-if="row.participants == 0">
                  Mời thêm học sinh
                </button>
              </td>
            </template> -->

            <template v-slot:actions="{row}">
              <button @click="preview(row)" v-if="tab == 'APPROVED' || tab == null">
                <IconNote height='18' width='18' class="fill-primary mr-2" />Xem chi tiết
              </button>
              <n-link :to="'/elearning/manager/courses/create/?elearning_id=' + row.id + ''" class="link">
                <IconEdit class="fill-purple mr-2" height='16' width='16'/>Chỉnh sửa
              </n-link>

              <button @click="preview(row)">
                <IconEye class="fill-blue mr-2"  height='16' width='16'/>Xem preview
              </button>

              <button @click="showReject(row)" v-if="tab == 'REJECTED'">
                 <IconMessage height='16' width='16' class="fill-yellow mr-2" />Xem lý do từ chối
              </button>

              <n-link
                :to="`/elearning/manager/courses/students?elearning_id=${row.id}`"
                class="link"
                v-if="tab == 'APPROVED' || tab == null"
              >
                <IconPeople class="fill-yellow mr-2" />Xem danh sách học sinh
              </n-link>
              <button
                @click="deleteRows(row.id)"
                v-if="tab == 'WAITING_FOR_APPROVE' || tab == 'REJECTED' || tab == 'PENDING'"
              >
                <IconTrashAlt class="fill-secondary mr-2" />Xóa
              </button>
            </template>
          </app-table>

      <ModalJoinClass :id="rowClassId" v-if="modalShow && actions[0]" @close="modalShow = false" :info="modalData"/>
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