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
        active="all"
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

  export default {
    components: {
      AccountCover,
      AccountFriendSearch,
      AccountMenu
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
      changeTab(item) {
        this.$emit('changeCnt', item)
      },
      changeTabFriends(f){
          this.$emit('changeFriendItem',f)
      }
    }
  }
</script>
<style lang="scss">

</style>