<template>
  <div>
    <div
      class="evlc-item mt-3"
      v-for="(chapter, index_chapter) in program"
      :key="chapter.chapter_id"
    >
      <div class="evlc-item__head">
        <div class="evlc-item__head-left mr-4">
          <b>Chương {{ index_chapter + 1 }}:</b> {{ get(chapter, "name", "") }}
        </div>
        <div class="evlc-item__head-right d-flex align-items-center ml-auto">
          <span class="mr-3">{{ get(chapter, "lessons.length", 0) }} Bài</span>
          <button class="evlc-item__btn evlc-item__btn-collapse active">
            <IconAngleDown class="icon" />
          </button>
        </div>
      </div>

      <div v-if="is_show_lesson">
        <div
          class="evlc-item__body bg-input-gray"
          v-for="(lesson, index_lesson) in get(chapter, 'lessons', [])"
          :key="index_lesson"
        >
          <div class="d-flex align-items-center py-3">
            <div class="d-flex align-items-center mr-4">
              <IconPlayCircle class="icon subheading mr-2 text-primary" />Bài
              {{ index_lesson + 1 }}: {{ get(lesson, "name", "") }}
            </div>
            <div class="ml-auto">{{ get(lesson, "duration", "") }}</div>
          </div>
          <app-divider class="my-0" />
        </div>
      </div>
    </div>

    <!-- <div class="evlc-item mb-3">
      <div class="evlc-item__head">
        <div class="evlc-item__head-left mr-4">
          <b>Chương 2:</b> Tạo và tối ưu tài khoản Instagram trên máy tính
        </div>
        <div class="evlc-item__head-right d-flex align-items-center ml-auto">
          <span class="mr-3">3 Bài</span>
          <button class="evlc-item__btn evlc-item__btn-collapse">
            <IconAngleDown class="icon" />
          </button>
        </div>
      </div>
    </div> -->

    <!-- <div class="download-item">
      <IconBooks class="fill-primary mr-3" />Tài liệu đính kèm
      <a
        href
        class="ml-auto color-primary d-flex-center font-weight-bold text-decoration-none"
      >
        Tải về
        <IconDownload class="ml-2" />
      </a>
    </div> -->
  </div>
</template>

<script>
const IconFileAlt = () =>
  import("~/assets/svg/design-icons/file-alt.svg?inline");
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";
import { get } from "lodash";
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
const IconPlayCircle = () =>
  import("~/assets/svg/design-icons/play-circle.svg?inline");
import { mapState } from "vuex";

export default {
  components: {
    IconFileAlt,
    IconAngleDown,
    IconPlayCircle,
    IconBooks,
    IconDownload,
  },

  computed: {
    ...mapState("elearning/detail", {
      program: "program",
    }),
  },

  data() {
    return {
      is_show_lesson: true,
    };
  },

  methods: {
    get,
  },
};
</script>
