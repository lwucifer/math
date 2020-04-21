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
              <app-button rounded size="sm" class="mr-4" normal>
                <IconFilter />Lọc kết quả
              </app-button>
              <app-checkbox label="Miễn phí" v-model="params.free" />
              <app-select :options="opts1" v-model="opt1" size="sm" />
              <app-select :options="opts2" v-model="opt2" size="sm" />
              <app-input class="mb-0" size="sm" placeholder="Nhập để tìm kiếm...">
                <a class="d-flex" slot="unit">
                  <IconSearch width="17" height="17" />
                </a>
              </app-input>
            </div>
            <app-button color="secondary" square size="sm" normal class="mb-4">
              <IconTrashAlt height="15" width="15" class="fill-white mr-2" />Xoá khỏi danh sách
            </app-button>
          </div>

          <!--Table-->
            <app-table
              :heads="heads"
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
          text: "Số học sinh tham gia",
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
      pagination: {
        total: 10,
        page: 1,
        size: 10,
        totalElements: 10,
        first: 1,
        last: 10
      },
      isTeacher: true,
      time1: null,
      time2: null,
      opt1: "",
      opts1: [
        { value: "", text: "Theo loại" },
        { value: "COURSE", text: "COURSE" },
        { value: "LECTURE", text: "LECTURE" }
      ],
      opt2: "",
      opts2: [
        { value: "", text: "Theo hiển thị" },
        { value: "1", text: "Tăng dần" },
        { value: "2", text: "Giảm dần" }
      ],
      teacher: {
        id: "1",
        name: "Savannah Mckinney",
        avatar: "https://picsum.photos/125/125"
      },
      elearningList: [],
      ids: [],
      params: {
        page: 1,
        limit: 10,
        free: null
      },
      xxx: "PENDING | WAITING_FOR_APPROVE | APPROVED | REJECTED | HIDE"
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
      //params.hide = newValue == '';
      this.getList();
    }
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      that.params.limit = that.pagination.size;
      that.params.page = that.pagination.page;
      that.getList();
    },

    selectRow(data) {
      this.ids = data.map((row, index, data) => {
        return row.online_class_id;
      });
    },

    async getList() {
      try {
        this.loading = true;
        let xx = {
          "free": true,
          "hide": true,
          "keyword": "string",
          "limit": 0,
          "page": 0,
          "privacy": "string",
          "status": "string",
          "subject": "string",
          "type": "string"
        };
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

    get
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
</style>