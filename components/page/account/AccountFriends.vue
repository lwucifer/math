<template>
  <div class="account-friends">
    <div class="account-friends__title">
      <h3>Bạn bè</h3>
      <n-link
        :to="`/${$route.params.id}/social/friends/requests`"
        class="btn btn--size-md btn--color-white btn--square btn--normal"
      >
        Lời mời kết bạn
        <span
          v-if="inviteList && inviteList.totalInvite > 0"
        >{{inviteList.totalInvite}}</span>
      </n-link>
    </div>
    <div class="account-friends__search form-group">
      <input class="form-control" type v-model="name" placeholder="Tìm kiếm bạn bè" />
      <a>
        <span>
          <IconSearch />
        </span>
      </a>
    </div>
    <div class="account-friends__list">
      <div class="row">
        <div
          class="col-md-6 col-xs-12"
          v-for="(item, index) in friendList.listFriend ? friendList.listFriend : []"
          :key="index"
        >
          <AccountFriendsItem :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountFriendsItem from "~/components/page/account/AccountFriendsItem";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import { mapState } from "vuex";

export default {
  components: {
    AccountFriendsItem,
    IconSearch
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
    ...mapState("account", ["friendList", "inviteList"]),
    ...mapState("message", ["friendList"])
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-friends.scss";
</style>