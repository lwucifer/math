<template>
  <div class="container">
      <div class="row">
        <div class="col-md-3 ">
            <AccountClientSide :client="client" active="1"/>
        </div>
        <div class="col-md-9">
            <div class="wrap-account-client">
                <h5 class="color-primary">Thông tin tài khoản</h5>
                <hr class="mt-3 mb-3"/>
                <div class="row">
                    <div class="col-md-5">
                        <app-input :value="client.name" label="Họ và tên"/>
                        <app-input :value="client.email" label="Email"/>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-5">
                        <app-input :value="client.phone" label="Số điện thoại"/>
                        <div class="account-client-date-picker">
                            <app-date-picker square label="Ngày sinh"/>
                            <div class="account-client-sex-select">
                                <label>Giới tính</label>
                                <app-select :options="sexOptions" value="client.sex"/>
                            </div>
                        </div>
                    </div>
                </div>
                <app-button color="red" square>
                    <span class="ml-3">Thay đổi mật khẩu</span>
                </app-button>
                <div class="d-flex mt-4 justify-content-center">
                    <app-button  square>Lưu thay đổi</app-button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {SEX,CLIENT} from "~/server/fakedata/account/client.js"
import AccountClientSide from "~/components/page/account/AccountClientSide"
export default {
    layout:"client",
    components:{
        AccountClientSide
    },
    data() {
        return {
        isAuthenticated: true,
        sexOptions:SEX,
        client: CLIENT,
        avatar: [],
        avatarSrc: "https://picsum.photos/170/170",
        defaultSelect:1
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
}
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-client.scss";
</style>