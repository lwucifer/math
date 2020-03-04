<template>
  <div class="course-teacher-info">
    <div class="teacher-top">
      <app-avatar
        :src="get(_teacher, 'avatar', 'https://picsum.photos/125/125')"
        :size="125"
      />
      <div class="info">
        <h4 class="name">{{ get(_teacher, "name", "") }}</h4>
        <p>Giảng viên</p>
        <div class="stars">
          <app-stars :stars="Math.floor(get(_teacher, 'rate', 0))" />
        </div>
      </div>

      <div class="right">
        <div>
          <strong class="color-primary">{{
            get(_teacher, "elearning_total", 0)
          }}</strong>
          Khóa học
        </div>
        <div>
          <strong class="color-primary">{{
            get(_teacher, "participant_total", 0)
          }}</strong>
          Học viên
        </div>
      </div>
    </div>

    <div class="mt-4 teacher-bottom">
      <h4 class="mb-3">Tiểu sử</h4>
      {{ get(_teacher, "description", "") }}
      <div class="text-center mt-4 mb-3">
        <a class="btn-load-more">Xem thêm</a>
      </div>
    </div>
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";
import * as actionTypes from "~/utils/action-types";
import { mapState } from "vuex";
import { get } from "lodash";

export default {
  components: {
    IconStar,
    IconStarO
  },

  props: {
    teacher: {
      type: Object,
      required: true,
      default: () => null
    }
  },

  created() {
    const options = {
      params: {
        id: get(this, "teacher.id", "")
      }
    };
    this.$store.dispatch(
      `elearning/public/public-elearning-teacher/${actionTypes.ELEARNING_PUBLIC_ELEARNING_TEACHER.LIST}`,
      options
    );
  },

  computed: {
    ...mapState("elearning/public/public-elearning-teacher", {
      _teacher: "teacher"
    })
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-teacher-info.scss";
</style>
