<template>
  <div class="container">
    <AccountCover :status="status" />
    <div class="row">
      <div class="col-md-4">
        <AccountSide account="account" />
      </div>
      <div class="col-md-8">
        <div class="account__main">
          <ul class="account__tab-nav">
            <li>
              <a class="active">Timeline</a>
            </li>
            <li>
              <n-link :to="'/account/friends'">Bạn bè</n-link>
            </li>
            <li>
              <n-link :to="'/account/photos'">Ảnh</n-link>
            </li>
          </ul>

          <div class="tab-content">
            <AccountTimeline />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountCover from "~/components/page/account/AccountCover";
import AccountSide from "~/components/page/account/AccountSide";
import AccountTimeline from "~/components/page/account/AccountTimeline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    AccountSide,
    AccountTimeline,
    AccountCover
  },
  async fetch({ params, query, store }) {
    // const userId = store.state.auth.token.user.id;
    await Promise.all([
      store.dispatch(`account/${actionTypes.ACCOUNT_PERSONAL.LIST}`, 5)
    ]);
  },

  data() {
    return {
      status: 3,
      account: {
        id: "1",
        name: "Dat Pham",
        avatar: "https://picsum.photos/170/170",
        cover: "https://picsum.photos/1170/400"
      }
    };
  },

  computed: {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account.scss";
</style>