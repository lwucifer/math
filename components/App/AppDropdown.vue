<template>
  <span class="app-dropdown" :class="classes" z-index="0" v-on="listeners()" v-click-outside="handleClickOutside">
    <slot name="activator" />
    <div
      class="app-dropdown__content"
      v-show="active"
      :style="[
        ['px', 'rem', '%', 'em'].every(
          char => contentWidth.toString().indexOf(char) > -1
        ) && `width: ${contentWidth}px; height: ${contentWidth}px;`
      ]"
    >
      <slot />
    </div>
  </span>
</template>

<script>
export default {
  model: {
    prop: "active",
    event: "visible-change"
  },

  props: {
    active: Boolean,
    openOnClick: Boolean,
    contentWidth: {
      type: [String, Number],
      default: "" // css value
    },
    alignContent: {
      type: String,
      default: 'center' // left | center | rigjt
    }
  },

  computed: {
    classes() {
      return {
        // Type classes
        "app-dropdown-active": this.active,
        // Modifier classes
        "app-dropdown--left": this.alignContent === 'left',
        "app-dropdown--center": this.alignContent === 'center',
        "app-dropdown--right": this.alignContent === 'right',
      };
    }
  },

  methods: {
    listeners() {
      const mouseenter = () => {
        this.$emit("visible-change", true);
      };

      const mouseleave = () => {
        this.$emit("visible-change", false);
      };

      const click = () => {
        this.$emit("visible-change", !this.active);
      };

      const visibleEvents = this.openOnClick
        ? { click }
        : { mouseenter, mouseleave };

      return Object.assign({}, this.$listeners, visibleEvents);
    },

    handleClickOutside() {
      this.$emit("visible-change", false);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-dropdown.scss";
</style>
