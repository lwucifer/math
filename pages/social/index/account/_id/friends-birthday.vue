<template>
  <div>
    <AccountFriendsMenu active="birthday">
      <template v-slot:content>
        <div class="row py-4">
          <div class="col-md-6">
            <AccountFriendItem :friend="true" birthday/>
          </div>
        </div>
      </template>
    </AccountFriendsMenu>
  </div>
</template>

<script>
import AccountFriendsMenu from '~/components/page/social/account/AccountFriendsMenu';
import AccountFriendItem from '~/components/page/social/account/AccountFriendItem';
export default {
  components:{
    AccountFriendsMenu,
    AccountFriendItem
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/social/_social-account-friends.scss";
</style>