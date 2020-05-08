<template>
  <div class="elearning-lesson-side__course">
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
        <input type="checkbox" v-model="ids" :value="get(program, 'id', '')" />
        <IconUpO class="up" v-if="ids.includes(get(program, 'id', ''))" />
        <IconDownO class="down" v-else />
      </label>
    </div>

    <div
      v-if="ids.includes(get(program, 'id', ''))"
      class="elearning-lesson-side__lessons mt-3"
    >
      <ElearningProgramItem
        v-for="(lesson, j) in get(program, 'lessons', [])"
        :key="j"
        :lesson="lesson"
      />
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
  },
  props: {
    program: {},
    index: {},
  },
  data() {
    return {
      ids: [],
      check: {},
    };
  },

  created() {
    console.log(this.program);
  },

  updated() {
    console.log(this.program);
  },

  methods: { get },
};
</script>
