<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
            <SchoolAccountSide :active="5" />
          </div>
          <div class="col-md-9 bg-white pt-4 p-0">
              <h5 class="color-primary mb-4 ml-3">Thông báo</h5>
              <div class="elearning-manager-content__title__nav ml-4">
                <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">E-learning</a>
                <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Mạng xã hội</a>
              </div>
              <hr />
              <div class="elearning-manager-content__main">
                <keep-alive>
                    <component v-bind:is="currentTabComponent"></component>
                </keep-alive>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
const ElearningTab = () => import("./tabs/elearning");
const SocialTab = () => import("./tabs/social");
export default {
    layout: 'account-info',
    
    components:{
        SchoolAccountSide,
        ElearningTab,
        SocialTab
    },
    data() {
        return {
            tab: 1,
            isAuthenticated: true,
        }
    },
    computed:{
        currentTabComponent: function() {
            const MATCHED_TABS = ['ElearningTab', 'SocialTab']
            return (this.tab > 0) ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0]
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>