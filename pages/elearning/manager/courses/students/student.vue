<template>
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="2" />
      </div>
      <div class="col-md-9">
        <sub-block-section title="Bài giảng đại số lớp 10" has-icon>
          <template v-slot:content>
            <div class="elearning-manager-content p-0">
              <div class="elearning-manager-content__title">
                <head-tabs :tabs="tabs" :active.sync="tab" @selectedItem="changeTab" />
                <app-button
                  class="btn btn--size-sm btn--color-info btn--square btn-right"
                  @click="handleShowModalInvite"
                >
                  <IconPlusCircle class="fill-white mr-2 icon" />
                  <span class="color-white">Mời thêm học sinh</span>
                </app-button>
              </div>

              <div class="elearning-manager-content__main">
                <keep-alive>
                  <component v-bind:is="currentTabComponent"></component>
                </keep-alive>
              </div>
            </div>
          </template>
        </sub-block-section>
      </div>
    </div>
    <ModalInviteStudent v-if="showModalInvite" @close="closeModalInvite" />
    <app-modal-notify
      v-if="showModalNotify"
      type="success"
      title="Gửi lời mời thành công"
      @close="closeModalNotify"
    />
  </div>
</template>

<script>
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import HeadTabs from "~/components/page/elearning/HeadTab";
import ModalInviteStudent from "~/components/page/elearning/manager/student/ModalInviteStudent";
import IconPlusCircle from "~/assets/svg/design-icons/plus-circle.svg?inline";
import { mapState } from "vuex";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";

const ListJoinedTab = () => import("./tabs/ListJoined");
const ListPendingTab = () => import("./tabs/ListPending");

export default {
  layout: "manage",

  components: {
    ElearningManagerSide,
    HeadTabs,
    ListJoinedTab,
    ListPendingTab,
    IconPlusCircle,
    ModalInviteStudent
  },

  data() {
    return {
      showModalInvite: false,
      showModalNotify: false,
      tab: "joined",
      tabs: [
        {
          key: "joined",
          text: "Danh sách học sinh tham gia"
        },
        {
          key: "pending",
          text: "Danh sách học sinh chờ duyệt"
        }
      ],
      pagination: {
        totalElements: 0,
        totalPages: 1,
        numberOfElements: 0,
        last: false,
        size: 10,
        number: 0,
        first: true
      },
      params: {
        page: 1,
        size: 10
      },
      list: [],
      loading: false
    };
  },
  computed: {
    currentTabComponent: function() {
      const MATCHED_TABS = {
        joined: "ListJoinedTab",
        pending: "ListPendingTab"
      };
      return MATCHED_TABS[this.tab];
    }
  },

  methods: {
    changeTab(key) {
      this.tab = key;
    },
    handleShowModalInvite() {
      this.showModalInvite = true;
      console.log("lol");
    },
    closeModalInvite(close) {
      this.showModalInvite = close;
    },
    closeModalNotify() {
      this.showModalNotify = false;
      console.log("lol");
    }
  },
  created() {
    // this.getList()
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>