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
              :stars="Math.floor(get(teacher, 'rate', 0))"
              :size="14"
            />
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

export default {
  components: {
    IconStar,
    IconStarO,
  },

  props: {
    teacher_id: {
      type: String,
      default: "",
    },
  },

  created() {
    useEffect(this, this.getTeacher.bind(this), ["teacher_id"]);
  },

  computed: {
    ...mapState("elearning/public/public-elearning-teacher", {
      teacher: "teacher",
    }),
  },

  methods: {
    get,
    getTeacher() {
      const options = {
        params: {
          teacher_id: get(this, "teacher_id", ""),
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
