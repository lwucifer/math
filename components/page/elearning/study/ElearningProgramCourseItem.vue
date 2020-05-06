<template>
  <div
    class="content elearning-lesson-side__lesson"
    :class="get(lesson, 'completes', 0) ? 'active' : ''"
  >
    <div class="lesson-title mb-2">
      <app-checkbox v-model="lesson.completes" />
      <p
        class="text-uppercase pl-1"
        style="cursor:pointer"
        @click="handleStuty"
      >
        {{ get(lesson, "name", "") }}
      </p>
    </div>
    <div class="bottom d-flex">
      <div>
        <IconPlay class="mr-2" />
        <span>{{ get(lesson, "duration", "") }}</span>
      </div>
      <div class="color-primary ml-auto" v-if="get(lesson, 'completes', 0)">
        <IconFileCheckAlt class="mr-2 fill-primary" height="16" width="16" />
        <span>Xem kết quả</span>
      </div>
      <div class="color-red ml-auto" v-else-if="!get(lesson, 'status', 0)">
        <IconFileEditAlt class="mr-2 fill-red" height="16" width="16" />
        <span>Làm bài tập</span>
      </div>
      <div class="color-yellow ml-auto" v-else>
        <IconFileClock class="mr-2 fill-yellow" height="16" width="16" />
        <span>Chờ chấm điểm</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconPlay from "~/assets/svg/icons/play.svg?inline";
import IconUpO from "~/assets/svg/icons/up-o.svg?inline";
import IconDownO from "~/assets/svg/icons/down-o.svg?inline";
import IconFileCheck from "~/assets/svg/design-icons/file-check.svg?inline";
import IconFileEditAlt from "~/assets/svg/design-icons/file-edit-alt.svg?inline";
import IconFileCheckAlt from "~/assets/svg/design-icons/file-check-alt.svg?inline";
import IconFileClock from "~/assets/svg/icons/file-clock.svg?inline";
import { get } from "lodash";
import {
  STUDY_LESSON_TYPE_VIDEO,
  STUDY_LESSON_TYPE_IMAGE,
} from "~/utils/event-type";
import StudyService from "~/services/elearning/study/Study";

// (VIDEO | ARTICLE | IMAGE | DOCS)

export default {
  components: {
    IconPlay,
    IconDownO,
    IconUpO,
    IconFileClock,
    IconFileCheckAlt,
    IconFileEditAlt,
    IconFileCheck,
  },
  props: {
    lesson: Object,
  },
  methods: {
    get,
    async handleStuty() {
      console.log(this.lesson);

      if (get(this, "lesson.format", "") === "HTML") {
        const payload = {
          name: STUDY_LESSON_TYPE_IMAGE,
          data: "",
        };
        this.$store.dispatch("event/pushEvent", payload);
        return;
      }

      const elearning_id = get(this, "$router.history.current.params.id", "");
      const lesson_id = get(this, "lesson.id", "");
      const res = await new StudyService(this.$axios)["studyLesson"](
        elearning_id,
        lesson_id
      );
      if (get(res, "success", false)) {
        const payload = {
          name: STUDY_LESSON_TYPE_VIDEO,
          data: get(res, "data", null),
        };
        this.$store.dispatch("event/pushEvent", payload);
        return;
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },
  },
};
</script>
