<template>
  <div class="eh-personal-box">
    <div class="eh-personal-box__img">
      <n-link to>
        <img :src="image" :alt="name" class="d-block w-100" />

        <div v-if="livestream" class="eh-personal-box__livestream">
          <IconCameraOnline class="icon" />Trực tiếp
        </div>

        <div v-if="onlineClass" class="eh-personal-box__online-class">Lớp học đang diễn ra</div>

        <div v-if="discount" class="eh-personal-box__discount">{{ discount }}%</div>
      </n-link>
    </div>

    <div class="eh-personal-box__right">
      <h3 class="eh-personal-box__name">
        <n-link to>{{ name }}</n-link>
      </h3>

      <div class="eh-personal-box__teacher">
        <app-avatar :src="get(teacher, 'avatar.low', '')" :size="39" />
        <span class="eh-personal-box__teacher-name ml-3">Lily Edwards</span>
        <app-stars :stars="averageRate || 0" class="ml-4 mr-3" />
        <span class="text-dark">
          <b>{{ averageRate || 0 }}</b>
          ({{ totalReview || 0 }})
        </span>
      </div>

      <div class="eh-personal-box__desc" v-if="description">{{ description }}</div>

      <div class="eh-personal-box__bottom">
        <app-button class="mr-4" nuxt :to="to">Xem chi tiết</app-button>
        <div>
          <s>519.000đ</s>
          <b class="text-primary heading-3 ml-3">219.000đ</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import IconCameraOnline from "assets/svg/icons/camera-online.svg?inline";

export default {
  components: {
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
    description: String,
    price: Number,
    originalPrice: Number,
    free: Boolean,
    onlineClass: Boolean
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/home/_elearning-home-personal-box.scss";
</style>