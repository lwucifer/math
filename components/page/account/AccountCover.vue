<template>
  <div class="account__cover">
    <img :src="account.cover" />
    <a href class="change-cover">
      <IconPhoto width="26" height="26" />
    </a>
    <div class="account__avatar">
      <div class="avatar">
        <app-avatar :src="account.avatar" :size="170" />
        <a href class="change-avatar">
          <IconPhoto width="22" height="22" />
        </a>
      </div>
      <h3>{{account.name}}</h3>
    </div>

    <!-- Not friend -->
    <div class="actions" v-if="status == 1">
      <app-button square class="mr-3">
        <IconUserCross class="mr-2" />Thêm bạn bè
      </app-button>
      <app-button square color="secondary">
        <IconMessenger class="mr-2" />Nhắn tin
      </app-button>
    </div>

    <!-- Send request -->
    <div class="actions" v-if="status == 2">
      <app-dropdown
        class="friend-actions mr-3"
        position="center"
        open-on-click
        v-model="dropdownShow"
        content-width="150px"
      >
        <app-button slot="activator" slot-scope="{ on }" square v-on="on">
          <IconUserArrow class="mr-2" />Chờ xác nhận
        </app-button>
        <ul class="friend-actions-list">
          <li>
            <a>Hủy lời mời kết bạn</a>
          </li>
        </ul>
      </app-dropdown>

      <app-button square color="secondary">
        <IconMessenger class="mr-2" />Nhắn tin
      </app-button>
    </div>

    <!-- Friend -->
    <div class="actions" v-if="status == 3">
      <app-dropdown
        class="friend-actions mr-3"
        position="center"
        open-on-click
        v-model="dropdownShow"
        content-width="150px"
      >
        <app-button slot="activator" slot-scope="{ on }" square v-on="on">
          <IconUserTick class="mr-2" />Bạn bè
        </app-button>
        <ul class="friend-actions-list">
          <li>
            <a>Hủy theo dõi</a>
          </li>
          <li>
            <a>Hủy kết bạn</a>
          </li>
        </ul>
      </app-dropdown>

      <app-button square color="secondary">
        <IconMessenger class="mr-2" />Nhắn tin
      </app-button>
    </div>
  </div>
</template>

<script>
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconMessenger from "~/assets/svg/icons/messenger.svg?inline";
import IconUserCross from "~/assets/svg/icons/user-cross.svg?inline";
import IconUserTick from "~/assets/svg/icons/user-tick.svg?inline";
import IconUserArrow from "~/assets/svg/icons/user-arrow.svg?inline";

export default {
  components: {
    IconPhoto,
    IconMessenger,
    IconUserCross,
    IconUserTick,
    IconUserArrow
  },

  props: {
    status: [String, Number]
  },

  data() {
    return {
      dropdownShow: false,
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
@import "~/assets/scss/components/account/_account-cover.scss";
</style>


