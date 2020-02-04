<script>
export default {
  props: {
    nuxt: Boolean,
    flat: Boolean,
    outline: Boolean,
    fullWidth: Boolean,
    square: Boolean,
    rounded: Boolean,
    normal: Boolean,
    tag: {
      type: String,
      default: "button" // 'button', 'a'
    },
    size: {
      type: String,
      default: "md" // 'sm' | 'md' | 'lg'
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
        "btn--size-xs": this.size === "xs",
        "btn--size-sm": this.size === "sm",
        "btn--size-md": this.size === "md",
        "btn--size-lg": this.size === "lg",
        "btn--size-xl": this.size === "xl",
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
        "btn--color-gray": this.color === "gray",
        "btn--color-red": this.color === "red",
      };

      const outlineColorClasses = {
        "btn-outline--color-primary": this.color === "primary",
        "btn-outline--color-secondary": this.color === "secondary",
        "btn-outline--color-info": this.color === "info",
        "btn-outline--color-success": this.color === "success",
        "btn-outline--color-error": this.color === "error",
        "btn-outline--color-warning": this.color === "warning",
        "btn-outline--color-white": this.color === "white",
      };

      const borderRadiusClasses = {
        "btn--square": this.square,
        "btn--rouned": this.rounded
      };

      const fontWeightClasses = {
        "btn--normal": this.normal,
      };

      if (this.flat) return { ...sizeClasses, "btn--flat": true };
      if (this.outline)
        return {
          ...sizeClasses,
          "btn-outline": true,
          ...outlineColorClasses,
          ...borderRadiusClasses
        };
      return { ...sizeClasses, ...colorClasses, ...borderRadiusClasses, ...fontWeightClasses };
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
@import "~/assets/scss/components/app/_app-button.scss";
</style>
