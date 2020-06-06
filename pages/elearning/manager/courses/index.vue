<template>
  <div class="container elearning-courses">
    <breadcrumb />

    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <h5 class="page-title">Bài giảng và khóa học</h5>
        <div class="elearning-history__main">
          <div class="pl-4 pr-4">
            <div class="elearning-manager__tab">
              <div class="nav">
                <a @click="tab = 'APPROVED'" :class="tab == 'APPROVED' ? 'active' : ''">Đã đăng</a>
                <a @click="tab = 'PENDING'" :class="tab == 'PENDING' ? 'active' : ''">Đang soạn</a>
                <a
                  @click="tab = 'WAITING_FOR_APPROVE'"
                  :class="tab == 'WAITING_FOR_APPROVE' ? 'active' : ''"
                >Chờ duyệt</a>
                <a @click="tab = 'REJECTED'" :class="tab == 'REJECTED' ? 'active' : ''">Bị từ chối</a>
                <a @click="tab = null" :class="tab == null ? 'active' : ''">Danh sách ẩn</a>
              </div>
              <n-link
                :to="'/elearning/manager/courses/create'"
                class="btn btn--size-sm btn--color-primary btn--square btn-right"
              >
                <IconPlusCircle class="fill-white mr-2" />
                <span class="color-white">Tạo bài giảng - khóa học</span>
              </n-link>
            </div>
            <div class="d-flex-center">
              <div class="filter-form__item mb-15" style="max-width: 36rem; min-width: 30rem">
                <div style="width: 100%">
                  <app-search
                    class
                    :placeholder="'Nhập để tìm kiếm...'"
                    bordered
                    v-model="params.keyword"
                    :size="'sm'"
                    @submit="getList"
                    @keyup.enter.native="getList"
                  ></app-search>
                </div>
              </div>

              <div class="filter-form__item">
                <app-button :color="showFilter ? 'primary' : 'white'" square :size="'sm'" @click="toggleFilter">
                  <IconHamberger :class="showFilter ? 'fill-white' : 'fill-primary'" class="mr-2" />
                  <span>Lọc kết quả</span>
                </app-button>
              </div>

              <div class="d-flex-center ml-3" v-if="showFilter">
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectType"
                    label="text"
                    placeholder="Thể loại"
                     @input="handleChangedType"
                    :options="typeOpts"
                    :all-opt="allOpt"
                    has-border
                  ></app-vue-select>
                </div>
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectPrivacy"
                    label="text"
                    placeholder="Hiển thị"
                    @input="handleChangedPrivacy"
                    :options="privacyOpts"
                    :all-opt="allOpt"
                    has-border
                  ></app-vue-select>
                </div>
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectFree"
                    label="text"
                    placeholder="Học phí"
                    @input="handleChangedFree"
                    :options="freeOpts"
                    :all-opt="allOpt"
                    has-border
                  ></app-vue-select>
                </div>
              </div>
            </div>
            
            <app-button
              square
              size="sm"
              normal
              color="blue"
              class="mb-4"
              @click="hideRows(true)"
              v-if="tab == null"
              :disabled="ids.length == 0"
            >
              <IconRestore height="15" width="15" class="fill-white mr-2" />Khôi phục
            </app-button>
            <app-button
              color="pink"
              square
              size="sm"
              normal
              class="mb-4"
              @click="hideRows(false)"
              v-else-if="tab == 'APPROVED'"
              :disabled="ids.length == 0"
            >
              <IconRemove height="15" width="15" class="fill-white mr-2" />Đưa vào danh sách ẩn
            </app-button>
            <app-button
              color="pink"
              square
              size="sm"
              normal
              class="mb-4"
              @click="deleteRows()"
              v-else
              :disabled="ids.length == 0"
            >
              <IconRemove height="15" width="15" class="fill-white mr-2" />Xóa khỏi danh sách
            </app-button>
          </div>

          <!--Table-->
          <app-table
            :loading="loading"
            :heads="currentHeads"
            :pagination="pagination"
            @pagechange="onPageChange"
            @selectionChange="selectRow"
            :data="elearningList"
            multiple-selection
            v-if="showTable"
          >
            <template v-slot:cell(privacy)="{ row }">
              <td>
                <span v-if="row.privacy == 'PUBLIC'" class="color-primary">Công khai</span>
                <span v-else class="color-red">Riêng tư</span>
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
                <span v-else>Trả phí</span>
              </td>
            </template>
            <template v-slot:cell(publish_date)="{ row }">
              <td>{{getDateBirthDay(row.publish_date)}}</td>
            </template>
            <template v-slot:cell(start_time)="{ row }">
              <td>{{row.start_time ? getDateBirthDay(row.start_time) : getDateBirthDay(row.publish_date)}}</td>
            </template>
            <template v-slot:cell(end_time)="{ row }">
              <td>{{row.end_time ? getDateBirthDay(row.end_time) : 'Không thời hạn'}}</td>
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
          <!--End table-->
        </div>
      </div>
    </div>

    <ModalElearningPreview
      :previewData="previewInfo"
      v-if="showPreview"
      @close="showPreview = false"
    />

    <ModalInviteStudent @close="closeModalInvite" v-if="openModalInvite"/>

    <app-modal-confirm
      v-if="showModalConfirmHide"
      :confirmLoading="confirmLoading"
      @ok="handleHideRows"
      :width="550"
      @cancel="showModalConfirmHide = false"
      :footer="false"
      :header="false"
      :title="titleModelConfirm"
      :description="textModelConfirm"
    />

     <app-modal-notify
      :width="550"
      @ok="noteReject = ''"
      @close="noteReject = ''"
      v-if="noteReject"
      :footer="false"
      title="Lý do bị từ chối"
      :description="noteReject"
    >
    </app-modal-notify>
  </div>
