<template>
  <div class="elearning-id-box body-3 text-dark">
    <h2 class="mb-4">{{ get(info, "name", "") }}</h2>

    <div class="elearning-view__info">
      <n-link to="" class="author">
        <app-avatar :src="get(info, 'teacher.avatar.low', null)" :size="30" />
        <b class="name ml-3 font-13px">{{ get(info, "teacher.name", "") }}</b>
      </n-link>

      <div class="stars">
        <app-stars
          :stars="Math.floor(get(info, 'rates.averageRate', 0))"
          :size="14"
        />
        <strong class="ml-3">{{
          numeral(get(info, "rates.averageRate", 0)).format()
        }}</strong
        >&nbsp;
        <span class="font-13px"
          >({{ numeral(get(info, "rates.totalReview", 0)).format() }} đánh
          giá)</span
        >
      </div>

      <div class="views font-13px">
        <strong class="ml-2 mr-1">{{
          numeral(get(info, "total_view", 0)).format()
        }}</strong>
        lượt xem
      </div>
    </div>

    <img
      class="d-block w-100 mt-4 img-info"
      :src="get(info, 'cover_url.high', '')"
      alt=""
    />
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import numeral from "numeral";

export default {
  name: "E-learningDetail",

  computed: {
    ...mapState("elearning/detail", {
      info: "info",
    }),
  },

  methods: {
    get,
    numeral,
  },
};
</script>
