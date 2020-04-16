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
            <div class="picker-group__infostudent">
              <div class="form-group">
                <label>Giới tính</label>
                <app-select v-model="sex" :sex="sex" :options="opts" class="form-control max-w-170" />
              </div>
              <app-date-picker square label="Ngày sinh" v-model="birthday" :disabled="true"/>
            </div>
          </div>
          <app-button color="red" square v-on:click="showChangePass=true" class="btnChangePassword">
            <span class="ml-3">Thay đổi mật khẩu</span>
          </app-button>
          <AccountChangePasswordModal
            :visible="showChangePass"
            @click-close="showChangePass = false"
          />
          <AccountInfoStudent :profileList="profileList" v-if="accountLink.list.linked"/>
          <div class="d-flex mt-4">
            <app-button class="ml-auto" square>Lưu thay đổi</app-button>
          </div>
          <app-notify-modal
            :show="notify.showNotify"
            :message="notify.message"
            :link="notify.redirectLink"
            @close="closeNotify"
          />
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
  async fetch({ params, query, store }) {
    await Promise.all([
      store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`),
      store.dispatch(`account/${actionTypes.ACCOUNT_LINK.LIST}`)
    ]);
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
      address: "",
      showChangePass: false,
      accountLink:{
        showModal: false,
        list:""
      },
      notify: {
        redirectLink: "",
        message: "",
        showNotify: false
      },
      opts: [
        { value: "MALE", text: "Nam" },
        { value: "FEMALE", text: "Nữ" }
      ]
    };
  },

  methods: {
    closeNotify() {
      this.notify.showNotify = false;
    },
    closeLinkModal(){
      this.accountLink.showModal = false;
    },
    async handleRefresh(){
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`),
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_LINK.LIST}`)
      ])
    }

    // async handleUploadChange(fileList, event) {
    //   this.avatar = Array.from(fileList);

    //   getBase64(this.avatar[0], src => {
    //     this.avatarSrc = src;
    //   });
    //   const body = new FormData();
    //   body.append("avatar_images", fileList[0]);
    //   console.log("[avatar_images]", fileList[0]);
    //   this.accountPersonalEditAvatar(body).then(result => {});
    // }
  },
  computed: {
    ...mapState("account", {
      profileList: "profileList",
      linkList: "linkList"
    })
  },
  created() {
    this.name = get(this,"profileList.fullname","");
    this.phone = get(this,"profileList.phone","");
    this.email = get(this,"profileList.email","");
    this.address = get(this,"profileList.address","");
    this.sex = get(this,"profileList.sex","");
    this.birthday = getDateBirthDay(this.profileList.birthday);
    this.accountLink.list = get(this,"linkList.data",{})
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
.wrapInfoAccount {
  padding: 20px;
  label {
    color: #999999;
  }
  h5 {
    margin-bottom: 25px;
  }
  .app-input {
    display: flex;
    .app-input__label {
      white-space: nowrap;
      width: 15rem;
    }
  }
  .form-group {
    label {
      width: 14rem;
      white-space: nowrap;
    }
  }
  .picker-group__infostudent {
    display: flex;
    .app-date-picker {
      margin-left: 60px;
      label {
        margin-right: 20px;
      }
    }
  }
}
.btnChangePassword {
  margin-left: 17rem;
  margin-bottom: 30px;
}
.account-edit-modal .app-modal-content .app-input {
  display: flex;
  flex-wrap: wrap;
  .app-input__error {
    margin-left: 16.1rem;
  }
}
.btnAccountLink_account-info{
  margin-left: auto;
  border: 1px solid #1481FE;
  background: #ffffff;
  color: #1481FE !important;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 20px;
 
}
</style>