<template>
  <div class="account-friends-item">
    <div class="account-friends-item__info">
      <n-link :to="'/account/1'">
        <app-avatar :src="data.avatar && data.avatar.low ? data.avatar.low : ''" :size="100" />
      </n-link>
      <div>
        <n-link :to="'/account/1'" class="bold link-dark">{{ data.fullname }}</n-link>
        <p>{{ data.mutual_friends ? data.mutual_friends : 1 }} bạn chung</p>
      </div>
    </div>

    <div class="account-friends-item__actions ml-auto">
      <app-button
        square
        size="xs"
        class="d-block"
        fullWidth
        @click="hanldeInviteFriend(data.id)"
      >Đồng ý</app-button>
      <app-button
        square
        size="xs"
        color="default"
        class="d-block mt-3"
        fullWidth
        @click="handleDeleteFriend(data.id)"
      >Từ chối</app-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},

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

  methods: {
    ...mapActions("social", ["inviteFriend", "getListInvite", "deleteFriend"]),
    hanldeInviteFriend(_id) {
      console.log("_id", _id);
      const data = {
        friend_id: _id
      };
      this.inviteFriend(data).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.getListInvite();
        } else {
          this.$toasted.error(result.message);
        }
      });
    },
    handleDeleteFriend(id) {
      console.log("_id", id);
      // const data = {
      //   friend_id: id
      // };
      this.deleteFriend(id).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.getListInvite();
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