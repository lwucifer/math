<template>
  <tab-menu
    :list="menus"
    :active="active"
    class="sa__menu"
    @selectedItem="changeTab"
  >
  </tab-menu>
</template>

<script>
  import { get } from 'lodash'
  
  export default {
    name: "AccountMenu",
    props: {
      active: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        menus: [
          {
            key: 'timeline',
            text: 'Dòng thời gian'
          },
          {
            key: 'intro',
            text: 'Giới thiệu'
          },
          {
            key: 'friends',
            text: 'Bạn bè'
          },
          {
            key: 'gallery',
            text: 'Ảnh'
          },
        ],
      }
    },
    methods: {
      changeTab(item) {
        this.$emit('changeCnt', item)
        console.log('change item: ', item)
        const id = get(this.$router,'params.id', 14)
        const selectItem = item
        switch (selectItem) {
          case 'timeline':
            this.$router.push(`/social/account/${id}`)
            break;
          case 'intro':
            this.$router.push(`/social/account/${id}/about`)
            break;
          case 'friends':
            this.$router.push(`/social/account/${id}/friends`)
            break;
          case 'gallery':
            this.$router.push(`/social/account/${id}/photo`)
            break;
          default:
            this.$router.push(`/social/account/${id}`)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/social/_social-account-menu.scss";
</style>