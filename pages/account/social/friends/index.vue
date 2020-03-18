<template>
  <div class="container">
    <AccountCover />
    <div class="row">
      <div class="col-md-4">
        <AccountSide account="account" />
      </div>
      <div class="col-md-8">
        <div class="account__main">
          <ul class="account__tab-nav">
            <li>
              <n-link :to="'/account'">Timeline</n-link>
            </li>
            <li>
              <a class="active">Bạn bè</a>
            </li>
            <li>
              <n-link :to="'./photos'">Ảnh</n-link>
            </li>
          </ul>

          <div class="tab-content">
            <AccountFriends />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountFriends from "~/components/page/account/AccountFriends";
import AccountSide from "~/components/page/account/AccountSide";
import AccountCover from "~/components/page/account/AccountCover";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    AccountFriends,
    AccountCover,
    AccountSide
  },
  async fetch({ params, query, store }) {
    const userId = store.state.auth.token ? store.state.auth.token.id : "";
    await Promise.all([
      store.dispatch(`account/${actionTypes.ACCOUNT_PERSONAL.LIST}`, userId)
    ]);
  },

  data() {
    return {
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

  computed: {},

  mounted() {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-friends.scss";
</style>