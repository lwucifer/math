<template>
  <div class="elearning-id-box body-3 text-dark">
    <h2 class="mb-4">{{ get(info, "name", "") }}</h2>
    <div class="elearning-view__info">
      <div class="author">
        <app-avatar :src="get(info, 'teacher.avatar.low', null)" :size="30" />
        <b class="name ml-3">{{ get(info, "teacher.name", "") }}</b>
      </div>

      <div class="stars">
        <app-stars
          :stars="Math.floor(get(info, 'rates.averageRate', 0))"
          :size="14"
        />
        <strong class="ml-3">{{ get(info, "rates.averageRate", 0) }}</strong
        >&nbsp;
        <span>({{ get(info, "rates.totalReview", 0) }} đánh giá)</span>
      </div>

      <div class="views">
        <strong class="ml-2 mr-1">{{ get(info, "total_view", 0) }}</strong>
        lượt xem
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";

export default {
  name: "E-learningDetail",

  props: {
    info: {},
  },

  methods: {
    get,
  },
};
</script>
