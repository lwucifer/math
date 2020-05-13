<template>
  <div class="e-study-tab-notification">
    <TabQACommentItem showTitle title="Tiêu đề thông báo" />
    <TabQACommentItem showTitle title="Tiêu đề thông báo" />
    <TabQACommentItem showTitle title="Tiêu đề thông báo" />
    <TabQACommentItem showTitle title="Tiêu đề thông báo" />
    <TabQACommentItem showTitle title="Tiêu đề thông báo" />

    <app-pagination
      class="mt-4"
      :pagination="{
        first: true,
        last: false,
        number: 0,
        numberOfElements: 10,
        size: 10,
        totalElements: 65,
        totalPages: 7,
      }"
    />
  </div>
</template>

<script>
import TabQACommentItem from "~/components/page/elearning/study/tab-qa/TabQACommentItem.vue";

export default {
  components: {
    TabQACommentItem
  }
};
</script>

<style>
</style>