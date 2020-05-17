<template>
  <div class="block-section" :class="blockCls">
    <div
      class="block-section__title"
      :class="titleCls"
    >
      <slot name="title">
        <h3 class="block-section__title--main" @click="clickTitle">
          <span @click="clickBack">
            <icon-left-arrow v-if="hasIcon" class="block-section__icon-title" title="Quay lại"/>
          </span>
          {{ title }}
        </h3>
      </slot>
    </div>
    
    <div class="block-section__main">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import IconLeftArrow from "~/assets/svg/icons/left-arrow.svg?inline";
  
  export default {
    components: {
      IconLeftArrow
    },
    props: {
      title: {
        type: String,
        required: true
      },
      actionClick: { // Action when click arrow icon
        type: Function
      },
      hasIcon: {
        type: Boolean,
        default: false
      },
      blockCls: {
        type: Object,
        default: () => {}
      },
      titleCls: {
        type: Object,
        default: () => {}
      },
    },
    methods: {
      clickTitle() {
        this.$emit('click')
      },
      clickBack() {
        if (this.actionClick) {
          this.actionClick()
        } else {
          this.$router.go("-1")
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/components/app/_app-block-section.scss";
</style>