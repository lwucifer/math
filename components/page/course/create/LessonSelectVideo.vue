<template>
  <div class="clc-type-tab-panel">
    <div class="cc-tabs">
      <a
        href
        class="cc-tab-item"
        :class="{ active: tabVideo === 'upload' }"
        @click.prevent="changeTabVideo('upload')"
        >Upload bài học</a
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

    <LessonSelect
      @handleSelectUrl="handleSelectUrl"
      v-if="tabVideo === 'choose'"
      type="VIDEO"
    />
  </div>
</template>

<script>
const IconTrashAlt = () =>
  import("~/assets/svg/design-icons/trash-alt.svg?inline");
import LessonSelectVideoUpload from "~/components/page/course/create/LessonSelectVideoUpload";
import LessonSelect from "~/components/page/course/create/LessonSelect";

export default {
  components: {
    IconTrashAlt,
    LessonSelectVideoUpload,
    LessonSelect
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
    },

    handleSelectUrl(file) {
      this.$emit("handleSelectUrl", file);
    }
  }
};
</script>
