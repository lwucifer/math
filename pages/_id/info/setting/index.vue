<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
            <SchoolAccountSide active="6" />
          </div>
          <div class="col-md-9 cc-panel bg-white pt-4 px-5">
              <h5 class="color-primary mb-4">Cài đặt chung</h5>
              <div class="elearning-manager-content__title__nav">
                <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Cài đặt thông báo</a>
                <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Cài đặt thanh toán</a>
              </div>
              <hr class />
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

const NotifyTab = () => import("./tabs/notify");
const PaymentTab = () => import("./tabs/payment");
export default {
    components:{
        SchoolAccountSide,
        NotifyTab,
        PaymentTab
    },
    data() {
        return {
            tab: 1,
            isAuthenticated: true,
        }
    },
    computed:{
        currentTabComponent: function() {
            const MATCHED_TABS = ['NotifyTab', 'PaymentTab']
            return (this.tab > 0) ? MATCHED_TABS[this.tab - 1] : MATCHED_TABS[0]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
@import "~/assets/scss/components/account/_account-info-setting.scss";
</style>