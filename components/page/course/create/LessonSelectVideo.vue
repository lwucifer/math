<template>
  <div class="clc-type-tab-panel">
    <div class="cc-tabs">
      <a
        href
        class="cc-tab-item"
        :class="{ active: tabVideo === 'upload' }"
        @click.prevent="changeTabVideo('upload')"
        >Upload bài giảng</a
      >

      <a
        href
        class="cc-tab-item"
        :class="{ active: tabVideo === 'choose' }"
        @click.prevent="changeTabVideo('choose')"
        >Chọn từ kho học liệu</a
      >
    </div>

    <LessonSelectVideoUpload
      @handleSelectFile="handleSelectFile"
      v-if="tabVideo === 'upload'"
    />

    <LessonSelectVideoChoose v-if="tabVideo === 'choose'" />
  </div>
</template>

<script>
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import LessonSelectVideoUpload from "~/components/page/course/create/LessonSelectVideoUpload";
import LessonSelectVideoChoose from "~/components/page/course/create/LessonSelectVideoChoose";

export default {
  components: {
    IconTrashAlt,
    LessonSelectVideoUpload,
    LessonSelectVideoChoose
  },

  data() {
    return {
      tabVideo: "upload"
    };
  },

  methods: {
    changeTabVideo(type) {
      this.tabVideo = type;
    },

    handleSelectFile(data) {
      this.$emit("handleSelectFile", data);
    }
  }
};
</script>
