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
          <div class="row">
            <div class="col-md-5">
              <app-input :value="name" label="Tên trường" disabled/>
              <app-input v-model="address" label="Địa chỉ"/>
              <app-input v-model="email" label="Email"/>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5">
              <app-input :value="code" label="Mã trường" disabled/>
              <app-input v-model="phone" label="Số điện thoại"/>
            </div>
          </div>
          <app-button color="red" square>
            <IconLock2 />
            <span class="ml-3">Thay đổi mật khẩu</span>
          </app-button>
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
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconLock2 from "~/assets/svg/icons/lock2.svg?inline";

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";

export default {
  components: {
    IconPhoto,
    IconLock2,
    SchoolAccountSide
  },

  data() {
    return {
      isAuthenticated: true,
      school: SCHOOL,
      phone: '',
      name: '',
      email: '',
      address: '',
      code: '',
      avatar: [],
      avatarSrc: "https://picsum.photos/170/170"
    };
  },

  methods: {
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
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>