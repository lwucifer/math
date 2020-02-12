<template>
  <div class="elearning-lesson-side box11">
    <p class="mb-3">
      <strong>{{data.number}} Bài giảng</strong>
      ({{data.times}})
    </p>

    <div v-for="(item, index) in data.list" :key="index" class="elearning-lesson-side__item">
      <div class="title">
        <div @click="e => e.target.classList.toggle('active')" class="toggle">
          <strong class="title color-primary mb-2">{{item.name}}</strong>
          <IconUp class="up"/>
          <IconDown class="down"/>
        </div>
        <p class="color-999 font-size-12 mb-2">{{item.status}} - {{item.times}}</p>
      </div>

      <div
        class="content elearning-lesson-side__lesson"
        v-for="(lesson, j) in item.lessons"
        :key="j"
        :class="lesson.status ? 'active' : ''"
      >
        <div class="lesson-title mb-2">
          <p class="text-uppercase">{{lesson.name}}</p>
          <div class="check" :class="lesson.status ? 'checked' : ''">
            <IconTick v-if="lesson.status" height="12" width="12" />
          </div>
        </div>
        <div class="bottom d-flex">
          <div>
            <IconPlay class="mr-2" />
            <span>{{lesson.time}}</span>
          </div>
          <div :class="lesson.status ? 'color-primary' : 'color-red'" class="ml-auto">
            <IconPageTick class="mr-2" :class="lesson.status ? 'fill-primary' : 'fill-red'" />
            <span>Làm bài tập</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconPlay from "~/assets/svg/icons/play.svg?inline";
import IconTick from "~/assets/svg/icons/tick.svg?inline";
import IconPageTick from "~/assets/svg/icons/page-tick.svg?inline";
import IconUp from "~/assets/svg/icons/up.svg?inline";
import IconDown from "~/assets/svg/icons/down.svg?inline";

export default {
  components: {
    IconPlay,
    IconPageTick,
    IconDown,
    IconUp,
    IconTick
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      check: {}
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>