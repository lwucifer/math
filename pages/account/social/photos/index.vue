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
              <n-link :to="'./friends'">Bạn bè</n-link>
            </li>
            <li>
              <a class="active">Ảnh</a>
            </li>
          </ul>

          <div class="tab-content">
            <AccountPhotos />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountCover from "~/components/page/account/AccountCover";
import AccountSide from "~/components/page/account/AccountSide";
import AccountPhotos from "~/components/page/account/AccountPhotos";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    AccountSide,
    AccountPhotos,
    AccountCover
  },
  async fetch({ params, query, store }) {
    const userId = store.state.auth.token ? store.state.auth.token.id : "";
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_FRIEND.LIST}`, userId),
      store.dispatch(`account/${actionTypes.ACCOUNT_PERSONAL.LIST}`, userId),
      store.dispatch(
        `social/${actionTypes.SOCIAL_PHOTO.POST_PHOTO_LIST}`,
        userId
      )
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

  computed: {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account.scss";
</style>


