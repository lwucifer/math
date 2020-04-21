<template>
  <div class="course-teacher-info">
    <div class="teacher-top">
      <app-avatar
        :src="get(teacher, 'avatar.medium', 'https://picsum.photos/125/125')"
        :size="125"
      />
      <div class="info">
        <h4 class="name">{{ get(teacher, "name", "") }}</h4>
        <p>{{ get(teacher, "school_name", "") }}</p>
        <div class="stars">
          <app-stars :stars="Math.floor(get(teacher, 'rate', 0))" :size="16" />
        </div>
      </div>

      <div class="right">
        <div>
          <strong class="color-primary">
            {{ get(teacher, "elearning_total", 0) }}
          </strong>
          Bài giảng/khoá học
        </div>
        <div>
          <strong class="color-primary">
            {{ get(teacher, "participant_total", 0) }}
          </strong>
          Học viên
        </div>
      </div>
    </div>

    <div class="mt-4 teacher-bottom">
      <h4 class="mb-3">Tiểu sử</h4>
      {{ get(teacher, "description", "") }}
      <div class="text-center my-3">
        <n-link class="text-decoration-none" to="">Xem thêm</n-link>
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
    IconStarO,
  },

  props: {
    teacher: {
      type: Object,
    },
  },

  created() {
    this.fetchTeacherInfo();
  },

  watch: {
    "teacher.id": function(id) {
      this.fetchTeacherInfo();
    },
  },

  methods: {
    get,
    fetchTeacherInfo() {
      const options = {
        params: {
          id: get(this, "teacher.id", ""),
        },
      };
      this.$store.dispatch(
        `elearning/public/public-elearning-teacher/${actionTypes.ELEARNING_PUBLIC_ELEARNING_TEACHER.LIST}`,
        options
      );
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-teacher-info.scss";
</style>
