<template>
  <div class="container">
      <div class="row">
        <div class="col-md-3">
            <DepartmentAccountSide :department="department" :active="1"/>
        </div>
        <div class="col-md-9">
            <div class="wrap-account__Department">
                <h5 class="color-primary">Thông tin tài khoản</h5>
                <hr class="mt-3 mb-3"/>
                <div class="row">
                    <div class="col-md-5">
                        <app-input :value="department.name" label="Tên sở giáo dục" disabled/>
                        <app-input :value="department.address" label="Địa chỉ"/>
                        <app-input :value="department.email" label="Email"/>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-5">
                        <app-input :value="department.code" label="Mã sở giáo dục" disabled/>
                        <app-input :value="department.phone" label="Số điện thoại"/>
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
import DepartmentAccountSide from "~/components/page/department/DepartmentAccountSide"
import {DEPARTMENT} from "~/server/fakedata/department/test"
export default {
    layout:'backhome',
    components:{
        DepartmentAccountSide
    },
    data() {
        return {
        isAuthenticated: true,
        department: DEPARTMENT,
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
}
</script>

<style>
@import "~/assets/scss/components/department/_department-account-side.scss";
</style>