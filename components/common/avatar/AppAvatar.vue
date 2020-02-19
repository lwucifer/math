<script>
export default {
  functional: true,

  props: {
    tag: {
      type: String,
      default: "span"
    },
    nuxt: Boolean,
    to: {
      type: [String, Object] // Vue-router prop. Denotes the target route of the link.
    },
    exact: {
      type: Boolean // Vue-router prop. Exactly match the link. Without this, '/' will match every route.
    },
    shape: {
      type: String,
      default: "circle" // circle | square,
    },
    size: {
      type: [String, Number],
      default: "default" // default | xs | sm | lg | css value
    },
    src: {
      type: String
    },
    srcSet: {
      type: String
    },
    alt: {
      type: String
    },
    loadError: {
      type: Function,
      default: () => {}
    }
  },

  render(h, ctx) {
    return h(ctx.props.nuxt ? "n-link" : ctx.props.tag, {
      props: {
        to: ctx.to,
        exact: ctx.exact
      },
      attrs: ctx.attrs,
      class: [
        "app-avatar",
        ctx.data.class,
        ctx.data.staticClass,
        ctx.props.shape === "circle" && "app-avatar-circle",
        ctx.props.shape === "square" && "app-avatar-square",
        ctx.props.size === "xs" && "app-avatar--size-xs",
        ctx.props.size === "sm" && "app-avatar--size-sm",
        ctx.props.size === "lg" && "app-avatar--size-lg"
      ],
      style: typeof ctx.props.size === "number" ? `width: ${ctx.props.size}px; height: ${ctx.props.size}px` : '',
      on: ctx.$listeners
    },
    [ctx.props.src ? h('img', {
      attrs: {
        src: ctx.props.src,
        srcset: ctx.props.srcSet,
        alt: ctx.props.alt,
      },
      on: {
        error: ctx.props.loadError
      }
    }) : null]
    );
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-avatar.scss";
</style>