<template>
  <div class="elearning-lesson-side">
    <div class="box11 mb-4 pb-0" v-if="get(info, 'ol_classes.length', 0)">
      <h6>Phòng học online</h6>
      <div
        v-for="(item, index) in get(info, 'ol_classes', [])"
        :key="index"
        class="elearning-lesson-side__class"
      >
        <div class="d-flex">
          <span>{{ index }}. {{ item.name }}</span>
          <!-- <app-checkbox v-model="item.status" class="ml-auto" /> -->
        </div>
        <div class="d-flex-center mt-3">
          <div class="color-999 d-flex-center" v-if="item.status">
            <IconPlay class="mr-2" />
            <span>Đang diễn ra</span>
          </div>
          <!-- <div class="d-flex-center color-red ml-auto" v-if="item.done">
            <IconFileCheck class="mr-2 fill-red" height="16" width="16" />
            <span>Làm bài tập</span>
          </div> -->
        </div>
      </div>
    </div>

    <div class="box11">
      <p class="mb-3">
        <strong>{{ get(progress, "total_lessons", 0) }} Bài giảng</strong>
        ({{ get(progress, "duration", "") }})
      </p>

      <div
        v-for="(item, index) in get(progress, 'programs', [])"
        :key="index"
        class="elearning-lesson-side__course"
      >
        <div class="elearning-lesson-side__course-title">
          <div>
            <strong class="color-primary mb-2">
              Chương {{ index + 1 }}: {{ get(item, "chapter", "") }}</strong
            >
            <!-- <p class="color-999 font-size-12" v-if="!ids.includes(item.id)">
              {{ item.done }} - {{ item.times }}
            </p> -->
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="ids" :value="item.id" />
            <IconUpO class="up" v-if="ids.includes(item.id)" />
            <IconDownO class="down" v-else />
          </label>
        </div>

        <div
          v-if="ids.includes(item.id)"
          class="elearning-lesson-side__lessons mt-3"
        >
          <div
            class="content elearning-lesson-side__lesson"
            v-for="(lesson, j) in item.lessons"
            :key="j"
            :class="lesson.completes ? 'active' : ''"
          >
            <div class="lesson-title mb-2">
              <app-checkbox v-model="lesson.completes" />
              <p class="text-uppercase pl-1">{{ lesson.name }}</p>
            </div>
            <div class="bottom d-flex">
              <div>
                <IconPlay class="mr-2" />
                <span>{{ lesson.duration }}</span>
              </div>
              <div class="color-primary ml-auto" v-if="lesson.completes">
                <IconFileCheckAlt
                  class="mr-2 fill-primary"
                  height="16"
                  width="16"
                />
                <span>Xem kết quả</span>
              </div>
              <div class="color-red ml-auto" v-else-if="!lesson.status">
                <IconFileEditAlt class="mr-2 fill-red" height="16" width="16" />
                <span>Làm bài tập</span>
              </div>
              <div class="color-yellow ml-auto" v-else>
                <IconFileClock
                  class="mr-2 fill-yellow"
                  height="16"
                  width="16"
                />
                <span>Chờ chấm điểm</span>
              </div>
            </div>
          </div>
        </div>
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
    data: {
      type: Object,
      default: () => {},
    },
    info: {},
    progress: {},
  },

  updated() {
    console.log(this.progress)
  },

  data() {
    return {
      ids: [],
      check: {},
    };
  },

  methods: { get },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>
