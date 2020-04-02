<template>
  <div class="account-friends-item">
    <template>
      <div class="account-friends-item__info">
        <n-link :to="'/account/1'">
          <app-avatar :src="data.avatar && data.avatar.low ? data.avatar.low : ''" :size="100" />
        </n-link>
        <div>
          <n-link :to="'/account/1'" class="bold link-dark">{{ data.fullname }}</n-link>
          <!-- <p>{{}} bạn chung</p> -->
        </div>
      </div>

      <app-dropdown
        class="account-friends-item__actions ml-auto"
        align-content="center"
        open-on-click
        v-model="dropdownShow"
        content-width="150px"
      >
        <app-button
          slot="activator"
          color="default"
          square
          size="xs"
          @click="dropdownShow = !dropdownShow"
        >
          <IconTickGray class="mr-2" />Bạn bè
        </app-button>
        <ul class="account-friends-item__actions-list">
          <li>
            <a>Hủy theo dõi</a>
          </li>
          <li>
            <a @click.prevent="hanldeUnfriend(data.id)">Hủy kết bạn</a>
          </li>
        </ul>
      </app-dropdown>
    </template>
  </div>
</template>

<script>
import IconTickGray from "~/assets/svg/icons/tick-gray.svg?inline";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    IconTickGray
  },

  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {
      dropdownShow: false
    };
  },

  computed: {
    ...mapState("social", ["friendList"])
  },

  methods: {
    ...mapActions("social", ["deleteFriend", "socialFriendList"]),
    hanldeUnfriend(_id) {
      console.log("[hanldeUnfriend] id", _id);
      this.deleteFriend(_id).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.socialFriendList();
        } else {
          this.$toasted.error(result.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-friends-item.scss";
</style>