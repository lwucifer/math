<template>
  <div>
    <section class="bg-white">
      <account-cover />
      <account-menu active="friends"/>
    </section>
    <div class="wrap-account-friends-social">
      <div class="d-flex align-items-center">
        <h4>Bạn bè</h4>
        <span>(500)</span>
        <AccountFriendSearch  class="ml-auto" placeholder="Nhập tên cần tìm"/>
      </div>
      <tab-menu
        :list="menuFriend"
        :active="active"
        class=""
        @selectedItem="changeTabFriends"
      >
      </tab-menu>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import AccountCover from '~/components/page/social/account/AccountCover.vue'
  import AccountFriendSearch from '~/components/page/social/account/AccountFriendSearch'
  import AccountMenu from '~/components/page/social/account/AccountMenu.vue'
   import { get } from 'lodash'
  export default {
    components: {
      AccountCover,
      AccountFriendSearch,
      AccountMenu
    },
    props: {
      active: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        menuFriend: [
          {
            key: 'all',
            text: 'Tất cả'
          },
          {
            key: 'recent',
            text: 'Đã thêm gần đây'
          },
          {
            key: 'birthday',
            text: 'Sinh nhật'
          },
          {
            key: 'request',
            text: 'Lời mời kết bạn'
          },
        ]
      }
    },
    methods: {
      changeTabFriends(f){
          this.$emit('changeFriendItem',f)
          console.log('changeFriendUten',f)
          const id = get(this.$router,'params.id', 14)
          const selectItem = f
          switch (selectItem) {
            case 'all':
              this.$router.push(`/social/account/${id}/friends`)
              break;
            case 'recent':
              this.$router.push(`/social/account/${id}/friends-recent`)
              break;
            case 'birthday':
              this.$router.push(`/social/account/${id}/friends-birthday`)
              break;
            case 'request':
              this.$router.push(`/social/account/${id}/friends-request`)
              break;
            default:
              this.$router.push(`/social/account/${id}/friends`)
          }
      }
    }
  }
</script>
<style lang="scss">

</style>