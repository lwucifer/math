<template>
  <div class="course-item-2">
    <div class="course-item-2__img">
      <n-link :to="to">
        <img :src="image" :alt="name" class="d-block w-100" />

        <div v-if="livestream" class="course-item-2__livestream">
          <IconCameraOnline class="icon" />Trực tiếp
        </div>

        <div v-if="livestream" class="course-item-2__label-livestream">Lớp học đang diễn ra</div>

        <div v-if="discount" class="course-item-2__discount">{{ discount }}%</div>
      </n-link>

      <!-- <div class="video" v-if="get(item, 'video', '')">
        <IconVideo3 />
      </div>-->
    </div>

    <div class="course-item-2__bottom">
      <h3 class="course-item-2__name">
        <n-link class="title" :to="to" :title="name">{{ name }}</n-link>
      </h3>

      <div class="course-item-2__teacher">
        <app-avatar :src="get(teacher, 'avatar.low', '')" :size="24" />
        <span>{{ get(teacher, 'name', '') }}</span>
      </div>

      <div class="course-item-2__rating">
        <app-stars class="d-inline-flex" :stars="averageRate" :size="14" />
        <span>
          <strong>{{ averageRate }}</strong>
          ({{ totalReview }})
        </span>
      </div>

      <div class="course-item-2__price-wrapper">
        <b v-if="free" class="text-primary body-1 font-weight-bold">Miễn phí</b>

        <template v-else>
          <s class="body-3">519.000đ</s>
          <b class="text-primary body-1 font-weight-bold ml-2">219.000đ</b>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { assignIn, get } from "lodash";
import numeral from "numeral";

import IconVideo3 from "~/assets/svg/icons/video3.svg?inline";
import IconCameraOnline from "assets/svg/icons/camera-online.svg?inline";

export default {
  components: {
    IconVideo3,
    IconCameraOnline
  },

  props: {
    to: {
      type: String,
      default: ""
    },
    image: String,
    livestream: Boolean,
    discount: Number,
    name: String,
    teacher: {
      type: Object,
      validator: value => ["id", "avatar", "name"].every(key => key in value)
    },
    averageRate: Number,
    totalReview: Number,
    price: Number,
    originalPrice: Number,
    free: Boolean
  },

  methods: {
    get,
    numeral
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-item-2.scss";
</style>
