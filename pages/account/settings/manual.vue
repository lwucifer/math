<template>
  <div class="container">
    <AccountCover />
    <div class="row">
      <div class="col-md-3">
        <AsideBox title="Cài đặt chung" class="side-links">
          <n-link :to="'/account/settings'">Liên kết thêm trường</n-link>
          <n-link :to="'/account/settings/referral'">Referral</n-link>
          <n-link to class="active">Hướng dẫn sử dụng</n-link>
          <n-link :to="'/account/settings/help'">Trợ giúp khách hàng</n-link>
        </AsideBox>
      </div>
      <div class="col-md-9">
        <div class="account-settings__main box23">
          <h3>Hướng dẫn sử dụng</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideBox from "~/components/layout/asideBox/AsideBox";
import IconExclamationO from "~/assets/svg/icons/exclamation-o.svg?inline";

export default {
  components: {
    AsideBox,
    IconExclamationO
  },

  data() {
    return {};
  },

  computed: {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-settings.scss";
</style>