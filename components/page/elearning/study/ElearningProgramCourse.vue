<template>
  <div class="e-program-course">
    <a href @click.prevent class="e-program-course__title" @click="toggleExpand">
      <div class="e-program-course__heading-wrapper">
        <h5 class="e-program-course__heading">
          Chương {{ index + 1 }}:
          <span class="text-base">{{ get(program, "chapter", "") }}</span>
        </h5>
        <span class="caption">{{ lessionCompleted }} | {{ get(program, "duration", 0) | formatHour }}</span>
      </div>
      <span
        v-if="get(program, 'lessons', []).length"
        class="e-program-course__icon-toggle"
        :class="{ active: expand }"
      >
        <IconAngleDown class="icon" />
      </span>
    </a>

    <transition-group enter-active-class="animated faster fadeIn">
      <ElearningProgramItem
        v-for="lesson in get(program, 'lessons', [])"
        v-show="expand"
        :key="lesson.id"
        :lesson="lesson"
      />
    </transition-group>
  </div>
</template>

<script>
import { get } from "lodash";

import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import ElearningProgramItem from "~/components/page/elearning/study/ElearningProgramItem";
import { LESSION_STATUS } from '../../../../utils/constants';

export default {
  components: {
    IconAngleDown,
    ElearningProgramItem
  },

  props: {
    program: {},
    index: {}
  },

  data() {
    return {
      check: {},
      expand: false
    };
  },

  computed: {
    lessionCompleted() {
      const lessons = get(this.program, "lessons", []);
      const total_lessons = get(this.program, "total_lessons", 0);
      const completed = lessons.filter( l => l.status == LESSION_STATUS.COMPLETED) || [];
      return `${completed.length}/${total_lessons}`;
    }
  },

  methods: {
    get,

    toggleExpand() {
      this.expand = !this.expand;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_elearning-program-course.scss";
</style>
