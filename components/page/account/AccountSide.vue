<template>
  <div class="account__side">
    <div class="account__side-item info">
      <h3>Giới thiệu</h3>
      <div id="label-verify-phone"></div>
      <table>
        <tbody>
          <tr>
            <td :class="validateEmail ? 'color-red' : ''">Email</td>
            <td v-if="personalList.email">{{personalList.email}}</td>
            <td v-else>
              <div v-if="showUpdateEmail" class="form-update-email">
                <input
                  @input="hanldeEmail"
                  type="text"
                  v-model="email"
                  :class="validateEmail ? 'color-red' : ''"
                />
                <app-button color="white" square size="xs" @click="saveEmail">Lưu</app-button>
              </div>
              <a class="update-phone" @click="showUpdateEmail = true" v-else>Cập nhật email</a>
            </td>
          </tr>
          <tr>
            <td :class="validatePhone ? 'color-red' : ''">Số điện thoại</td>
            <td v-if="personalList.phone_number">{{personalList.phone_number}}</td>
            <td v-else>
              <div v-if="showUpdatePhone" class="form-update-phone">
                <input
                  type="text"
                  v-model="phone"
                  :class="validatePhone ? 'color-red' : ''"
                  @input="hanldePhone"
                />
                <app-button color="white" square size="xs" @click="savePhone">Lưu</app-button>
              </div>
              <a class="update-phone" @click="showUpdatePhone = true" v-else>Cập nhật số điện thoại</a>
            </td>
          </tr>
          <tr>
            <td :class="validatePhone ? 'border-red' : ''">Ngày sinh</td>
            <td
              :class="validatePhone ? 'border-red' : ''"
            >{{personalList.birthday | getDateBirthDay}}</td>
          </tr>
          <tr>
            <td>Giới tính</td>
            <td>{{filterSex}}</td>
          </tr>
          <tr>
            <td>Địa chỉ</td>
            <td>{{personalList.address}}</td>
          </tr>
        </tbody>
      </table>

      <app-button
        class="mt-3"
        square
        fullWidth
        v-if="checkUserID"
        @click="showEdit = true"
      >Chỉnh sửa thông tin</app-button>
      <AccountEditModal :visible="showEdit" @click-close="showEdit = false" />
      <!-- 
      <app-button square fullWidth @click="showChangePass = true">Đổi mật khẩu</app-button>
      <AccountChangePasswordModal
        :visible="showChangePass"
        @click-close="showChangePass = false"
        :account="account"
      />-->
    </div>

    <div class="account__side-item photos">
      <h3>Ảnh</h3>
      <div class="row m-0">
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
        <div class="col-md-4 p-0">
          <img src="https://picsum.photos/110/110" />
        </div>
      </div>
      <n-link
        class="btn btn--size-md btn--full-width btn--color-primary btn--square"
        :to="'/account/social/photos'"
      >Xem toàn bộ ảnh</n-link>
    </div>

    <div class="account__side-item friends">
      <h3>
        Bạn bè
        <span>{{friendList.totalFriend || 0}}</span>
      </h3>
      <div class="row">
        <div
          class="col-md-4 mb-3"
          v-for="(item, index) in friendList.listFriend ? friendList.listFriend : []"
          :key="index"
        >
          <n-link :to="`/account/${item.id}`">
            <app-avatar :src="item.avatar && item.avatar.low ? item.avatar.low : ''" :size="100" />
            <strong>{{item.fullname}}</strong>
          </n-link>
        </div>
      </div>
      <n-link
        class="mt-0 btn btn--size-md btn--full-width btn--color-primary btn--square"
        :to="`/${$route.params.id}/social/friends`"
      >Tất cả bạn bè</n-link>
    </div>
    <app-modal-otp
      :visible="modalOtp.showModalOTP"
      :error="modalOtp.errorOtp"
      :message="modalOtp.messageErrorOtp"
      @submit="submitOtp"
      @change="hanldeOtp"
      @close="closeModalOtp"
    />
    <app-modal-otp
      :visible="modalOtpPhone.showModalOtpPhone"
      :error="modalOtpPhone.errorOtpPhone"
      :message="modalOtpPhone.messageErrorPhone"
      @submit="submitOtpPhone"
      @close="closeModalOtpPhone"
    />
    <app-modal
      centered
      :width="400"
      :component-class="{ 'auth-modal': true }"
      v-if="modalConfirmEmail"
    >
      <h3 class="color-primary" slot="header"></h3>

      <div slot="content">
        <p class="line-height-2">
          <br />Vui lòng nhận mã otp tài khoản qua email
          <br />
          <span class="color-primary">{{this.email}}</span>
        </p>
        <app-button color="primary" square fullWidth @click="modalConfirmEmail = false">Xác nhận</app-button>
      </div>
    </app-modal>
    <app-modal-notify
      v-if="notify.showNotify"
      :title="notify.message"
      @close="closeNotify"
      @ok="$router.push(notify.redirectLink)"
    />
  </div>
