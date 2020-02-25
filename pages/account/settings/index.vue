<template>
  <div class="container">
    <!-- <AccountCover /> -->
    <div class="row">
      <div class="col-md-3">
        <AsideBox title="Cài đặt chung" class="side-links">
          <n-link to class="active">Liên kết thêm trường</n-link>
          <n-link :to="'/account/settings/referral'">Referral</n-link>
          <n-link :to="'/account/settings/manual'">Hướng dẫn sử dụng</n-link>
          <n-link :to="'/account/settings/help'">Trợ giúp khách hàng</n-link>
        </AsideBox>
      </div>
      <div class="col-md-9">
        <div class="account-settings__main box23">
          <h3>Liên kết trường</h3>

          <div class="row mt-3">
            <div class="col-md-8 col-sm-12">
              <app-input
                type="text"
                v-model="code"
                placeholder="nhập mã liên kết"
                :validate="validateLink"
                :message="messageErrorLink"
                @input="handleCode"
              />
            </div>
            <div class="col-md-4 col-sm-12">
              <app-button square fullWidth @click.prevent="handleActived">Kích hoạt</app-button>
            </div>
          </div>

          <n-link :to="'/account/settings/manual'" class="account-settings__main-help">
            <IconExclamationO class="mr-2" />Hướng dẫn sử dụng
          </n-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideBox from "~/components/layout/asideBox/AsideBox";
import IconExclamationO from "~/assets/svg/icons/exclamation-o.svg?inline";
import { mapState, mapActions } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { APP_INPUT_VALIDATE_STATUS as VALIDATE_STATUS } from "~/utils/constants";
import { ERRORS } from "~/utils/error-code";

export default {
  components: {
    AsideBox,
    IconExclamationO
  },
  async fetch({ params, query, store }) {
    await Promise.all([
      store.dispatch(`account/${actionTypes.ACCOUNT_LINK.LIST}`)
    ]);
  },

  data() {
    return {
      code: "",
      messageErrorLink: "",
      errorLink: false,
      validateLink: VALIDATE_STATUS.DEFAULT
    };
  },
  async mounted() {
    await this.$recaptcha.init();
  },

  computed: {},

  methods: {
    ...mapActions("account", ["accountLinkAdd"]),
    async handleActived() {
      const token = await this.$recaptcha.execute("login");
      console.log("ReCaptcha token:", token);
      const data = {
        code: this.code,
        g_recaptcha_response: token
      };
      this.accountLinkAdd(data).then(result => {
        if (result.success == true) {
        } else {
          this.showErrorCode(result);
        }
      });
    },
    showErrorCode(error) {
      this.validateLink = VALIDATE_STATUS.ERROR;
      let message = "";
      switch (error.code) {
        case ERRORS.LOGIN.REQUIRED:
          message = "User not found";
          break;
        default:
          message = "Something went wrong. Please try again";
          break;
      }
      this.messageErrorLink = message;
    },
    handleCode() {
      this.validateLink = VALIDATE_STATUS.DEFAULT;
      this.messageErrorLink = "";
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-settings.scss";
</style>


