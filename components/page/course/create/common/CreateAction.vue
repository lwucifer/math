<template>
  <div class="create-action">
    <!-- <app-button
        class="create-action__btn create-action__btn-back"
        outline
        square
        nuxt
        to="./"
      >
        <IconArrowLeft class="icon mr-2" />
        Quay lại
    </app-button>-->

      <div class="header-create__right" v-if="isShowAction">
        <app-button
          @click="handleCLickSave"
          class="header-create__btn mr-4"
          square
          :disabled="!isSubmit"
          >Lưu</app-button
        >
        <app-button
          class="header-create__btn"
          color="secondary"
          square
          @click="$emit('handleDelete')"
          >Xoá</app-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowLeft from "~/assets/svg/design-icons/arrow-left.svg?inline";
import { get } from "lodash";

export default {
  components: {
    IconArrowLeft,
  },

  props: {
    isSubmit: {
      type: Boolean,
      default: true,
    },
    isShowAction: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    handleCLickSave() {
      this.$emit("handleCLickSave");
    },

    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-action.scss";
</style>
