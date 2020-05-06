<template>
  <div class="box11">
    <p class="mb-3">
      <strong>{{ get(progress, "total_lessons", 0) }} Bài giảng</strong>
      ({{ get(progress, "duration", "") }})
    </p>

    <div
      v-for="(program, index) in get(progress, 'programs', [])"
      :key="index"
      class="elearning-lesson-side__course"
    >
      <div class="elearning-lesson-side__course-title">
        <div>
          <strong class="color-primary mb-2">
            Chương {{ index + 1 }}: {{ get(program, "chapter", "") }}</strong
          >
          <!-- <p class="color-999 font-size-12" v-if="!ids.includes(item.id)">
              {{ item.done }} - {{ item.times }}
            </p> -->
        </div>
        <label class="toggle">
          <input type="checkbox" v-model="ids" :value="program.id" />
          <IconUpO class="up" v-if="ids.includes(program.id)" />
          <IconDownO class="down" v-else />
        </label>
      </div>

      <div
        v-if="ids.includes(program.id)"
        class="elearning-lesson-side__lessons mt-3"
      >
        <ElearningProgramCourseItem
          v-for="(lesson, j) in get(program, 'lessons', [])"
          :key="j"
          :lesson="lesson"
        />
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
import ElearningProgramCourseItem from "~/components/page/elearning/study/ElearningProgramCourseItem";

export default {
  components: {
    IconPlay,
    IconDownO,
    IconUpO,
    IconFileClock,
    IconFileCheckAlt,
    IconFileEditAlt,
    IconFileCheck,
    ElearningProgramCourseItem,
  },
  props: {
    progress: {},
  },
  data() {
    return {
      ids: [],
      check: {},
    };
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
