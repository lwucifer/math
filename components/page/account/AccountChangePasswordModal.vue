<template>
  <app-modal
    centered
    :width="606"
    :component-class="{ 'account-edit-modal': true }"
    @close="$router.push('/')"
    v-if="visible"
  >
    <div slot="content">
      <div v-if="success" class="change-pass-success text-center">
        <h2 class="color-primary">Thành công</h2>
        <div class="icon-tick mt-3 mb-3">
          <IconTick />
        </div>
        <p>Chúc mừng bạn đã thay đổi mật khẩu thành công</p>
        <div class="text-center mt-4">
          <app-button size="lg" color="info" square @click="$emit('click-close')">Đóng</app-button>
        </div>
      </div>

      <div v-else class="account-form-change-pass">
        <h3>Thay đổi mật khẩu</h3>
        <app-input
          v-model="oldPassword"
          label="Mật khẩu hiện tại"
          type="password"
          :validate="error ? 1 : 0"
          message="Mật khẩu phải có từ 8-32 ký tự"
        />
        <app-input
          v-model="newPassword"
          label="Mật khẩu mới"
          type="password"
          :validate="error ? 1 : 0"
          message="Mật khẩu phải có từ 8-32 ký tự"
        />
        <app-input
          v-model="coNewPassword"
          label="Xác nhận mật khẩu"
          type="password"
          :validate="error ? 1 : 0"
          message="Mật khẩu phải có từ 8-32 ký tự"
        />
        <div class="text-center">
          <app-button
            size="lg"
            color="info"
            class="mr-3"
            square
            @click="$emit('click-close')"
          >Hủy bỏ</app-button>
          <app-button size="xl" square @click="save()">Xác nhận</app-button>
        </div>
      </div>
    </div>
  </app-modal>
</template>

<script>
import IconTick from "~/assets/svg/icons/tick.svg?inline";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    IconTick
  },
  props: {
    visible: Boolean,
    account: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {},
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      coNewPassword: "",
      error: false,
      error2: false,
      error3: false,
      success: false
    };
  },
  methods: {
    ...mapActions("auth", ["changePassword"]),
    save() {
      const that = this;
      that.error = that.oldPassword.length < 8 || that.oldPassword.length > 32;
      that.error2 = that.newPassword.length < 8 || that.newPassword.length > 32;
      that.error3 =
        that.coNewPassword.length < 8 || that.coNewPassword.length > 32;
      if (!that.error && !that.error2 && !that.error3) {
        let data = {
          oldPass: that.oldPassword,
          newPass: that.newPassword,
          verify_new_pass: that.coNewPassword
        };
        const doAdd = that.changePassword(data).then(result => {
          if (result.success == 1) {
            that.success = true;
            // this.$emit("click-close");
          } else {
          }
        });
      }
    },
    reset() {
      const that = this;
      that.oldPassword = "";
      that.newPassword = "";
      that.coNewPassword = "";
      that.error = false;
      that.error2 = false;
      that.error3 = false;
      that.success = false;
    }
  },

  watch: {
    visible() {
      this.reset();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-edit-modal.scss";
</style>