<template>
  <sub-block-section
    :has-title="false"
  >
    <template v-slot:content>
      <app-modal-block-noti-status
        class="text-center mx-auto"
        type="success"
        title="Đổi mật khẩu thành công"
        description="Tài khoản của bạn đã được cập nhật mật khẩu mới!"
      >
        <template v-slot:footer>
          <app-button
            size="xl"
            nuxt
            :to="'/' + accountInfo.id + '/info'"
          >
            Quay lại trang trước
          </app-button>
        </template>
      </app-modal-block-noti-status>
    </template>
  </sub-block-section>
</template>

<script>
import ImageAuth  from "~/components/page/auth/ImageAuth";
import IconSuccess from '~/assets/svg/icons/success.svg?inline';
import { getToken } from "~/utils/auth";

export default {
  components:{
    ImageAuth,
    IconSuccess
  },
  computed: {
    accountInfo() {
      return getToken()
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth-v2.scss";
</style>