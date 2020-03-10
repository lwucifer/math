<template>
  <div class="header-create">
    <div class="header-create__content container">
      <app-button
        class="header-create__btn header-create__btn-back"
        outline
        square
      >
        <IconArrowLeft class="icon mr-2" />
        Quay lại
      </app-button>

      <div class="header-create__right">
        <app-button
          @click="handleCLickSave"
          class="header-create__btn mr-4"
          square
          :disabled="!isSubmit"
          >Lưu</app-button
        >
        <app-button class="header-create__btn" color="secondary" square
          >Xoá</app-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";

export default {
  components: {
    IconArrowLeft
  },

  props: {
    isSubmit: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleCLickSave() {
      this.$emit("handleCLickSave");
    }
  }
};
</script>

<style scoped>
@import "~/assets/scss/components/header-create/_header-create.scss";
</style>
