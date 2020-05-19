<template>
  <div class="course-item-2" :class="{ 'course-item-2--size-sm': this.size === 'sm' }">
    <div class="course-item-2__img">
      <n-link :to="to">
        <img :src="image" :alt="name" class="d-block w-100" />

        <div v-if="livestream" class="course-item-2__livestream">
          <IconCameraOnline class="icon" />Trực tiếp
        </div>

        <div v-if="livestream" class="course-item-2__online-class">Lớp học đang diễn ra</div>

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
        <n-link :to="`/public/profile/teacher?user_id=${get(teacher, 'id', '')}`" class="profile-link" target="_blank">
          <app-avatar :src="get(teacher, 'avatar.low', '')" :size="size === 'sm' ? 22 : 24" />
          <span>{{ get(teacher, 'name', '') }}</span>
        </n-link>
        <!--<app-avatar :src="get(teacher, 'avatar.low', '')" :size="size === 'sm' ? 22 : 24" />-->
        <!--<span>{{ get(teacher, 'name', '') }}</span>-->
      </div>

      <div class="course-item-2__rating">
        <app-stars class="d-inline-flex" :stars="averageRate" :size="size === 'sm' ? 12 : 14" />
        <span class="text-dark">
          <strong>{{ averageRate }}</strong>
          ({{ totalReview }})
        </span>
      </div>

      <div class="course-item-2__price-wrapper">
        <b v-if="free" class="text-primary body-1 font-weight-bold">Miễn phí</b>

        <template v-else>
          <s class="body-3" v-if="originalPrice != price">{{ originalPrice | numeralFormat }}đ</s>
          <b class="text-primary body-1 font-weight-bold ml-2">{{ price | numeralFormat }}đ</b>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { assignIn, get } from "lodash";
import numeral from "numeral";

// import IconVideo3 from "~/assets/svg/icons/video3.svg?inline";
import IconCameraOnline from "assets/svg/icons/camera-online.svg?inline";

export default {
  components: {
    // IconVideo3,
    IconCameraOnline
  },

  props: {
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md'].includes(value)
    },
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
    free: Boolean,
    onlineClass: Boolean
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
