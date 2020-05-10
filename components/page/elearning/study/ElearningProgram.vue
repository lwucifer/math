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
import ElearningProgramItem from "~/components/page/elearning/study/ElearningProgramItem";
import ElearningProgramCourse from "~/components/page/elearning/study/ElearningProgramCourse";

import { mapState } from 'vuex';

export default {
  components: {
    IconPlay,
    IconDownO,
    IconUpO,
    IconFileClock,
    IconFileCheckAlt,
    IconFileEditAlt,
    IconFileCheck,
    ElearningProgramItem,
    ElearningProgramCourse,
  },

  computed: {
    ...mapState("elearning/study/study-progress", ["progress"]),
  },

  created() {
    console.log(this.progress);
  },

  updated() {
    console.log(this.progress);
  },

  methods: { get },
};
</script>
