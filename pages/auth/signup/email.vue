<template>
  <div class="container">
      <div class="row">
        <div class="col-md-6">
            <div class="wrap-success-auth px-4">
                <IconSuccess class="mb-3 fill-primary"/>
                <h3>Đăng ký thành công</h3>
                <p class="my-4">Cảm ơn bạn đã tạo tài khoản Schoolly. Để hoàn tất việc đăng ký, vui lòng xác thực tài khoản qua email <a>datpt262@gmail.com</a></p>
                <app-button class="mt-2 btn-confirm" square 
                            :to="'/auth/signin'"
                            nuxt
                >
                Xác thực tài khoản
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