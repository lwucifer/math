<template>
  <div class="course-right-side">
    <img :src="banner" alt />
    <div class="price">
      Miễn phí
    </div>
    <app-button
      color="secondary"
      fullWidth
      square
      class="text-uppercase mt-3 mb-3"
      >Tham gia học</app-button
    >
    <ul class="info">
      <li><IconBook class="mr-2" />Trình độ: Lớp 10</li>
      <li><IconSubject class="mr-2" />Môn học: Toán</li>
      <li><IconLessons class="mr-2" />Số bài giảng: 1 bài</li>
      <li><IconClock class="mr-2" />Thời lượng: 15 phút</li>
      <li>
        <IconEye class="mr-2" />Xem được trên máy tính, điện thoại, tablet
      </li>
    </ul>
    <hr />
    <div class="mt-15 mb-3 d-flex">
      <a class="color-primary d-flex-center" href>
        <IconShare class="fill-primary mr-2" />Chia sẻ
      </a>
      <a class="color-red ml-auto d-flex-center" @click="handleFavourite">
        <IconHeart class="fill-red mr-2" />Yêu thích
      </a>
    </div>
  </div>
</template>
<script>
import BannerImage from "~/assets/images/tmp/money.png";
import IconShare from "~/assets/svg/icons/share.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconSubject from "~/assets/svg/icons/subject.svg?inline";
import IconLessons from "~/assets/svg/icons/lessons.svg?inline";
import IconClock from "~/assets/svg/icons/clock.svg?inline";
import IconEye from "~/assets/svg/icons/eye.svg?inline";
import { get } from "lodash";
import * as actionTypes from "../../../utils/action-types";

export default {
  components: {
    IconShare,
    IconHeart,
    IconEye,
    IconClock,
    IconLessons,
    IconSubject,
    IconBook
  },
  props: {
    date: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      banner: BannerImage
    };
  },

  methods: {
    async handleFavourite() {
      const elearning_id = get(this, "$route.params.id", "");
      const options = {
        elearning_id
      };
      await this.$store.dispatch(
        `elearning/study/study-favourite/${actionTypes.ELEARNING_STURY_FAVOURITE.ADD}`,
        options
      );
      this.$toasted.show("success");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-right-side.scss";
</style>
