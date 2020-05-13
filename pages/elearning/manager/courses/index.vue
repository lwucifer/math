<template>
  <div class="container">
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
              <div class="filter-form__item flex-1" style="max-width: 36rem">
                <div style="width: 100%">
                  <app-search
                    class
                    :placeholder="'Nhập để tìm kiếm...'"
                    v-model="params.keyword"
                    :size="'sm'"
                  ></app-search>
                </div>
              </div>

              <div class="filter-form__item">
                <app-button color="white" square :size="'sm'" @click="getList">
                  <IconHamberger class="fill-primary mr-2" />
                  <span class="color-primary">Lọc kết quả</span>
                </app-button>
              </div>

              <div class="d-flex-center">
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectType"
                    :options="types"
                    label="text"
                    placeholder="Thể loại"
                    searchable
                    clearable
                    @input="handleChangedType"
                  ></app-vue-select>
                </div>
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectPrivacy"
                    :options="privacies"
                    label="text"
                    placeholder="Hiển thị"
                    searchable
                    clearable
                    @input="handleChangedPrivacy"
                  ></app-vue-select>
                </div>
                <div class="filter-form__item">
                  <app-vue-select
                    style="width: 11rem"
                    class="app-vue-select filter-form__item__selection"
                    v-model="selectFree"
                    :options="free"
                    label="text"
                    placeholder="Học phí"
                    searchable
                    clearable
                    @input="handleChangedFree"
                  ></app-vue-select>
                </div>
              </div>
            </div>
            <app-button
              square
              size="sm"
              normal
              class="mb-4 btn-color-blue"
              @click="hideRows(true)"
              v-if="tab == null"
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
              v-else
            >
              <IconRemove height="15" width="15" class="fill-white mr-2" />Đưa vào danh sách ẩn
            </app-button>
          </div>

          <!--Table-->
          <app-table
            :heads="currentHeads"
            :pagination="pagination"
            @pagechange="onPageChange"
            @selectionChange="selectRow"
            :data="elearningList"
            multiple-selection
          >
            <!-- <template v-slot:cell(name)="{ row }">
              <td>
                <div class="table-avatar">
                  <div class="left">
                    <img
                      :src="row.avatar.high"
                      alt
                      @click="handleEditElearning(row)"
                      style="cursor:pointer"
                    />
                  </div>
                  <div class="right">
                    <h6 class="mb-2">{{ row.name }}</h6>
                    <p>{{ row.subject }}</p>
                  </div>
                </div>
              </td>
            </template>-->
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
                <span v-if="row.price > 0">{{ row.price }}Đ</span>
                <span v-else>Miễn phí</span>
              </td>
            </template>
            <template v-slot:cell(created)="{ row }">
              <td>{{convertDate(row.created)}}</td>
            </template>

            <template v-slot:actions="{row}">
              <n-link
                :to="'/elearning/' + row.id"
                class="link"
                v-if="tab == 'APPROVED' || tab == null"
              >
                <IconNote class="fill-primary mr-2" />Xem chi tiết
              </n-link>
              <n-link :to="'/elearning/' + row.id + ''" class="link">
                <IconEdit class="fill-purple mr-2" />Chỉnh sửa
              </n-link>

              <button @click="preview(row)">
                <IconEye class="fill-blue mr-2" />Xem preview
              </button>

              <n-link :to="'/elearning/' + row.id" class="link" v-if="tab == 'REJECTED'">
                <IconMessage class="fill-yellow mr-2" />Xem lý do từ chối
              </n-link>

              <n-link
                :to="`/elearning/manager/courses/students?elearning_id=${row.id}`"
                class="link"
                v-if="tab == 'APPROVED' || tab == null"
              >
                <IconPeople class="fill-yellow mr-2" />Xem danh sách học sinh
              </n-link>
              <button
                @click="deleteRows(row.id)"
                v-if="tab == 'WAITING_FOR_APPROVE' || tab == 'REJECTED'"
              >
                <IconTimesCircle class="fill-secondary mr-2" />Xóa
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
  </div>
</template>

