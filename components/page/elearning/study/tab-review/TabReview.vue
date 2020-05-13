<template>
  <div class="e-study-tab-review">
    <TabQAEditor class="mb-15" type="review" @submit="sendReview" />

    <TabQACommentItem showStars :stars="4" />
    <TabQACommentItem showStars :stars="4" />
    <TabQACommentItem showStars :stars="4" />
    <TabQACommentItem showStars :stars="4" />
    <TabQACommentItem showStars :stars="4" />

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
import TabQAEditor from "~/components/page/elearning/study/tab-qa/TabQAEditor.vue";

export default {
  components: {
    TabQACommentItem,
    TabQAEditor
  },

  methods: {
    sendReview() {
      console.log('sendReview')
    }
  }
};
</script>

<style>
</style>