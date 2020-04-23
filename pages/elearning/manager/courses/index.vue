<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <div class="elearning-history__main">
          <div class="pl-4 pr-4">
            <h5 class="color-primary mb-3">Bài giảng và khóa học</h5>
            <div class="elearning-manager__tab">
              <a @click="tab = 'APPROVED'" :class="tab == 'APPROVED' ? 'active' : ''">Đã đăng</a>
              <a @click="tab = 'PENDING'" :class="tab == 'PENDING' ? 'active' : ''">Đang soạn</a>
              <a @click="tab = 'WAITING_FOR_APPROVE'" :class="tab == 'WAITING_FOR_APPROVE' ? 'active' : ''">Chờ duyệt</a>
              <a @click="tab = 'REJECTED'" :class="tab == 'REJECTED' ? 'active' : ''">Bị từ chối</a>
              <a @click="tab = ''" :class="tab == '' ? 'active' : ''">Danh sách ẩn</a>
            </div>
            <div class="elearning-manager__serch">
              <app-button rounded size="sm" class="mr-4" normal @click="getList">
                <IconFilter />Lọc kết quả
              </app-button>
              <app-select :options="free" v-model="params.free" size="sm" />
              <app-select :options="types" v-model="params.type" size="sm" />
              <app-select :options="privacies" v-model="params.privacy" size="sm" />
              <app-input class="mb-0" size="sm" placeholder="Nhập để tìm kiếm..." v-model="params.keyword">
                <a class="d-flex" slot="unit">
                  <IconSearch width="17" height="17" />
                </a>
              </app-input>
            </div>
            <app-button square size="sm" normal class="mb-4 btn-color-blue" @click="restoreRows" v-if="tab == ''">
              <IconTrashAlt height="15" width="15" class="fill-white mr-2" />Khôi phục
            </app-button>
            <app-button color="secondary" square size="sm" normal class="mb-4" @click="deleteRows" v-else>
              <IconTrashAlt height="15" width="15" class="fill-white mr-2" />Xoá khỏi danh sách
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
              <template v-slot:cell(name)="{row}">
                <td>
                  <div class="table-avatar">
                    <div class="left">
                      <img :src="row.avatar.high" alt="">
                    </div>
                    <div class="right">
                      <h6 class="mb-2">{{row.name}}</h6>
                      <p>{{row.subject}}</p>
                    </div>
                  </div>
                </td>
              </template>
              <template v-slot:cell(hide)="{row}">
                <td>
                  <span v-if="row.hide" class="color-red">Riêng tư</span>
                  <span v-else class="color-primary">Công khai</span>
                </td>
              </template>
              <template v-slot:cell(price)="{row}">
                <td>
                  {{row.price.original_price}}
                </td>
              </template>
              <template v-slot:cell(vote)="{row}">
                <td>
                  <strong>{{row.vote.average_rate}}</strong>
                  <span>({{row.vote.average_rate}})</span>
                </td>
              </template>
              <template v-slot:cell(price)="{row}">
                <td>
                  <span v-if="row.price > 0">{{row.price}}Đ</span>
                  <span v-else>Miễn phí</span>
                </td>
              </template>
              <template v-slot:cell(participants)="{row}">
                <td>
                  <span v-if="row.participants > 0">{{row.participants}}</span>
                  <n-link v-else to>Thêm học sinh</n-link>
                </td>
              </template>
            </app-table>
          <!--End table-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconTick from "~/assets/svg/icons/tick.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { useEffect } from "~/utils/common";

const STORE_NAMESPACE = "elearning/teaching/elearning";

export default {
  layout: "manage",
  name: "E-learning",

  components: {
    ElearningManagerSide,
    IconSearch,
    IconTrashAlt,
    IconFilter,
    IconTick
  },

  data() {
    return {
      tab: 'APPROVED',
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
          sort: true
        },
        {
          name: "hide",
          text: "Hiển thị"
        },
        {
          name: "created",
          text: "Ngày đăng",
          sort: true
        },
        {
          name: "views",
          text: "Lượt xem",
          sort: true
        },
        {
          name: "participants",
          text: "Số học sinh<br>tham gia",
          sort: true
        },
        {
          name: "vote",
          text: "Đánh giá",
          sort: true
        },
        // {
        //   name: "content",
        //   text: "Lý do bị từ chối"
        // }
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
          text: "Ngày đăng",
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
          text: "Ngày đăng",
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
        { value: null, text: "Theo loại" },
        { value: "COURSE", text: "Khóa học" },
        { value: "LECTURE", text: "Bài giảng" }
      ],
      selectPrivacy: null,
      privacies: [
        { value: null, text: "Theo hiển thị" },
        { value: "PUBLIC", text: "Công khai" },
        { value: "PRIVATE", text: "Riêng tư" }
      ],
      selectFree: null,
      free: [
        { value: null, text: "Theo học phí" },
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
        free: null,
        privacy: null,
        type: null,
        keyword: null
      },
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState(STORE_NAMESPACE, {
      stateElearnings: "elearnings"
    }),
  },

  watch: {
    tab(newValue, oldValue) {
      this.ids = [];
      this.params.hide = newValue == '';
      switch (newValue) {
        case 'PENDING':
        case 'WAITING_FOR_APPROVE':
          this.currentHeads = [...this.heads2]
          break;
        case 'APPROVED':
          this.currentHeads = [...this.heads]
          break;
        case '':
        case 'REJECTED':
          this.currentHeads = [...this.heads3]
          break;
        default:
          this.currentHeads = [...this.heads]
          break;
      }
      this.getList();
    }
  },

  methods: {
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
        await this.$store.dispatch(
          `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.LIST}`,
            params
        );
        this.elearningList = this.get(this.stateElearnings, "data.content", []);
        this.pagination.size = this.get(this.stateElearnings, "data.page.size", 10);
        this.pagination.first = this.get(this.stateElearnings, "data.page.first", 1);
        this.pagination.last = this.get(this.stateElearnings, "data.page.last", 1);
        this.pagination.number = this.get(this.stateElearnings, "data.page.number", 0);
        this.pagination.totalPages = this.get(this.stateElearnings, "data.page.total_pages", 0);
        this.pagination.totalElements = this.get(this.stateElearnings, "data.page.total_elements", 0);
        this.pagination.numberOfElements = this.get(this.stateElearnings, "data.page.number_of_elements", 0);
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },

     async deleteRows() {
      let ids = { ids: [...this.ids] };
      const doDelete = await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.DELETE}`,
        JSON.stringify(ids)
      );

      if (doDelete.success) {
        this.getList();
      } else {
        this.$toasted.error(doDelete.message);
      }
    },
     
    async restoreRows() {
      let params = { 
        hide: false,
        ids: [...this.ids] 
      };
      const doRestore = await this.$store.dispatch(
        `${STORE_NAMESPACE}/${actionTypes.TEACHING_ELEARNINGS.HIDE}`,
        params
      );

      if (doRestore.success) {
        this.getList();
      } else {
        this.$toasted.error(doRestore.message);
      }
    },

    get
  },

  beforeMount () {
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
  background-color: #1481FE;
}
</style>