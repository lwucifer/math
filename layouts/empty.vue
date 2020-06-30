<template>
  <div class="page-wrap">
    <nuxt class="page-content" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Empty",

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
      return {}
    }
  },

  computed: {
    ...mapState(["desktopView"])
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_create.scss";
</style>