</template>

<script>
import AccountEditModal from "~/components/page/account/AccountEditModal";
import AccountChangePasswordModal from "~/components/page/account/AccountChangePasswordModal";
import { mapState, mapActions, mapGetters } from "vuex";
import { formatPhoneNumber } from "~/utils/validations";
import firebase from "@/services/firebase/FirebaseInit";
import { ERRORS } from "~/utils/error-code";

export default {
  name: "E-learning",

  components: {
    AccountEditModal,
    AccountChangePasswordModal
  },

  props: {},

  data: () => ({
    showEdit: false,
    showChangePass: false,
    showUpdatePhone: false,
    validatePhone: false,
    phone: "",
    showUpdateEmail: false,
    validateEmail: false,
    email: "",
    otpPhone: "",
    modalOtpPhone: {
      showModalOtpPhone: false,
      errorOtpPhone: false,
      messageErrorPhone: ""
    },
    otp: "",
    modalOtp: {
      showModalOTP: false,
      errorOtp: false,
      messageErrorOtp: ""
    },
    modalConfirmEmail: false,
    verify_token: "",
    notify: {
      redirectLink: "",
      message: "",
      showNotify: false
    }
  }),
  mounted() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "label-verify-phone",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("RecaptchaVerifier resolved");
        }
      }
    );
  },
  methods: {
    ...mapActions("account", [
      "accountPersonalList",
      "accountPersonalEditEmail",
      "verifyOtpEmail",
      "accountPersonalUpdatePhone"
    ]),
    ...mapActions("auth", ["sendotp", "verifiOtp"]),
    savePhone() {
      // this.showUpdatePhone = false;
      const data = {
        phone: `+${formatPhoneNumber(this.phone)}`,
        appVerifier: window.recaptchaVerifier
      };
      this.sendotp(data).then(result => {
        if (!result.code) {
          this.modalOtpPhone.showModalOtpPhone = true;
        } else {
          // this.modalOtpPhone.errorOtpPhone = true;
          // this.modalOtpPhone.messageErrorPhone = "Số điện thoại bạn nhập không chính xác";
        }
      });
    },
    async acceptOtpPhone() {
      await this.verifiOtp(this.otpPhone).then(result => {
        console.log("result huydv", result);
        if (result && result.user) {
          this.verify_token = result.user ? result.user._lat : "";
          this.updatePhone();
        } else {
          this.showErrorOtp(result);
        }
      });
    },
    updatePhone() {
      this.accountPersonalUpdatePhone({
        firebase_token: this.verify_token
      }).then(result => {
        console.log("[result]", result);
        if (result.success == true) {
          this.modalOtpPhone.showModalOtpPhone = false;
          this.notify = {
            redirectLink: "",
            message: "Bạn đã cập nhật thành công",
            showNotify: true
          };
          const userId = this.personalList.id;
          this.accountPersonalList(userId);
        } else {
          this.validatePhone = true;
          this.showErrorUpdatePhone(result);
        }
      });
    },
    saveEmail() {
      this.accountPersonalEditEmail({
        email: this.email
      }).then(result => {
        if (result.success == true) {
          this.modalConfirmEmail = true;
          this.modalOtp.showModalOTP = true;
        } else {
          this.validateEmail = true;
        }
      });
    },
    async acceptOtpEmail() {
      const data = {
        email: this.email,
        otp_code: this.otp
      };
      await this.verifyOtpEmail(data).then(result => {
        console.log("[verifyOtpEmail] huydv", result);
        if (result.success == true) {
          this.modalOtp.showModalOTP = false;
          this.modalSuccess = true;
          const userId = this.personalList.id;
          this.accountPersonalList(userId);
        } else {
          this.showErrorUpdateEmail(result);
        }
      });
    },
    showErrorUpdatePhone(error) {},
    showErrorUpdateEmail(error) {
      this.modalOtp.errorOtp = true;
      let message = "";
      switch (error.code) {
        case ERRORS.REGISTER.REQUIRED:
          message =
            "Invalid parameter. Required: email or phone, g_recaptcha_response, password. verify_token is required if register by phone number";
          break;
        case ERRORS.REGISTER.PASSWORD_LEAST:
          message =
            "Invalid password. Password must at least 8 characters, include lowercase, uppercase and number";
          break;
        default:
          message = "Đã có lỗi xảy ra. Vui lòng thử lại sau";
          break;
      }
      this.modalOtp.messageErrorOtp = message;
    },
    showErrorOtp(error) {
      this.modalOtpPhone.errorOtpPhone = true;
      if (error.code == "auth/invalid-verification-code") {
        this.modalOtpPhone.messageErrorPhone = "Mã OTP bạn nhập không đúng";
      } else if (error.code == "auth/code-expired") {
        this.modalOtpPhone.messageErrorPhone = "Mã OTP của bạn nhập đã hết hạn";
      } else {
        this.modalOtpPhone.messageErrorPhone = "Có lỗi. Xin vui lòng thử lại";
      }
    },
    submitOtp(_otp) {
      console.log("otp", _otp);
      this.otp = _otp;
      this.acceptOtpEmail();
    },
    submitOtpPhone(_otpPhone) {
      console.log("otpPhone", _otpPhone);
      this.otpPhone = _otpPhone;
      this.acceptOtpPhone();
    },
    hanldeEmail() {
      this.validateEmail = false;
    },
    hanldePhone() {
      this.validatePhone = false;
    },
    hanldeOtpPhone() {
      this.modalOtpPhone.errorOtpPhone = false;
      this.modalOtpPhone.messageErrorPhone = "";
    },
    hanldeOtp() {
      this.modalOtp.errorOtp = false;
      this.modalOtp.messageErrorOtp = "";
    },
    closeModalOtpPhone() {
      this.modalOtpPhone.showModalOtpPhone = false;
      this.otpPhone = "";
      this.modalOtpPhone.messageErrorPhone = "";
    },
    closeModalOtp() {
      this.modalOtp.showModalOTP = false;
      this.otp = "";
      this.modalOtp.messageErrorOtp = "";
    },
    closeNotify() {
      this.notify.showNotify = false;
    }
  },

  computed: {
    ...mapState("account", ["personalList"]),
    ...mapState("message", ["friendList"]),
    ...mapGetters("auth", ["userId"]),
    filterSex() {
      return this.personalList
        ? this.personalList.sex == 1
          ? "Nam"
          : "Nữ"
        : "";
    },
    checkUserID() {
      const dataId = this.$route.params.id ? this.$route.params.id : "";
      return dataId == this.userId ? true : false;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-side.scss";
</style>