<template>
  <div class="elearning-lesson-side">
    <div class="box11 mb-4 pb-0" v-if="data.classes && data.classes.length > 0">
      <h6>Phòng học online</h6>
      <div v-for="(item, index) in data.classes" :key="index" class="elearning-lesson-side__class">
        <div class="d-flex">
          <span>{{index + 1}}. {{item.name}}</span>
          <IconCalendar2 class="icon-calendar" />
        </div>
        <div class="d-flex-center mt-3">
          <div class="d-flex-center status-1" v-if="item.status == 1">
            <div class="icon">
              <IconCameraDot />
            </div>
            <span>Đang diễn ra</span>
          </div>
          <div class="d-flex-center status-2" v-if="item.status == 2">
            <div class="icon">
              <IconCamera2 />
            </div>
            <span>Sắp diễn ra - 11:50 AM, 10/12/2019</span>
          </div>
          <div class="d-flex-center status-2" v-if="item.status == 3">
            <div class="icon">
              <IconCamera2 />
            </div>
            <span>Thời gian học kế tiếp - 11:50 AM, 10/12/2019</span>
          </div>
        </div>
      </div>
    </div>

    <div class="box11">
      <p class="mb-3">
        <strong>{{data.number}} Bài giảng</strong>
        ({{data.times}})
      </p>
      {{data.name}}
      <div class="elearning-lesson-side__course">
        <div class="elearning-lesson-side__course-title">
          <div>
            <strong class="color-primary mb-2">{{data.name}}</strong>
            <p
              class="color-999 font-size-12"
              v-if="!ids.includes(data.id)"
            >{{data.done}} - {{data.times}}</p>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="ids" :value="data.id" />
            <IconUpO class="up" v-if="ids.includes(data.id)" />
            <IconDownO class="down" v-else />
          </label>
        </div>
        {{data.name}}
        <div class="elearning-lesson-side__lessons mt-3" v-if="ids.includes(data.id)"></div>

        <div class="elearning-lesson-side__lessons mt-3">
          <div
            class="content elearning-lesson-side__lesson"
            v-for="(lesson, j) in data.lessons"
            :key="j"
            :class="lesson.done ? 'active' : ''"
          >
            <div class="lesson-title mb-2">
              <app-checkbox v-model="lesson.done" />
              <p class="text-uppercase pl-1">{{lesson.name}}</p>
            </div>
            <div class="bottom d-flex">
              <div>
                <IconPlay class="mr-2" />
                <span>{{lesson.time}}</span>
              </div>
              <div class="color-primary ml-auto" v-if="lesson.done">
                <IconFileCheckAlt class="mr-2 fill-primary" height="16" width="16" />
                <span>Xem kết quả</span>
              </div>
              <div class="color-red ml-auto" v-else-if="!lesson.wait">
                <IconFileEditAlt class="mr-2 fill-red" height="16" width="16" />
                <span>Làm bài tập</span>
              </div>
              <div class="color-yellow ml-auto" v-else>
                <IconFileClock class="mr-2 fill-yellow" height="16" width="16" />
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
import IconFileCheck from '~/assets/svg/design-icons/file-check.svg?inline';
import IconFileEditAlt from '~/assets/svg/design-icons/file-edit-alt.svg?inline';
import IconFileCheckAlt from '~/assets/svg/design-icons/file-check-alt.svg?inline';
import IconFileClock from '~/assets/svg/icons/file-clock.svg?inline';
import IconCalendar from '~/assets/svg/icons/calendar.svg?inline';
import IconCalendar2 from '~/assets/svg/icons/calendar2.svg?inline';
import IconCamera2 from '~/assets/svg/icons/camera2.svg?inline';
import IconCameraDot from '~/assets/svg/icons/camera-dot.svg?inline';

export default {
  components: {
    IconPlay,
    IconDownO,
    IconUpO,
    IconFileClock,
    IconFileCheckAlt,
    IconFileEditAlt,
    IconFileCheck,
    IconCalendar,
    IconCalendar2,
    IconCamera2,
    IconCameraDot
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      ids: [],
      check: {}
    };
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>