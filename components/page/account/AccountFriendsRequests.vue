<template>
  <div class="account-friends">
    <div class="account-friends__title d-block mb-4">
      <h3>Bạn bè</h3>
      <p class="color-999 mt-2">Bạn có {{filterTotalInvite}} lời mời kết bạn</p>
    </div>
    <div class="account-friends__list">
      <div class="row">
        <div
          class="col-md-6 col-xs-12"
          v-for="(item, index) in inviteList.listInvite ? inviteList.listInvite : []"
          :key="index"
        >
          <AccountFriendsRequestsItem :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountFriendsRequestsItem from "~/components/page/account/AccountFriendsRequestsItem";
import { mapState } from "vuex";

export default {
  components: {
    AccountFriendsRequestsItem
  },

  data() {
    return {
      name: "",
      friends: [
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        },
        {
          id: 1,
          name: "Scarlett Black",
          mutual_friends: 69,
          avatar: "https://picsum.photos/100/100"
        }
      ]
    };
  },

  computed: {
    ...mapState("account", ["inviteList"]),
    filterTotalInvite() {
      return this.inviteList && this.inviteList.totalInvite
        ? this.inviteList.totalInvite
        : 0;
    }
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-friends.scss";
</style>