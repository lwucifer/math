<template>
  <div class="container">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import error404 from "~/components/layout/error/404.vue";
export default {
  name: "page-error",
  layout: "default", // optional
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },

  head() {
    if (this.$device.isMobile && this.desktopView) {
      return {
        meta: [
          {
            hid: "viewport",
            name: "viewport",
            content: "width=1200, user-scalable=yes"
          }
        ]
      };
    } else {
      return {};
    }
  },

  computed: {
    ...mapState(["desktopView"]),

    errorPage() {
      if (this.error.statusCode === 404) {
        return error404;
      }
    }
  }
};
</script>

<style>
</style>