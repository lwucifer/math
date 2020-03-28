
<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
              <ElearningManagerSide active="6" />
          </div>
          <div class="col-md-9">
              <div class="elearning-manager-content">
                  <div class="elearning-manager-content__title">
                        <h5 class="color-primary mb-3">Bài tập và bài kiểm tra</h5>
                        <div class="elearning-manager-content__title__nav">
                            <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Bài tập</a>
                            <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Bài kiểm tra</a>
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
import ElearningManagerSide from "~/components/page/elearning/manager/ElearningManagerSide";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
const QATab = () => import("./tabs/QA");
const NotifyTab = () => import("./tabs/notify");
export default {
    components:{
        ElearningManagerSide,
        QATab,
        NotifyTab,
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
      const MATCHED_TABS = ['QATab', 'NotifyTab']
      return (this.tab > 0) ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0]
    }
  },

  methods: {
    onPageChange(e) {
      const that = this;
      that.pagination = { ...that.pagination, ...e };
      console.log(that.pagination);
    }
  }
}
</script>

<style>

</style>