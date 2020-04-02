<template>
  <div class="container">
    <AccountCover />
    <div class="row">
      <div class="col-md-4">
        <AccountSide />
      </div>
      <div class="col-md-8">
        <div class="account__main">
          <ul class="account__tab-nav">
            <li>
              <a class="active">Timeline</a>
            </li>
            <li>
              <n-link :to="`/${$route.params.id}/social/friends`">Bạn bè</n-link>
            </li>
            <li>
              <n-link :to="`/${$route.params.id}/social/photos`">Ảnh</n-link>
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
    console.log("params", params);
    const userId = params.id;
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_POST.LIST}`),
      store.dispatch(`account/${actionTypes.ACCOUNT_PERSONAL.LIST}`, userId),
      store.dispatch(`social/${actionTypes.SOCIAL_FRIEND.LIST}`, userId),
      store.dispatch(`social/${actionTypes.SOCIAL_FRIEND.LIST_INVITE}`)
    ]);
  },

  data() {
    return {
      account: {
        id: "1",
        name: "Dat Pham",
        avatar: "https://picsum.photos/170/170",
        cover: "https://picsum.photos/1170/400"
      }
    };
  },
  mounted() {},

  computed: {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account.scss";
</style>


