<template>
  <div class="eh-personal-box">
    <div class="eh-personal-box__img">
      <n-link to>
        <img :src="image" :alt="title" />
      </n-link>
    </div>

    <div class="eh-personal-box__right">
      <h3 class="eh-personal-box__title">
        <n-link to>{{ title }}</n-link>
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
        <app-button class="mr-4">Xem chi tiết</app-button>
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

export default {
  props: {
    image: String,
    title: String,
    teacher: {
      type: Object,
      validator: value => ["id", "avatar", "name"].every(key => key in value)
    },
    averageRate: Number,
    totalReview: Number,
    description: String,
    price: Number,
    originalPrice: Number,
    free: Boolean
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/home/_elearning-home-personal-box.scss";
</style>