<template>
  <div class="the-header">
    <div class="container-fluid the-header__content">
      <div class="the-header__logo">
        <n-link to="/">
          <Logo />
        </n-link>
      </div>

      <div class="the-header__function-menu">
        <slot name="functionMenu"></slot>
      </div>

      <div class="the-header__right">
        <div class="d-flex-center">
          <div class="percent mr-3">
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
                <IconTick class="mr-3" />Đã hoàn thành
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
import IconTick from "~/assets/svg/icons/tick.svg?inline";
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconClose from "~/assets/svg/v2-icons/close_24px.svg?inline";

import { mapState } from "vuex";

export default {
  components: {
    IconCup,
    IconCaretDown,
    IconCaretUp,
    IconTick,
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/header-frame/_header-frame.scss";
.the-header {
  padding: 0;
}
.header-dropbox {
  position: relative;
  padding: 2rem 0;
  &:hover {
    .content {
      opacity: 1;
      visibility: visible;
    }
  }
  .content {
    position: absolute;
    right: -1.5rem;
    top: 100%;
    width: 29rem;
    opacity: 0;
    visibility: hidden;
    > div {
      margin-top: 20px;
      background: #fff;
      padding: 2rem;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.06);
    }
    .icon-up {
      float: right;
      margin-right: 1rem;
      margin-top: 11px;
    }
  }
}
.percent {
  position: relative;
  height: 3.2rem;
  width: 3.2rem;
  .percent-cup {
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
  }
}
.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

.circle {
  stroke: #4cc790;
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
  position: relative;
  z-index: 9;
  &.circle-bg {
    stroke: #e0e0e0;
    position: relative;
    z-index: 1;
    animation: progress 200ms ease-out forwards;
  }
}

.the-header-btn-exit {
  font-weight: 500;
  margin-left: 2.1em;
  height: 3.7rem;

  .icon {
    font-size: 2rem;
  }
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
</style>
