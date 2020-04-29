<template>
  <div class="container">
      <div class="row">
        <div class="col-md-6">
            <div class="wrap-success-auth">
                <IconSuccess class="mb-3"/>
                <h3 class="text-primary">Gửi yêu cầu thành công</h3>
                <p class="my-4">Vui lòng kiểm tra email của bạn để xác thực việc thay đổi mật khẩu</p>
                <app-button class="mt-2" square 
                            :to="'/auth/signin'"
                            nuxt
                >
                Trở về trang chủ
                </app-button>
            </div>
        </div>
        <div class="col-md-6 text-center">
            <ImageAuth/>
        </div>
    </div>
  </div>
</template>

<script>
import ImageAuth  from "~/components/page/auth/ImageAuth";
import IconSuccess from '~/assets/svg/icons/success.svg?inline';
export default {
    components:{
        ImageAuth,
        IconSuccess
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth-v2.scss";
</style>