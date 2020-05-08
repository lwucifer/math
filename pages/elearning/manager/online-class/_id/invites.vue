<template>
  <div class="container">
    <breadcrumb />
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="5" />
      </div>
      <div class="col-md-9">
        <h5 class="page-title">
          Phòng học online số 1
        </h5>
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <div class="elearning-manager-content__title__nav">
              <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Danh sách đã mời</a>
              <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Danh sách điểm danh</a>
            </div>
            <!-- <a class="btn btn--size-sm btn--color-info btn--square btn-right" @click="openModal = true">
              <IconPlusCircle class="mr-2 "/>
              <span class="color-white">Mời thêm học sinh</span>
            </a> -->
          </div>

          <div class="elearning-manager-content__main pt-3">
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
  import IconPlusCircle from '~/assets/svg/design-icons/plus-circle.svg?inline';
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
  import ModalInviteStudent from "~/components/page/elearning/manager/olclass/ModalInviteStudent"

  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"

  const InvitedTab = () => import("./tabs/invited")
  const MusterTab = () => import("./tabs/muster")

  export default {
    layout: "manage",
    
    components: {
      ElearningManagerSide,
      InvitedTab,
      MusterTab,
      IconPlusCircle,
      ModalInviteStudent
    },

    data() {
      return {
        tab: 1,
        openModal: false,
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      currentTabComponent: function() {
        // List of tabs
        const MATCHED_TABS = ['InvitedTab', 'MusterTab']
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