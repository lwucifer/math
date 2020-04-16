<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="5" />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <h5 class="color-primary mb-3">Lịch học online</h5>
            <div class="elearning-manager-content__title__nav">
              <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Đã đăng</a>
              <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Đang soạn</a>
              <a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Chờ duyệt</a>
              <a :class="tab == 4 ? 'active' : ''" @click="tab = 4">Bị từ chối</a>
            </div>
            <hr class />
          </div>

          <div class="elearning-manager-content__main">
            <keep-alive>
              <component v-bind:is="currentTabComponent"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"

  const PublishedTab = () => import("./tabs/active")
  const EditingTab = () => import("./tabs/draft")
  const PendingTab = () => import("./tabs/starting")
  const DeniedTab = () => import("./tabs/finished")

  export default {

    components: {
      ElearningManagerSide,
      PublishedTab,
      EditingTab,
      PendingTab,
      DeniedTab
    },

    data() {
      return {
        tab: 1,
        isAuthenticated: true,
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      currentTabComponent: function() {
        // List of tabs
        const MATCHED_TABS = ['PublishedTab', 'EditingTab', 'PendingTab', 'DeniedTab']
        return (this.tab > 0) ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0]
      }
    },

    methods: {
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>