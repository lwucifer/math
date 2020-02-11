<template>
  <div class="auth auth-signin">
    <div class="auth__main">
      <div class="auth_content text-center mb-4">
        <IconSucessGreen class="mt-3 mb-3"/>
        <p class="h3">Xác thực tài khoản thành công</p>
      </div>
      <n-link :to="'/'" class="color-white btn btn--size-md btn--full-width btn--color-primary btn--square">
          Về trang chủ
      </n-link>
    </div>
  </div>
</template>

<script>
import IconSucessGreen from '~/assets/svg/icons/sucess-green.svg?inline';

export default {
  components: {
      IconSucessGreen
      },

  data() {
    return {
    };
  },

  methods: {
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/auth/_auth.scss";
</style>