<template>
  <app-modal centered :width="400" :component-class="{ 'auth-modal': true }" v-if="show">
    <div slot="content">
      <div class="auth_content text-center mb-4">
        <IconSucessGreen class="mt-3 mb-3" />
        <p class="h3">{{message}}</p>
      </div>
    </div>
    <div slot="footer">
      <n-link
        v-if="link"
        :to="link"
        class="color-white btn btn--size-md btn--full-width btn--color-primary btn--square"
      >Đóng</n-link>
      <app-button
        v-else
        to
        @click.prevent="close"
        class="color-white btn btn--size-md btn--full-width btn--color-primary btn--square"
      >Đóng</app-button>
    </div>
  </app-modal>
</template>

<script>
import IconSucessGreen from "~/assets/svg/icons/sucess-green.svg?inline";
export default {
  inheritAttrs: false,
  components: {
    IconSucessGreen
  },
  data() {
    return {
      valueInput: ""
    };
  },

  props: {
    show: Boolean,
    link: {
      type: String,
      required: false,
      default: ""
    },
    message: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>