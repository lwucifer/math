<template>
  <div class="wrap__elearning-item">
    <div class="img__elearning-item">
      <img
        :src="elearning && elearning.avatar && elearning.avatar.low ? elearning.avatar.low : 'https://picsum.photos/20/206'"
      />
    </div>
    <div class="wrap-content_Elearning">
      <n-link
        class="name_elearning-item"
        :to="`/elearning/${elearning && elearning.elearning_id}`"
        :title="elearning.name"
      >{{elearning && elearning.name}}</n-link>
      <div class="d-flex align-items-center my-3">
        <n-link :to="`/public/profile/teacher?user_id=${elearning.teacher.id}`" class="profile-link" target="_blank">
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
                <n-link to >
                  <IconShare24px class="icon" />Chia sẻ
                </n-link>
                <ul class="share-dropdowm__ElearningItem" v-if="shareDropdown">
                  <li>
                    <a>Facebook</a>
                  </li>
                  <li>
                    <a>Schoolly</a>
                  </li>
                </ul>
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
import { get } from "lodash";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    IconDots,
    IconCardsHeart,
    IconShare24px,
    IconUnArchive,
    IconArchive
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