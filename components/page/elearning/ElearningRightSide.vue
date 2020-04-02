<template>
  <div class="elearning-right-side">
    <!-- <img :src="get(info, 'avatar.medium', 'https://picsum.photos/330/204')" alt /> -->
    <img class="d-block w-100 mb-4" :src="`https://picsum.photos/330/204`" alt />

    <template v-if="info.free">
      <span v-if="info.free" class="elearning-right-side__price">Miễn phí</span>
      <app-button color="secondary" fullWidth square class="text-uppercase mb-4">Tham gia học</app-button>
    </template>

    <template v-else>
      <div class="elearning-right-side__price-wrapper">
        <template v-if="get(info, 'price.discount', 0)">
          <b
            class="elearning-right-side__price text-error"
          >{{ get(info, 'price.discount', 0) | numeralFormat }}đ</b>
          <s
            class="heading-4 text-gray-2"
          >{{ get(info, 'price.original_price', 0) | numeralFormat }}đ</s>
        </template>

        <b
          v-else
          class="elearning-right-side__price text-error"
        >{{ get(info, 'price.original_price', 0) | numeralFormat }}đ</b>
      </div>
      <app-button color="secondary" fullWidth square class="text-uppercase mb-4">Chọn mua</app-button>
      <!-- <app-alert class="mb-3" type="warning" size="sm">Bạn đã mua bài giảng này vào ngày 20/10/2019</app-alert> -->
    </template>

    <ul class="info">
      <li>
        <IconBook class="icon" />
        Trình độ: {{ program.level || '' }}
      </li>
      <li>
        <IconSubject class="icon" />
        Môn học: {{ program.subject || '' }}
      </li>
      <li>
        <IconLessons class="icon" />
        Số bài giảng: {{ program.lessons || 0 }} bài
      </li>
      <li>
        <IconClock class="icon" />
        Thời lượng: {{ program.duration || 0 }} phút
      </li>
      <li>
        <IconEye class="icon" />Xem được trên máy tính, điện thoại, tablet
      </li>
    </ul>
    <hr />
    <div class="my-3 d-flex">
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