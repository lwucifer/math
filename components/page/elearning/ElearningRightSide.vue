<template>
  <div class="elearning-right-side">
    <img :src="get(info, 'avatar.high', 'https://picsum.photos/330/204')" alt />
    <div class="price">Miễn phí</div>
    <app-button color="secondary" fullWidth square class="text-uppercase mt-3 mb-3">Tham gia học</app-button>
    <ul class="info">
      <li>
        <IconBook class="mr-2" />
        Trình độ: {{ program.level || '' }}
      </li>
      <li>
        <IconSubject class="mr-2" />
        Môn học: {{ program.subject || '' }}
      </li>
      <li>
        <IconLessons class="mr-2" />
        Số bài giảng: {{ program.lessons || 0 }} bài
      </li>
      <li>
        <IconClock class="mr-2" />
        Thời lượng: {{ program.duration || 0 }} phút
      </li>
      <li>
        <IconEye class="mr-2" />Xem được trên máy tính, điện thoại, tablet
      </li>
    </ul>
    <hr />
    <div class="mt-15 mb-3 d-flex">
      <a class="color-primary d-flex-center">
        <IconShare class="fill-primary mr-2" />Chia sẻ
      </a>
      <a class="color-red ml-auto d-flex-center">
        <IconHeart class="fill-red mr-2" />Yêu thích
      </a>
    </div>
  </div>
</template>
<script>
import { get } from "lodash";
import IconShare from "~/assets/svg/icons/share.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBook from "~/assets/svg/icons/book.svg?inline";
import IconSubject from "~/assets/svg/icons/subject.svg?inline";
import IconLessons from "~/assets/svg/icons/lessons.svg?inline";
import IconClock from "~/assets/svg/icons/clock.svg?inline";
import IconEye from "~/assets/svg/icons/eye.svg?inline";

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
    info: {
      type: Object,
      default: () => ({}),
      validator: value => ["avatar"].every(key => key in value)
    },
    program: {
      type: Object,
      default: () => ({}),
      validator: value =>
        ["level", "subject", "lessons", "duration"].every(key => key in value)
    }
  },

  data() {
    return {};
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-right-side.scss";
</style>