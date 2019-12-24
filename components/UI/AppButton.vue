<script>
export default {
  props: {
    nuxt: Boolean,
    flat: Boolean,
    outline: Boolean,
    fullWidth: Boolean,
    square: Boolean,
    rounded: Boolean,
    tag: {
      type: String,
      default: "button" // 'button', 'a'
    },
    size: {
      type: String,
      default: "default" // 'default' | 'lg'
    },
    color: {
      type: String,
      default: "primary" // 'primary' | 'white'
    },
    to: {
      type: [String, Object] // Vue-router prop. Denotes the target route of the link.
    },
    exact: {
      type: Boolean // Vue-router prop. Exactly match the link. Without this, '/' will match every route.
    }
  },

  computed: {
    classes() {
      const sizeClasses = {
        "btn--size-default": this.size === "default",
        "btn--size-lg": this.size === "lg",
        "btn--full-width": this.fullWidth
      };

      const colorClasses = {
        "btn--color-primary": this.color === "primary",
        "btn--color-secondary": this.color === "secondary",
        "btn--color-info": this.color === "info",
        "btn--color-success": this.color === "success",
        "btn--color-error": this.color === "error",
        "btn--color-warning": this.color === "warning",
        "btn--color-white": this.color === "white",
      };

      const outlineColorClasses = {
        "btn-outline--primary": this.color === "primary",
        "btn-outline--secondary": this.color === "secondary",
        "btn-outline--info": this.color === "info",
        "btn-outline--success": this.color === "success",
        "btn-outline--error": this.color === "error",
        "btn-outline--warning": this.color === "warning",
        "btn-outline--white": this.color === "white",
      };

      const borderRadiusClasses = {
        "btn--square": this.square,
        "btn--rouned": this.rounded
      };

      if (this.flat) return { ...sizeClasses, "btn--flat": true };
      if (this.outline)
        return {
          ...sizeClasses,
          "btn-outline": true,
          ...outlineColorClasses,
          ...borderRadiusClasses
        };
      return { ...sizeClasses, ...colorClasses, ...borderRadiusClasses };
    }
  },

  render: function(h) {
    return h(
      this.nuxt ? "n-link" : this.tag,
      {
        props: {
          to: this.to,
          exact: this.exact
        },
        attrs: this.attrs,
        class: {
          btn: true,
          ...this.classes
        },
        on: this.$listeners
      },
      this.$slots.default
    );
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/UI/_app-button.scss";
</style>
