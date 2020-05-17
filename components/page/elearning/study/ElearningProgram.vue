<template>
  <div class="e-program bg-white shadow-1">
    <div class="box bg-light-2">
      <strong>{{ get(progress, "total_lessons", 0) }} Bài học</strong>
      ({{ get(progress, "duration", "") }})
    </div>

    <app-divider class="my-0" color="disabled" />

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
    <a v-if="tests" class="e-program__test" href @click.prevent="handleDoTest">
      <IconFileAlt class="icon" />&nbsp;Làm bài kiểm tra
    </a>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { STUDY_MODE, EXERCISE_CATEGORIES } from "~/utils/constants";

import IconFileAlt from "~/assets/svg/design-icons/file-alt.svg?inline";
import ElearningProgramItem from "~/components/page/elearning/study/ElearningProgramItem";
import ElearningProgramCourse from "~/components/page/elearning/study/ElearningProgramCourse";

export default {
  components: {
    IconFileAlt,
    ElearningProgramItem,
    ElearningProgramCourse
  },

  computed: {
    ...mapState("elearning/study/study-progress", ["progress"]),
    ...mapGetters("elearning/study/study-exercise", ["tests"])
  },

  methods: {
    get,

    ...mapMutations("event", ["setStudyMode"]),
    ...mapMutations("elearning/study/study-exercise", [
      "setStudyExerciseCurrentLession",
    ]),

    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyElearningExerciseList"
    ]),

    handleDoTest() {
      console.log("[handleDoTest]", this.progress);

      // emit studyMode=DO_EXERCISE
      this.setStudyMode(STUDY_MODE.DO_EXERCISE);
      this.setStudyExerciseCurrentLession(null);

      // get list TEST
      const testReq = {
        elearning_id: this.progress.id,
        category: EXERCISE_CATEGORIES.TEST
      };
      this.elearningSudyElearningExerciseList(testReq);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_elearning-program.scss";
</style>