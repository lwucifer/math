<template>
  <div class="psc mt-3">
    <div class="psc__media mb-3">
      <slot name="media-content" />
    </div>

    <div class="psc__content">
      <div class="psc__title font-weight-bold mb-2">
        <n-link
          class="text-decoration-none"
          :to="`/account/${post.author.id}`"
        >{{ post.author && post.author.fullname ? post.author.fullname : '' }}</n-link>

        <span v-if="post.label" class="text-sub font-weight-normal">
          cảm thấy {{ post.label.icon }}
          <b class="text-base">{{ post.label.des }}</b>
        </span>

        <PostTags v-if="post.tags && post.tags.length" :tags="post.tags || []" />
      </div>

      <n-link
        :to="`/post/${post.post_id}`"
        class="psc__date text-gray text-decoration-none"
      >10 tháng 3</n-link>

      <div class="psc__desc mt-3">
        <span v-html="post.content" class="psc__text text-sub"></span>
        <!-- <a href class="text-decoration-none" @click.prevent>Xem thêm</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import PostTags from "~/components/page/timeline/post/PostTags";

export default {
  components: {
    PostTags
  },

  props: {
    post: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-share-content.scss";
</style>