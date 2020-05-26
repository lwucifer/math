<template>
  <div class="wrap__elearning-item">
    <div class="img__elearning-item">
      <n-link
        :to="`/elearning/${elearning && elearning.elearning_id}`"
      >
        <img
          v-lazy="elearning && elearning.avatar && elearning.avatar.low ? elearning.avatar.low : 'https://picsum.photos/20/206'"
        />
      </n-link>
    </div>
    <div class="wrap-content_Elearning">
      <h3 class="name_elearning-item">
        <n-link
          :to="`/elearning/${elearning && elearning.elearning_id}`"
          :title="elearning.name"
        >{{elearning && elearning.name}}</n-link>
      </h3>
      <div class="d-flex align-items-center my-3">
        <n-link
          :to="`/public/profile/teacher?user_id=${elearning.teacher.id}`"
          class="profile-link"
          target="_blank"
        >
          <app-avatar
            :src="elearning && elearning.teacher.avatar && elearning.teacher.avatar.low ? elearning.teacher.avatar.low : 'https://picsum.photos/20/206'"
            :size="20"
          />
          <span
            class="ml-2"
          >{{elearning && elearning.teacher.name ? elearning && elearning.teacher.name : 'Nguyễn Văn C'}}</span>
        </n-link>
        <!--<app-avatar-->
        <!--:src="elearning && elearning.teacher.avatar && elearning.teacher.avatar.low ? elearning.teacher.avatar.low : 'https://picsum.photos/20/206'"-->
        <!--:size="20"-->
        <!--/>-->
        <!--<span-->
        <!--class="ml-2"-->
        <!--&gt;{{elearning && elearning.teacher.name ? elearning && elearning.teacher.name : 'Nguyễn Văn C'}}</span>-->
      </div>
      <div class="proccess-bar-study-border">
        <div class="percent-proccess" v-bind:style="{width: elearning && elearning.progress +'%'}"></div>
      </div>
      <div class="d-flex">
        <span>
          Đã hoàn thành
          <strong class="text-primary">{{elearning && elearning.progress}}%</strong>
        </span>
        <div class="ml-auto">
          <app-dropdown
            class="post__menu-dropdown"
            position="right"
            open-on-click
            v-model="menuDropdown"
            :content-width="'15rem'"
          >
            <button slot="activator" slot-scope="{ on }" v-on="on">
              <IconDots class="icon fill-gray" />
            </button>

            <ul class="link--dropdown__ElearningItem">
              <li class="item-share__ElearningItem" @click.prevent="shareDropdown=!shareDropdown">
                <v-popover
                  popoverClass="menu-share-elearning-tooltip"
                  placement ="right"
                  trigger="hover"
                >
                  <n-link class="pr-2" to>
                    <IconShare24px class="icon" />Chia sẻ
                  </n-link>
                  <template slot="popover">
                    <ul class="share-dropdowm__ElearningItem">
                      <li @click.prevent="shareFb(elearning.elearning_id)">
                        <IconFacebook class="icon fill-info" />Chia sẻ qua Facebook
                      </li>
                      <li @click.prevent="shareSchool(elearning)">
                        <IconSchooly class="icon fill-white" />Chia sẻ qua Schoolly
                      </li>
                    </ul>
                  </template>
                 </v-popover>
              </li>
              <li
                v-if="elearning && !elearning.is_favourite"
                @click.prevent="handleFavourite(elearning.elearning_id)"
              >
                <n-link to>
                  <IconCardsHeart class="icon" />Yêu thích
                </n-link>
              </li>
              <li v-else @click.prevent="handleDeleteFavourite(elearning.elearning_id)">
                <n-link to class="text-primary">
                  <IconCardsHeart class="icon" />Bỏ yêu thích
                </n-link>
              </li>
              <li
                v-if="elearning && !elearning.is_archive"
                @click.prevent="handleArchive(elearning.elearning_id)"
              >
                <n-link to>
                  <IconArchive class="icon" />Lưu trữ
                </n-link>
              </li>
              <li v-else @click.prevent="handleDeleteArchive(elearning.elearning_id)">
                <n-link to class="text-primary">
                  <IconUnArchive class="icon" />Bỏ lưu trữ
                </n-link>
              </li>
            </ul>
          </app-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconCardsHeart from "~/assets/svg/v2-icons/cards-heart.svg?inline";
import IconShare24px from "~/assets/svg/v2-icons/share_24px.svg?inline";
import IconUnArchive from "~/assets/svg/v2-icons/un-archive.svg?inline";
import IconArchive from "~/assets/svg/design-icons/archive.svg?inline";
import IconFacebook from "~/assets/svg/design-icons/facebook.svg?inline";
import IconSchooly from "~/assets/svg/icons/schooly.svg?inline";
import { get } from "lodash";
import { mapActions, mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
export default {
  components: {
    IconDots,
    IconCardsHeart,
    IconShare24px,
    IconUnArchive,
    IconArchive,
    IconFacebook,
    IconSchooly
  },
  data() {
    return {
      menuDropdown: false,
      shareDropdown: false,
      id: "",
      name: "",
      avatar: "",
      teacher: {
        avatar: "",
        name: ""
      },
      progress: null,
      is_favourite: false
    };
  },
  props: {
    elearning: {
      default: null
    }
  },
  computed: {
    ...mapState("elearning/study/study-student", {
      elearningStudyStudent: "elearningStudyStudent"
    })
  },
  methods: {
    handleFavourite(id) {
      this.menuDropdown = false;
      this.$emit("handleFavourite", id);
    },
    handleDeleteFavourite(id) {
      this.menuDropdown = false;
      this.$emit("handleDeleteFavourite", id);
    },
    handleArchive(id) {
      this.menuDropdown = false;
      this.$emit("handleArchive", id);
    },
    handleDeleteArchive(id) {
      this.menuDropdown = false;
      this.$emit("handleDeleteArchive", id);
    },
    shareFb(id) {
      this.$emit("shareFb", id);
      // const url =
      //   "https://facebook.com/sharer.php?display=popup&u=" +
      //   window.origin +
      //   `elearning/${id}`;
      // window.open(url, "sharer", "_blank");
    },
    async shareSchool(elearning) {
      this.$emit("shareSchool", elearning);
      // const link = window.origin + `/elearning/${id}`;
      // const doAdd = await this.$store.dispatch(
      //   `social/${actionTypes.SOCIAL.ADD_POST}`,
      //   { link: link }
      // );
      // if (doAdd.success) {
      //   this.menuDropdown = false;
      //   this.$toasted.show("Đã chia sẻ thành công.");
      // } else {
      //   this.$toasted.error(doAdd.message);
      // }
    }
  },
  created() {
    // console.log("[props] elearning", this.elearning);
    // this.elearning_id = get(this, "elearning.elearning_id", "");
    // this.name = get(this, "elearning.name", "");
    // this.avatar = get(this, "elearning.avatar.low", "");
    // this.teacher.avatar = get(this, "elearning.teacher.avatar.low", "");
    // this.teacher.name = get(this, "elearning.teacher.name", "");
    // this.progress = get(this, "elearning.progress", "");
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-my-courses";
</style>