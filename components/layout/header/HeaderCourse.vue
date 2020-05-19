<template>
  <div class="the-header the-header--course">
    <div class="container-fluid the-header__content">
      <div class="the-header__logo">
        <n-link to="/">
          <Logo />
        </n-link>
      </div>
      
      <app-divider class="the-header__divider" color="disabled" direction="vertical" />

      <h1 class="the-header__course-title">{{ title }}</h1>

      <div class="the-header__function-menu">
        <slot name="functionMenu"></slot>
      </div>

      <div class="the-header__right">
        <div class="d-flex-center">
          <div class="percent mr-3" :class="{ 'complete': percent == 100 }">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path
                class="circle-bg circle"
                stroke-dasharray="100 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="circle"
                :stroke-dasharray="percent + ` 100`"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div class="percent-cup">
              <IconCup />
            </div>
          </div>

          <div class="header-dropbox">
            <div class="top">
              <strong class="color-primary">Tiến độ học tập</strong>
              <IconCaretDown class="fill-primary" height="10" width="10" />
            </div>
            <div class="content">
              <IconCaretUp class="fill-white icon-up" />
              <div>
                <IconDone class="icon heading-3 text-primary mr-3" />Đã hoàn thành
                {{ learningProgress }} bài giảng
              </div>
            </div>
          </div>
        </div>

        <app-button class="the-header-btn-exit" @click="$emit('exit')">
          <IconClose class="icon fill-opacity-1 mr-2" /> Thoát
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import IconCup from "~/assets/svg/icons/cup.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconCaretUp from "~/assets/svg/icons/caret-up.svg?inline";
import IconDone from '~/assets/svg/v2-icons/done_24px.svg?inline';
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconClose from "~/assets/svg/v2-icons/close_24px.svg?inline";

import { mapState } from "vuex";

export default {
  components: {
    IconCup,
    IconCaretDown,
    IconCaretUp,
    IconDone,
    Logo,
    IconClose
  },

  props: {
    data: {}
  },

  data: () => ({
    showLogin: false,
    percent: 69
  }),
  methods: {
    redirectSignin() {
      this.$router.push("/auth/signin");
    }
  },

  computed: {
    ...mapState("elearning/study/study-progress", ["progress"]),

    learningProgress() {
      console.log("[progress]", this.progress);
      if (!this.progress) return `0/0`;
      const completeLesson = this.progress.completes || 0;
      const totalLessons =
        this.progress.programs.reduce(
          (acc, curr) => acc + curr.total_lessons,
          0
        ) || 0;
      return `${completeLesson}/${totalLessons}`;
    },

    title() {
      const info = this.$store.state.elearning.study['study-info'].info;
      return info && info.name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/header-frame/_header-frame.scss";
@import "~/assets/scss/components/header-course/_header-course.scss";
</style>
