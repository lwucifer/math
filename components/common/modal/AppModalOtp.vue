<template>
  <app-modal centered :width="306" :component-class="{ 'auth-modal': true }" v-if="visible">
    <h3 class="color-primary" slot="header">
      Xác thực tài khoản
      <a class="btn-close" @click="close">X</a>
    </h3>
    <div slot="content">
      <div class="form-group_border-bottom">
        <input
          type="text"
          maxlength="6"
          class="form-control ml-0"
          placeholder="Nhập mã OTP"
          @input="hanldeOtp"
        />
      </div>
      <p class="color-red text-center full-width mt-2" v-if="error">{{message}}</p>
      <app-button color="primary" square fullWidth @click="acceptOtp">Xác nhận</app-button>
    </div>
  </app-modal>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      valueInput: ""
    };
  },

  props: {
    visible: Boolean,
    error: Boolean,
    message: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    acceptOtp() {
      this.$emit("submit", this.valueInput);
    },
    hanldeOtp(event) {
      this.valueInput = event.target.value;
      this.$emit("change", this.valueInput);
    }
  }
};
</script>