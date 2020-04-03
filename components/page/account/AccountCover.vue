<template>
  <div class="account__cover">
    <img :src="coverSrc" />
    <app-upload class="cgi-upload-avt change-cover" @change="handleUploadCover">
      <template>
        <div class="cgi-upload-avt-preview">
          <IconPhoto width="26" height="26" />
        </div>
      </template>
    </app-upload>
    <div class="account__avatar">
      <div class="avatar">
        <app-avatar :src="avatarSrc" :size="170" />
        <app-upload class="cgi-upload-avt change-avatar" @change="handleUploadChange">
          <template>
            <div class="cgi-upload-avt-preview">
              <IconPhoto width="22" height="22" />
            </div>
          </template>
        </app-upload>
      </div>
      <h3>{{personalList.fullname}}</h3>
    </div>

    <!-- Not friend -->
    <div class="actions" v-if="status == 'none'">
      <app-button square class="mr-3" @click="handleInviteFriendNone">
        <IconUserCross class="mr-2" />Thêm bạn bè
      </app-button>
      <app-button square color="secondary">
        <IconMessenger class="mr-2" />Nhắn tin
      </app-button>
    </div>

    <!-- Send request -->
    <div class="actions" v-if="status == 'pending'">
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
            <a @click.prevent="handleCancelInvite">Hủy lời mời kết bạn</a>
          </li>
        </ul>
      </app-dropdown>

      <app-button square color="secondary">
        <IconMessenger class="mr-2" />Nhắn tin
      </app-button>
    </div>

    <!-- Send request -->
    <div class="actions" v-if="status == 'inviting'">
      <app-dropdown
        class="friend-actions mr-3"
        position="center"
        open-on-click
        v-model="dropdownShow"
        content-width="150px"
      >
        <app-button slot="activator" slot-scope="{ on }" square v-on="on">
          <IconUserArrow class="mr-2" />Trả lời lời mời kết bạn
        </app-button>
        <ul class="friend-actions-list">
          <li>
            <a @click.prevent="handleInviteFriendNone">Xác nhận</a>
          </li>
          <li>
            <a @click.prevent="handleCancelInvite">Xóa yêu cầu</a>
          </li>
        </ul>
      </app-dropdown>

      <app-button square color="secondary">
        <IconMessenger class="mr-2" />Nhắn tin
      </app-button>
    </div>

    <!-- Friend -->
    <div class="actions" v-if="status == 'is_friend'">
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
            <a @click.prevent="handleUnFollow">Hủy theo dõi</a>
          </li>
          <li>
            <a @click.prevent="handleCancelInvite">Hủy kết bạn</a>
          </li>
        </ul>
      </app-dropdown>

      <app-button square color="default">
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
import { getBase64 } from "~/utils/common";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    IconPhoto,
    IconMessenger,
    IconUserCross,
    IconUserTick,
    IconUserArrow
  },

  // props: {
  //   status: [String, Number]
  // },

  data() {
    return {
      dropdownShow: false,
      account: {
        id: "1",
        name: "Dat Pham",
        avatar: "https://picsum.photos/170/170",
        cover: "https://picsum.photos/1170/400"
      },
      avatar: [],
      avatarSrc: "https://picsum.photos/170/170",
      cover: [],
      coverSrc: "https://picsum.photos/1170/400"
    };
  },

  computed: {
    ...mapState("account", ["personalList"]),
    status() {
      if (
        this.personalList.friendship &&
        this.personalList.friendship == "none"
      ) {
        return "none";
      } else if (
        this.personalList.friendship &&
        this.personalList.friendship == "pending"
      ) {
        return "pending";
      } else if (
        this.personalList.friendship &&
        this.personalList.friendship == "inviting"
      ) {
        return "inviting";
      } else if (
        this.personalList.friendship &&
        this.personalList.friendship == "is_friend"
      ) {
        return "is_friend";
      }
    }
  },
  created() {
    this.avatarSrc = this.personalList.avatar
      ? this.personalList.avatar.low
      : "https://picsum.photos/170/170";
    this.coverSrc = this.personalList.cover
      ? this.personalList.cover
      : "https://picsum.photos/1170/400";
  },

  methods: {
    ...mapActions("account", [
      "accountPersonalEditAvatar",
      "accountPersonalEditCover",
      "accountPersonalList"
    ]),
    ...mapActions("social", [
      "inviteFriend",
      "getListInvite",
      "deleteFriend",
      "deleteFollow",
      "createFollow"
    ]),
    handleInviteFriendNone() {
      const data = {
        friend_id: this.$route.params.id
      };
      this.inviteFriend(data).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.accountPersonalList(this.$route.params.id);
        } else {
          this.$toasted.error(result.message);
        }
      });
    },
    handleCancelInvite() {
      const id = this.$route.params.id;
      // console.log("_id", id);
      this.deleteFriend(id).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.accountPersonalList(id);
        } else {
          this.$toasted.error(result.message);
        }
      });
    },
    handleCreateFollow() {
      const data = {
        followed_user_id: this.$route.params.id
      };
      this.createFollow(data).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.accountPersonalList(this.$route.params.id);
        } else {
          this.$toasted.error(result.message);
        }
      });
    },
    handleUnFollow() {
      const data = {
        followed_user_id: this.$route.params.id
      };
      this.deleteFollow(data).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.accountPersonalList(id);
        } else {
          this.$toasted.error(result.message);
        }
      });
    },
    async handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
      const body = new FormData();
      body.append("avatar_images", fileList[0]);
      console.log("[avatar_images]", fileList[0]);
      this.accountPersonalEditAvatar(body).then(result => {});
    },
    async handleUploadCover(fileList, event) {
      this.cover = Array.from(fileList);

      getBase64(this.cover[0], src => {
        this.coverSrc = src;
      });
      const body = new FormData();
      body.append("cover_images", fileList[0]);
      console.log("[cover_images]", fileList[0]);
      this.accountPersonalEditCover(body).then(result => {});
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-cover.scss";
</style>


