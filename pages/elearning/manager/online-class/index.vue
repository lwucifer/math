<template>
  <div class="container">
    <breadcrumb />
    
    <div class="row">
      <div class="col-md-3">
        <ElearningManagerSide active="5" />
      </div>
      <div class="col-md-9">
        <h5 class="page-title">
          Lịch học online
        </h5>
        <div class="elearning-manager-content">
          <div class="elearning-manager-content__title">
            <div class="elearning-manager-content__title__nav">
              <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Đang diễn ra</a>
              <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Đã lên lịch</a>
              <a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Đang soạn</a>
              <a :class="tab == 4 ? 'active' : ''" @click="tab = 4">Đã kết thúc</a>
            </div>
            <n-link :to="'/elearning/manager/online-class/create'" class="btn btn--size-sm btn--color-info btn--square btn-right">
              <IconPlusCircle class="fill-white mr-2"/>
              <span class="color-white">Tạo phòng học online</span>
            </n-link>
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
  import IconPlusCircle from '~/assets/svg/design-icons/plus-circle.svg?inline';
  import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide"
  import { mapState } from "vuex"
  import * as actionTypes from "~/utils/action-types"

  const Tab1 = () => import("./tabs/streaming")
  const Tab2 = () => import("./tabs/scheduled")
  const Tab3 = () => import("./tabs/writting")
  const Tab4 = () => import("./tabs/finished")

  export default {    
    components: {
      ElearningManagerSide,
      IconPlusCircle,
      Tab1,
      Tab2,
      Tab3,
      Tab4
    },

    data() {
      return {
        tab: 1,
      }
    },
    computed: {
      ...mapState("auth", ["loggedUser"]),
      currentTabComponent: function() {
        // List of tabs
        const MATCHED_TABS = ['Tab1', 'Tab2', 'Tab3', 'Tab4']
        return (this.tab > 0) ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0]
      }
    },

    methods: {
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/elearning/manager/_elearning-manager.scss";
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>