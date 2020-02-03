<template>
    <div class="container">
        <div class="account__cover">
            <img :src="account.cover">
            <a href class="change-cover">
                <IconPhoto width="26" height="26"/>
            </a>
            <div class="account__avatar">
                <div class="avatar">
                    <app-avatar :src="account.avatar" :size="170"/>
                    <a href class="change-avatar">
                        <IconPhoto width="22" height="22"/>
                    </a>
                </div>
                <h3>{{account.name}}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <AccountSide account="account"/>
            </div>
            <div class="col-md-8">
                <div class="account__main">
                    <ul class="account__tab-nav">
                        <li><a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Timeline</a></li>
                        <li><a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Bạn bè</a></li>
                        <li><a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Ảnh</a></li>
                    </ul>

                    <div class="tab-content">
                        <AccountTimeline v-if="tab == 1"/>
                        <AccountFriends v-if="tab == 2"/>
                        <AccountPhotos v-if="tab == 3"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AccountSide from "~/components/page/account/AccountSide";
import AccountTimeline from "~/components/page/account/AccountTimeline";
import AccountPhotos from "~/components/page/account/AccountPhotos";
import AccountFriends from "~/components/page/account/AccountFriends";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  watchQuery: ["post_id", "photo_id"],

  components: {
    AccountSide,
    AccountTimeline,
    AccountPhotos,
    AccountFriends,
    IconPhoto,
  },

  data() {
    return {
      tab: 1,
      account: {
            id: '1',
            name: 'Dat Pham',
            avatar: 'https://picsum.photos/170/170',
            cover: 'https://picsum.photos/1170/400',
        },
    };
  },

  computed: {},

  methods: {}
};
</script>

<style>
    @import "~/assets/scss/components/account/_account.scss";
</style>


