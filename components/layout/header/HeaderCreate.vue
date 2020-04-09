<template>
  <div class="header-create">
    <div class="header-create__content container">
      <app-button class="header-create__btn header-create__btn-back" outline square nuxt to="../">
        <IconArrowLeft class="icon mr-2" />
        Quay lại
      </app-button>

      <div class="header-create__right">
        <app-button class="header-create__btn mr-4" square>Lưu</app-button>
        <app-button class="header-create__btn" color="secondary" square>Xoá</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowLeft from '~/assets/svg/design-icons/arrow-left.svg?inline';

export default {
  components: {
    IconArrowLeft
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/header-create/_header-create.scss";
</style>