<template>
  <app-modal
    v-bind="{ width, centered, order }"
    :component-class="{ 'app-modal-confirm': true }"
  >
    <div slot="content" class="py-4 px-5">
      <slot name="title">
        <div class="mb-3 text-center">{{ title }}</div>
      </slot>

      <div class="d-flex justify-content-center">
        <app-button
          class="font-weight-semi-bold mr-3"
          color="info"
          size="sm"
          square
          @click="$emit('cancel')"
        >
          <slot name="cancelText">{{ cancelText }}</slot>
        </app-button>

        <app-button
          class="font-weight-semi-bold"
          color="primary"
          size="sm"
          square
          :style="{ 'pointer-events': confirmLoading ? 'none' : '' }"
          @click="$emit('ok')"
        >
          <app-spin
            v-if="confirmLoading"
            class="mr-3"
            color="white"
            size="small"
          />
          <slot name="okText">{{ okText }}</slot>
        </app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
export default {
  props: {
    centered: Boolean,
    order: {
      type: Number,
      default: 1
    },

    // This component props
    title: {
      type: String,
      default: "Xác nhận?",
    },
    okText: {
      type: String,
      default: "Xác nhận",
    },
    cancelText: {
      type: String,
      default: "Huỷ",
    },
    width: {
      type: [Number, String],
      default: "auto", // number in px or css value
    },
    confirmLoading: Boolean,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-modal-confirm.scss";
</style>
