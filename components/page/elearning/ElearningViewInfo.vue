<template>
  <fragment>
    <h2>{{ get(info, "name", "") }}</h2>
    <div class="elearning-view__info">
      <div class="author">
        <app-avatar :src="get(info, 'teacher.avatar.low', null)" :size="32" />
        <span class="name ml-2">{{ get(info, "teacher.name", "") }}</span>
      </div>

      <div class="views ml-auto">
        <IconEye />
        <strong class="ml-2 mr-1">{{ get(info, "total_view", 0) }}</strong>
        lượt xem
      </div>

      <div class="stars">
        <app-stars
          :stars="Math.floor(get(info, 'rates.averageRate', 0))"
          :size="16"
        />
        <strong class="ml-3">{{ get(info, "rates.averageRate", 0) }}</strong
        >&nbsp;
        <span class="text-sub">({{ get(info, "rates.totalReview", 0) }})</span>
      </div>
    </div>
  </fragment>
</template>

<script>
import { get } from "lodash";

import IconEye from "~/assets/svg/icons/eye.svg?inline";

export default {
  name: "E-learningDetail",

  props: {
    info: {},
  },

  components: {
    IconEye,
  },

  methods: {
    get,
  },
};
</script>
