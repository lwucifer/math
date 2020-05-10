<template>
  <div class="eh-teacher-card">
    <div class="eh-teacher-card__img">
      <img :src="image || require('~/assets/images/tmp/teacher-image.png')" :alt="name" />
    </div>

    <h3 class="eh-teacher-card__name heading-4">{{ name }}</h3>
    <div class="eh-teacher-card__school">{{ schoolName }}</div>
    <div class="eh-teacher-card__info">
      <div class="eh-teacher-card__count">
        <div class="eh-teacher-card__quantity">{{ numOfLecture }}</div>
        <div>Bài giảng</div>
      </div>
      <div class="eh-teacher-card__count">
        <div class="eh-teacher-card__quantity">{{ numOfCourse }}</div>
        <div>Khoá học</div>
      </div>
      <div class="eh-teacher-card__rating">
        <div class="text-dark mb-1">
          <b>{{ averageRate }}</b>&nbsp;({{ totalReview }})
        </div>
        <app-stars :size="13" :stars="averageRate" />
      </div>
    </div>

    <app-divider class="my-3" color="disabled" />

    <div
      class="eh-teacher-card__desc"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor vitae maecenas nec nisl ornare nec duis. Tempor, non</div>

    <app-button class="eh-teacher-card__btn" nuxt :to="to">Xem thêm</app-button>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ''
    },
    image: String,
    name: String,
    schoolName: String,
    numOfLecture: Number,
    numOfCourse: Number,
    averageRate: Number,
    totalReview: Number,
    description: String
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/home/_elearning-home-teacher-card.scss";
</style>