<template>
  <div class="app-alert" :class="classes">
    <div class="app-alert__icon" v-if="showIcon && !!icon">
      <slot name="icon">
        <component :is="icon" class="icon" />
      </slot>
    </div>
    <div class="app-alert__content">
      <slot />
    </div>
  </div>
</template>

<script>
import IconExclamationTriangle from "~/assets/svg/design-icons/exclamation-triangle.svg?inline";
import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";

export default {
  props: {
    showIcon: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "primary" // 'primary', 'secondary', 'success', 'danger', 'warning'
    }
  },

  computed: {
    classes() {
      return {
        "app-alert--primary": this.type === "primary",
        "app-alert--secondary": this.type === "secondary",
        "app-alert--success": this.type === "success",
        "app-alert--danger": this.type === "danger",
        "app-alert--warning": this.type === "warning",
        "app-alert--light": this.type === "light",
        "app-alert--dark": this.type === "dark"
      };
    },

    icon() {
      switch (this.type) {
        case "secondary":
          return IconExclamationTriangle;
          break;

        case "warning":
          return IconInfoCircle;
          break;

        default:
          return null;
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-alert.scss";
</style>