</template>

<script>
import ModalInviteStudent from "~/components/page/elearning/manager/olclass/ModalInviteStudent"
import ModalElearningPreview from "~/components/page/elearning/ModalElearningPreview";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconTick from "~/assets/svg/icons/tick.svg?inline";
import IconRemove from "~/assets/svg/v2-icons/remove_circle_outline_24px.svg?inline";
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";
import IconEye from "~/assets/svg/v2-icons/remove_red_eye_24px.svg?inline";
import IconPeople from "~/assets/svg/v2-icons/people_24px.svg?inline";
import IconRestore from "~/assets/svg/v2-icons/restore_24px.svg?inline";
import IconTimesCircle from "~/assets/svg/design-icons/times-circle.svg?inline";
import IconMessage from "~/assets/svg/v2-icons/message_24px.svg?inline";
import IconNote from "~/assets/svg/icons/note-alt.svg?inline";
import IconEdit from "~/assets/svg/icons/edit.svg?inline";
import IconTrashAlt from '~/assets/svg/icons/trash-alt.svg?inline';

import {
  getDateBirthDay
} from "~/utils/moment";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/elearning";
const STORE_NAMESPACE_STATISTIC = "elearning/teaching/statistic";

export default {
  name: "ManageCourse",

  layout: "manage",
  
  components: {
    IconTrashAlt,
    ModalInviteStudent,
    ModalElearningPreview,
    ElearningManagerSide,
    IconTimesCircle,
    IconSearch,
    IconMessage,
    IconTrashAlt,
    IconFilter,
    IconTick,
    IconHamberger,
    IconPlusCircle,
    IconRemove,
    IconNote,
    IconEdit,
    IconEye,
    IconPeople,
    IconRestore
  },

  data() {
    return {
      loaded: false,
      noteReject: '',
      allOpt: {
        value: null,
        text: 'Tất cả'
      },
      showTable: true,
      titleModelConfirm: '',
      textModelConfirm: '',
      showModalConfirmHide: false,
      confirmLoading: false,
      openModalInvite: false,
      loading: false,
      tab: "APPROVED",
      showFilter: false,
      showPreview: false,
      previewInfo: {},
      ids: [],
      heads: [
        {
          name: "",
          text: "",
          selectAll: true
        },
        {
          name: "name",
          text: "Bài giảng và khóa học",
          sort: true
        },
        {
          name: "price",
          text: "Học phí",
        },
        {
          name: "privacy",
          text: "Hiển thị"
        },
        {
          name: "start_time",
          text: "Ngày bắt đầu",
          sort: true
        },
        {
          name: "end_time",
          text: "Ngày kết thúc",
          sort: true
        }
      ],
      heads2: [
        {
          name: "",
          text: "",
          selectAll: true
        },
        {
          name: "name",
          text: "Bài giảng và khóa học",
          sort: true
        },
        {
          name: "price",
          text: "Học phí",
          sort: true
        },
        {
          name: "privacy",
          text: "Hiển thị"
        },
        {
          name: "publish_date",
          text: "Ngày tạo",
          sort: true
        }
      ],
      heads3: [
        {
          name: "",
          text: "",
          selectAll: true
        },
        {
          name: "name",
          text: "Bài giảng và khóa học",
          sort: true
        },
        {
          name: "price",
          text: "Học phí",
          sort: true
        },
        {
          name: "privacy",
          text: "Hiển thị"
        },
        {
          name: "publish_date",
          text: "Ngày tạo",
          sort: true
        },
        {
          name: "participants",
          text: "Học sinh tham gia",
          sort: true
        }
      ],
      currentHeads: [],
      pagination: {
        total_pages: 0,
        number: 0,
        size: 10,
        total_elements: 0,
        first: 0,
        last: 0
      },
      isTeacher: true,
      time1: null,
      time2: null,
      selectType: null,
      types: [
        { value: "COURSE", text: "Khóa học" },
        { value: "LECTURE", text: "Bài giảng" }
      ],
      selectPrivacy: null,
      privacies: [
        { value: "PUBLIC", text: "Công khai" },
        { value: "PRIVATE", text: "Riêng tư" }
      ],
      selectFree: null,
      free: [
        { value: true, text: "Miễn phí" },
        { value: false, text: "Có phí" }
      ],
      teacher: {
        id: "1",
        name: "Savannah Mckinney",
        avatar: "https://picsum.photos/125/125"
      },
      elearningList: [],
      params: {
        page: 1,
        limit: 10,
        sorted: 'DESC'
      }
    };
  },

  fetch({ params, query, store }) {
    Promise.all([
     store.dispatch(`${STORE_NAMESPACE_STATISTIC}/${actionTypes.TEACHING_ELEARNING_STATISTIC.LIST}`)
    ]);
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateElearnings: "elearnings"
    }),
    ...mapState(STORE_NAMESPACE_STATISTIC, {
      stateStatistic: "teacherStatistic"
    }),
    typeOpts() {
      return [this.allOpt, ...this.types]
    },
    freeOpts() {
      return [this.allOpt, ...this.free]
    },
    privacyOpts() {
      return [this.allOpt, ...this.privacies]
    },
  },

  watch: {
    tab(newValue, oldValue) {
      this.showTable = false;
      this.ids.length = 0;
      this.params.hide = newValue == "";
      switch (newValue) {
        case "REJECTED":
        case "PENDING":
        case "WAITING_FOR_APPROVE":
          this.currentHeads = [...this.heads2];
          break;
        case "APPROVED":
          this.currentHeads = [...this.heads];
          break;
        case null:
          this.currentHeads = [...this.heads3];
          break;
        default:
          this.currentHeads = [...this.heads2];
          break;
      }
      this.showTable = true;
      this.getList();
    },
    selectPrivacy: {
      handler: function (newValue, oldValue) {
        this.getList();
      },
      deep: true
    },
    selectFree: {
      handler: function (newValue, oldValue) {
        this.getList();
      },
      deep: true
    },
    selectType: {
      handler: function (newValue, oldValue) {
        this.getList();
      },
      deep: true
    },
  },

  methods: {
    getDateBirthDay,

    showReject(row) {
      this.noteReject = row.note;
    },

    closeModalInvite(e) {
      this.openModal = false;
      if (e) ;
    },
    toggleFilter() {
      if (this.showFilter) {
        this.selectType = null;
        this.selectPrivacy = null;
        this.selectFree = null;
        this.params = {...this.params,
          type: null,
          privacy: null,
          free: null,
        }
        this.getList();
      }
      this.showFilter = !this.showFilter;
    },

    preview(row) {
      this.previewInfo = row;
      this.showPreview = true;
    },

    handleChangedType() {
      this.params.type = this.selectType.value;
    },
    handleChangedFree() {
      this.params.free = this.selectFree.value;
    },
    handleChangedPrivacy() {
      this.params.privacy = this.selectPrivacy.value;
    },

    handleEditElearning(elearning) {
      this.$router.history.push(
        `/elearning/manager/courses/create?elearning_id=${elearning.id}`
      );
    },
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      that.params.limit = that.pagination.size;
      that.params.page = that.pagination.number + 1;
      that.getList();
    },

    selectRow(data) {
      this.ids = data.map((row, index, data) => {
        return row.id;
      });
    },

    async getList() {
      try {
        this.loading = true;
        let params = { ...this.params };
        params.status = this.tab;
        params.hide = this.tab == null;

        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.LIST}`,
          params
        );
        this.elearningList = this.get(this.stateElearnings, "data.content", []);
        this.pagination.size = this.get(
          this.stateElearnings,
          "data.page.size",
          10
        );
        this.pagination.first = this.get(
          this.stateElearnings,
          "data.page.first",
          1
        );
        this.pagination.last = this.get(
          this.stateElearnings,
          "data.page.last",
          1
        );
        this.pagination.number = this.get(
          this.stateElearnings,
          "data.page.number",
          0
        );
        this.pagination.total_pages = this.get(
          this.stateElearnings,
          "data.page.total_pages",
          0
        );
        this.pagination.total_elements = this.get(
          this.stateElearnings,
          "data.page.total_elements",
          0
        );
        this.pagination.number_of_elements = this.get(
          this.stateElearnings,
          "data.page.number_of_elements",
          0
        );
      } catch (e) {
      } finally {
        this.ids.length = 0;
        this.loading = false;
        this.loaded = true;
      }
    },

    deleteRows(id) {
      if (this.ids.length == 0 && id == '') return;
      this.titleModelConfirm = "Bạn muốn xóa bài giảng/khóa học này?";
      this.textModelConfirm = "Các thông tin bài giảng/khóa học sẽ không thể khôi phục.";
      this.showModalConfirmHide = true;
      this.idDelete = id ? id : '';
    },
    
    async handleDeleteRows() {
      let ids = this.idDelete ? { ids: [this.idDelete] } : { ids: [...this.ids] };
      const doDelete = await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.DELETE}`,
        JSON.stringify(ids)
      );

      if (doDelete.success) {
        this.ids = [];
        this.showModalConfirmHide = false;
        this.getList();
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    hideRows(status) {
      if (this.ids.length == 0) return;
      this.titleModelConfirm = status ? 
      "Bạn muốn khôi phục bài giảng/khóa học này?" : "Bạn muốn ẩn bài giảng/khóa học này?";
      this.textModelConfirm = status ? 
      "Các thông tin bài giảng/khóa học sẽ được hiển thị lại.":
      "Các thông tin bài giảng/khóa học sẽ không được hiển thị.";
      this.showModalConfirmHide = true;
      this.statusHide = status;
    },

    async handleHideRows() {
      if( this.tab != 'APPROVED' && this.tab != null ) {
        this.handleDeleteRows();
      } else {
        let params = {
          hide: !this.statusHide,
          ids: [...this.ids]
        };
        const doRestore = await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.HIDE}`,
          params
        );

        if (doRestore.success) {
          this.ids = [];
          this.showModalConfirmHide = false;
          this.getList();
        } else {
          this.$toasted.error(doRestore.message);
        } 
      }
    },

    get
  },

  beforeMount() {
    this.currentHeads = [...this.heads];
  },

  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/_elearning-filter-form.scss";
@import "~/assets/scss/components/elearning/_elearning-history.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";
</style>
