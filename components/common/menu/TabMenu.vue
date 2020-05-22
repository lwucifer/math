<template>
  <div class="tab-menu">
    <a
      class="tab-menu__item"
      v-for="(item, index) in list"
      :key="index"
      :class="active == item.key ? 'active' : ''"
      @click="selectItem(item.key)"
    >
      {{ item.text }}
    </a>
      <!--<a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Bài kiểm tra</a>-->
  </div>
</template>

<script>
  export default {
    name: "TabMenu",
    props: {
      active: {
        type: String,
        required: true
      },
      list: {
        type: Array,
        default: () => [],
        validator: value =>
          value.every(option => ["key", "text"].every(key => key in option)) // key, text, action
      }
    },
    methods: {
      selectItem(key) {
        this.$emit('selectedItem', key)
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/menu/_tab-menu.scss";
</style>