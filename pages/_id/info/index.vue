<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolAccountSide :school="school" :active="1" />
      </div>
      <div class="col-md-9">
        <div class="school-account__main box">
          <h5 class="color-primary">Thông tin tài khoản</h5>
          <hr class="mt-3 mb-3" />
          <div class="wrapInfoAccount">
            <div class="d-flex">
              <h5>Thông tin cá nhân</h5>
              <app-button square 
                          class="btnAccountLink_account-info"  
                          v-if="!accountLink.list.linked"
                          v-on:click="accountLink.showModal=true"
              >
                <IconPlus class="icon"/>
                <span class="ml-3">Liên kết trường học</span>
              </app-button>

              <AccountLinkModal :visible="accountLink.showModal" 
                                @click-close="closeLinkModal"
                                @handleRefresh="handleRefresh"
                                />
              
            </div>
            <app-input labelFixed v-model="name" label="Họ và tên" disabled />
            <app-input v-model="phone" label="Số điện thoại" disabled />
            <app-input v-model="email" label="Email" disabled/>
            <div class="picker-group__profileInfo">
              <app-input v-model="sex" label="Giới tính" class="sex_Profile" disabled/>
              <app-input v-model="birthday" label="Ngày sinh" class="birthday_Profile" disabled/>
            </div>
          </div>
          <app-button color="red" square v-on:click="showChangePass=true" class="btnChangePassword">
            <span class="ml-3">Thay đổi mật khẩu</span>
          </app-button>
          <AccountChangePasswordModal
            :visible="showChangePass"
            @click-close="showChangePass = false"
          />
          <AccountInfoStudent :profileList="profileInfo" v-if="accountLink.list.linked"/>
          <div class="d-flex mt-4">
            <app-button class="ml-auto" square>Lưu thay đổi</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import AccountInfoStudent from "~/components/page/account/Info/AccountInfoStudent";
import AccountChangePasswordModal from "~/components/page/account/AccountChangePasswordModal";
import AccountLinkModal from "~/components/page/account/Info/AccountLinkModal"
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions } from "vuex";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import { get } from "lodash";
import { getDateBirthDay, getDateFormat } from "~/utils/moment";

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";

export default {
  components: {
    IconPhoto,
    IconPlus,
    SchoolAccountSide,
    AccountInfoStudent,
    AccountChangePasswordModal,
    AccountLinkModal
  },
  data() {
    return {
      isAuthenticated: true,
      school: SCHOOL,
      name: "",
      phone: "",
      email: "",
      sex: "",
      birthday: "",
      showChangePass: false,
      accountLink:{
        showModal: false,
        list:""
      },
      profileInfo:""
    };
  },
  watch:{
    profileList: {
        handler: function() {
          this.name = get(this,"profileList.fullname","");
          this.phone = get(this,"profileList.phone","");
          this.email = get(this,"profileList.email","");
          this.address = get(this,"profileList.address","");
          this.sex = get(this,"profileList.sex","") === "MALE" ? "Nam" : "Nữ";
          this.birthday = getDateBirthDay(get(this,"profileList.birthday",""));
          this.accountLink.list = get(this,"linkList.data",{});
          this.profileInfo = get(this,"profileList",{});
        }
      }
  },
  methods: {
    async fetchProfile(){
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`),
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_LINK.LIST}`)
      ])
    },
    closeNotify() {
      this.notify.showNotify = false;
    },
    closeLinkModal(){
      this.accountLink.showModal = false;
    },
    async handleRefresh(){
      this.fetchProfile();
    },
  },
  computed: {
    ...mapState("account", {
      profileList: "profileList"
    }),
    ...mapState("account", {
      linkList: "linkList"
    })
  },
  created() {
    this.fetchProfile();
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
@import "~/assets/scss/components/account/_account-info.scss";
</style>