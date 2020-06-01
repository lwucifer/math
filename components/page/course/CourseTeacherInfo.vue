<template>
  <section class="elearning-id-box scroll-target" id="teacher">
    <h4 class="mb-4">Thông tin giáo viên</h4>
    <div class="course-teacher-info">
      <div class="teacher-top">
        <app-avatar
          :src="get(teacher, 'avatar.medium', 'https://picsum.photos/125/125')"
          :size="100"
        />
        <div class="info">
          <h5 class="name">{{ get(teacher, "name", "") }}</h5>
          <p class="body-3">{{ get(teacher, "school_name", "") }}</p>
          <div class="stars">
            <app-stars
              :stars="Math.ceil(get(teacher, 'rate', 0))"
              :size="14"
            />
            ({{ numeral(get(teacher, "rate", 0)).format('0,0.[00]') }})
          </div>
        </div>

        <div class="right">
          <div>
            <strong class="color-primary">{{
              numeral(get(teacher, "lesson_total", 0)).format()
            }}</strong>
            Bài giảng
          </div>
          <div>
            <strong class="color-primary">{{
              numeral(get(teacher, "elearning_total", 0)).format()
            }}</strong>
            Khóa học
          </div>
        </div>
      </div>

      <div class="mt-4 teacher-bottom">
        <h4 class="mb-3">Tiểu sử</h4>
        <div
          v-if="get(teacher, 'biography', '')"
          v-html="get(teacher, 'biography', '')"
        ></div>
        <div v-else class="text-center caption text-gray-2">
          Chưa có nội dung.
        </div>
        <!-- <div class="text-center mt-3">
          <n-link class="text-decoration-none" to="">Xem thêm</n-link>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { get } from "lodash";
import { useEffect } from "~/utils/common";
import numeral from "numeral";

export default {
  components: {
    IconStar,
    IconStarO,
  },

  computed: {
    ...mapState("elearning/detail", {
      teacher: "teacher",
    }),
  },

  methods: {
    get,
    numeral,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-teacher-info.scss";
</style>
