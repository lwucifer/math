<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="4" />
      </div>
      <div class="col-md-9">
        <div class="school-account__main box">
          <div class="d-flex">
            <h6 class="color-red">Thêm mới giáo viên</h6>
            <n-link :to="'/school/manager/teacher'" class="ml-auto">
              <IconClose class="fill-999" width="13" height="13" />
            </n-link>
          </div>
          <div class="row">
            <div class="col-md-6">
              <app-input :value="name" label="Tên trường" disabled />
              <app-input v-model="address" label="Địa chỉ" />
              <app-input v-model="email" label="Email" />
            </div>
            <div class="col-md-6">
              <app-input :value="code" label="Mã trường" disabled />
              <app-input v-model="phone" label="Số điện thoại" />
            </div>
          </div>
          <div class="text-center mt-4">
            <app-button size="sm" normal square>Hoàn thành</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolManagerSide from "~/components/page/school/manager/SchoolManagerSide";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";

export default {
  components: {
    IconPhoto,
    IconClose,
    SchoolManagerSide
  },

  data() {
    return {
      isAuthenticated: true,
      school: SCHOOL,
      avatar: [],
      avatarSrc: "https://picsum.photos/170/170"
    };
  },

  methods: {
    async handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
      const body = new FormData();
      body.append("avatar_images", fileList[0]);
      console.log("[avatar_images]", fileList[0]);
      this.accountPersonalEditAvatar(body).then(result => {});
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>