<template>
  <div class="box11">
    <p class="mb-3">
      <strong>{{ get(progress, "total_lessons", 0) }} Bài giảng</strong>
      ({{ get(progress, "duration", "") }})
    </p>

    <div v-if="progress.type === 'COURSE'">
      <ElearningProgramCourse
        v-for="(program, index) in get(progress, 'programs', [])"
        :program="program"
        :key="index"
        :index="index"
      />
    </div>
    <div v-else>
      <ElearningProgramItem :lesson="get(progress, 'programs.0.lessons.0', null)" />
    </div>

    <!-- Bai TEST -->
    <div class="elearning-lesson-side__course">
      <div class="color-yellow" style="display: flex;">
        <IconFileAlt class="mr-2 fill-yellow" height="16" width="16" />
        <span class="text-clickable" @click.prevent="handleDoTest">Làm bài kiểm tra</span>
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
import IconFileAlt from "~/assets/svg/design-icons/file-alt.svg?inline";
import { get } from "lodash";
import ElearningProgramItem from "~/components/page/elearning/study/ElearningProgramItem";
import ElearningProgramCourse from "~/components/page/elearning/study/ElearningProgramCourse";

import { mapState, mapMutations, mapActions } from "vuex";
import { STUDY_MODE, EXERCISE_CATEGORIES} from "~/utils/constants";

export default {
  components: {
    IconPlay,
    IconDownO,
    IconUpO,
    IconFileCheckAlt,
    IconFileEditAlt,
    IconFileCheck,
    IconFileAlt,
    ElearningProgramItem,
    ElearningProgramCourse
  },

  computed: {
    ...mapState("elearning/study/study-progress", ["progress"])
  },

  methods: {
    get,

    ...mapMutations("event", ["setStudyMode"]),

    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyElearningExerciseList",
    ]),

    handleDoTest() {
      console.log("[handleDoTest]", this.progress);

      // emit studyMode=DO_EXERCISE
      this.setStudyMode(STUDY_MODE.DO_EXERCISE);

      // get list TEST
      const testReq = {
        elearning_id: this.progress.id,
        category: EXERCISE_CATEGORIES.TEST,
      }
      this.elearningSudyElearningExerciseList(testReq);
    }
  }
};
</script>
