<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide :active="6"/>
      </div>
      <div class="col-md-9 cc-panel">
        <block-section
          title="Cài đặt chung"
        >
          <template v-slot:content>
            <sub-block-section
              :title-cls="{ 'pb-0': true, 'border-0': true }"
            >
              <template v-slot:title>
                <div class="elearning-manager-content p-0">
                  <div class="elearning-manager-content__title">
                    <head-tabs
                      :tabs="tabs"
                      :active.sync="tab"
                      @selectedItem="changeTab"
                    />
                  </div>
                </div>
              </template>
              <template v-slot:content>
                <keep-alive>
                  <component v-bind:is="currentTabComponent"></component>
                </keep-alive>
              </template>
            </sub-block-section>
          </template>
        </block-section>
      </div>
    </div>
  </div>
</template>

<script>
  import SchoolAccountSide from "~/components/page/school/SchoolAccountSide"
  import HeadTabs from "~/components/page/elearning/HeadTab"
  
  const NotifyTab = () => import("./tabs/notify");
  const PaymentTab = () => import("./tabs/payment");
  export default {
    layout: 'account-info',
    
    components: {
      SchoolAccountSide,
      NotifyTab,
      PaymentTab,
      HeadTabs
    },
    data() {
      return {
        tab: 'payment',
        isAuthenticated: true,
        tabs: [
          {
            key: 'notify',
            text: 'Cài đặt thông báo'
          },
          {
            key: 'payment',
            text: 'Cài đặt thanh toán'
          },
        ],
      }
    },
    computed: {
      currentTabComponent: function () {
        const MATCHED_TABS = {
          notify: 'NotifyTab',
          payment: 'PaymentTab'
        }
        return MATCHED_TABS[this.tab]
      }
    },
    methods: {
      changeTab(key) {
        this.tab = key
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
  @import "~/assets/scss/components/account/_account-info-setting.scss";
</style>