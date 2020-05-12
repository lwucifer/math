<template>
  <section class="elearning-id-box elearning-view__content">
    <h4 class="mb-4">Nội dung {{ title }}</h4>
    <div class="row flex-wrap info body-3">
      <div class="col-auto">
        Trình độ:
        <strong class="color-primary">{{ get(info, "level.name", "") }}</strong>
      </div>
      <div class="col-auto">
        Môn học:
        <strong class="color-primary">
          {{
          get(info, "subject.name", "")
          }}
        </strong>
      </div>
      <div class="col-auto">
        Số bài học:
        <strong class="color-primary">{{ get(info, "lessons", "0") }}</strong>
      </div>
      <div class="col-auto">
        Thời lượng:
        <strong
          class="color-primary"
        >{{ [info.duration && info.duration != "0:0" ? info.duration : "1:0", "m:s"] | moment("mm:ss") }}</strong>
      </div>
    </div>

    <ElearningContentLecture
      v-if="get(info, 'type', '') === 'LECTURE'"
      :lesson="get(program, '0.lessons.0', null)"
    />

    <ElearningContentCourse :program="program" v-if="get(info, 'type', '') === 'COURSE'" />
  </section>
</template>

<script>
const IconFileAlt = () =>
  import("~/assets/svg/design-icons/file-alt.svg?inline");
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
const IconPlayCircle = () =>
  import("~/assets/svg/design-icons/play-circle.svg?inline");
import { get } from "lodash";
import { useEffect } from "~/utils/common";
import * as actionTypes from "~/utils/action-types";
import ElearningContentLecture from "~/components/page/elearning/ElearningContentLecture";
import ElearningContentCourse from "~/components/page/elearning/ElearningContentCourse";

export default {
  components: {
    IconFileAlt,
    IconDownload,
    IconBooks,
    IconAngleDown,
    IconPlayCircle,
    ElearningContentLecture,
    ElearningContentCourse
  },
  props: {
    program: {},
    info: {}
  },
  created() {
    useEffect(this, this.handleGetLesson.bind(this), ["$route.params.id"]);
  },
  computed: {
    title() {
      switch (get(this, "info.type", "")) {
        case "LECTURE":
          return "bài giảng";
          break;
        case "COURSE":
          return "khoá học";
          break;
        default:
          break;
      }
    }
  },
  methods: {
    get,
    async handleGetLesson() {
      const options = {
        params: {
          elearning_id: get(this, "$route.params.id", "")
        }
      };
      this.$store.dispatch(
        `elearning/creating/creating-lesson/${actionTypes.ELEARNING_CREATING_LESSONS.LIST}`,
        options
      );
    }
  }
};
</script>
