<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide :active="6" />
      </div>
      <div class="col-md-9 cc-panel">
        <block-section title="Cài đặt chung">
          <template v-slot:content>
            <sub-block-section :title-cls="{ 'pb-0': true, 'border-0': true }">
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
                  <div v-if="loading">Loading...</div>
                  <div v-else>
                    <Notify v-if="tab === 'notify'" />
                    <PaymentList v-if="tab === 'payment'" />
                  </div>
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
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import HeadTabs from "~/components/page/elearning/HeadTab";
import * as actionTypes from "~/utils/action-types";
import Notify from "~/components/page/profile/setting/tabs/Notify";
import PaymentList from "~/components/page/profile/setting/tabs/PaymentList";
import { mapState } from "vuex";
import { get } from "lodash";

export default {
  layout: "account-info",

  components: {
    SchoolAccountSide,
    Notify,
    PaymentList,
    HeadTabs,
  },

  data() {
    return {
      loading: true,
      tab: "notify",
      isAuthenticated: true,
      tabs: [
        {
          key: "notify",
          text: "Cài đặt thông báo",
        },
        {
          key: "payment",
          text: "Cài đặt thanh toán",
        },
      ],
    };
  },

  async mounted() {
    this.loading = true;
    await this.$store.dispatch(`setting/getSetting`);
    const options = {
      params: { token: "true" },
    };
    await this.$store.dispatch(`setting/getBanks`, options);
    await this.$store.dispatch(`setting/getAccountBanks`);
    this.loading = false;
  },

  computed: {
    currentTabComponent: function() {
      const MATCHED_TABS = {
        notify: "Notify",
        payment: "PaymentList",
      };
      return MATCHED_TABS[this.tab];
    },
  },

  methods: {
    changeTab(key) {
      this.tab = key;
    },
    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
@import "~/assets/scss/components/account/_account-info-setting.scss";
</style>
