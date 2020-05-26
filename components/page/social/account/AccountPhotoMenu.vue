<template>
  <tab-menu
    :list="menus"
    :active="active"
    class="sp__menu"
    @selectedItem="changeTab"
  >
  </tab-menu>
</template>

<script>
  import { get } from 'lodash'
  
  export default {
    name: "AccountPhotoMenu",
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
            key: 'photo',
            text: 'Ảnh của bạn'
          },
          {
            key: 'tagged_photo',
            text: 'Ảnh được gắn thẻ'
          },
          {
            key: 'video',
            text: 'Video'
          }
        ],
      }
    },
    methods: {
      changeTab(item) {
        this.$emit('changeCnt', item)
        const id = get(this.$router,'params.id', 14)
        const selectItem = item
        switch (selectItem) {
          case 'photo':
            this.$router.push(`/social/account/${id}/photo`)
            break;
          case 'tagged_photo':
            this.$router.push(`/social/account/${id}/photo-tagged`)
            break;
          case 'video':
            this.$router.push(`/social/account/${id}/video`)
            break;
          default:
            this.$router.push(`/social/account/${id}/photo`)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/social/_social-account-photo-menu.scss";
</style>