<script>
import ModalElearningPreview from "~/components/page/elearning/ModalElearningPreview";
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconTick from "~/assets/svg/icons/tick.svg?inline";
import IconRemove from "~/assets/svg/v2-icons/remove_circle_outline_24px.svg?inline";
import IconHamberger from "~/assets/svg/icons/hamberger.svg?inline";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";
import IconNote from "~/assets/svg/v2-icons/note_24px.svg?inline";
import IconEdit from "~/assets/svg/v2-icons/edit_24px.svg?inline";
import IconEye from "~/assets/svg/v2-icons/remove_red_eye_24px.svg?inline";
import IconPeople from "~/assets/svg/v2-icons/people_24px.svg?inline";
import IconRestore from "~/assets/svg/v2-icons/restore_24px.svg?inline";
import IconTimesCircle from "~/assets/svg/design-icons/times-circle.svg?inline";
import IconMessage from "~/assets/svg/v2-icons/message_24px.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/elearning";

export default {
  layout: "manage",
  name: "ManageCourse",

  components: {
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
      tab: "APPROVED",
      showPreview: false,
      previewInfo: {},
      ids: [],
      heads: [
        -{
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
          name: "created",
          text: "Ngày đăng",
          sort: true
        },
        {
          name: "participants",
          text: "Học sinh tham gia",
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
          name: "hide",
          text: "Hiển thị"
        },
        {
          name: "created",
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
          name: "hide",
          text: "Hiển thị"
        },
        {
          name: "created",
          text: "Ngày tạo",
          sort: true
        },
        {
          name: "content",
          text: "Lý do bị từ chối"
        }
      ],
      currentHeads: [],
      pagination: {
        total: 0,
        number: 0,
        size: 10,
        totalElements: 0,
        first: 0,
        last: 0
      },
      isTeacher: true,
      time1: null,
      time2: null,
      selectType: null,
      types: [
        { value: null, text: "Tất cả" },
        { value: "COURSE", text: "Khóa học" },
        { value: "LECTURE", text: "Bài giảng" }
      ],
      selectPrivacy: null,
      privacies: [
        { value: null, text: "Tất cả" },
        { value: "PUBLIC", text: "Công khai" },
        { value: "PRIVATE", text: "Riêng tư" }
      ],
      selectFree: null,
      free: [
        { value: null, text: "Tất cả" },
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
        limit: 10
        // free: null,
        // privacy: null,
        // type: null,
        // keyword: null
      }
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateElearnings: "elearnings"
    })
  },

  watch: {
    tab(newValue, oldValue) {
      this.ids = [];
      this.params.hide = newValue == "";
      switch (newValue) {
        case "PENDING":
        case "WAITING_FOR_APPROVE":
          this.currentHeads = [...this.heads2];
          break;
        case null:
        case "APPROVED":
          this.currentHeads = [...this.heads];
          break;
        case "REJECTED":
          this.currentHeads = [...this.heads3];
          break;
        default:
          this.currentHeads = [...this.heads];
          break;
      }
      this.getList();
    }
  },

  methods: {
    preview(row) {
      this.previewInfo = row;
      this.showPreview = true;
    },
    convertDate(time) {
      const date = new Date(time);
      var strTime =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return strTime;
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
        this.pagination.totalPages = this.get(
          this.stateElearnings,
          "data.page.total_pages",
          0
        );
        this.pagination.totalElements = this.get(
          this.stateElearnings,
          "data.page.total_elements",
          0
        );
        this.pagination.numberOfElements = this.get(
          this.stateElearnings,
          "data.page.number_of_elements",
          0
        );
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },

    async deleteRows(id) {
      let ids = id ? { ids: [id] } : { ids: [...this.ids] };
      const doDelete = await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.DELETE}`,
        JSON.stringify(ids)
      );

      if (doDelete.success) {
        this.ids = [];
        this.getList();
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    async hideRows(status) {
      let params = {
        hide: !status,
        ids: [...this.ids]
      };
      const doRestore = await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.HIDE}`,
        params
      );

      if (doRestore.success) {
        this.ids = [];
        this.getList();
      } else {
        this.$toasted.error(doRestore.message);
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

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-history.scss";
@import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";

.table-avatar {
  display: flex;
  .left {
    width: 10rem;
    margin-right: 1rem;
    img {
      width: 100%;
      height: auto;
    }
  }
}
.btn-color-blue {
  background-color: #1481fe;
}
</style>
