<template>
  <div class="page-post-detail container">
    <div class="row">
      <div class="col-md-8">
        <Post
          show-comment
          :key="post.post_id"
          :post="post"
          @delete="deletePost"
          @like="likePost"
        >
          <PostImage
            v-if="post.files && post.files.length"
            slot="media-content"
            class="my-4"
            :images="post.files.map(item => ({
              id: item.post_id,
              thumb: item.link.high,
              object: 'image'
            }))"
            @click-item="imageObj => handleClickImage(imageObj, post)"
          />
        </Post>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import PostService from "~/services/social/post";
import Post from "~/components/page/timeline/post/Post";
import PostImage from "~/components/page/timeline/post/PostImage";

export default {
  components: {
    Post,
    PostImage
  },

  async asyncData({ $axios, params }) {
    const getPost = () =>
      new PostService($axios)[ACTION_TYPE_BASE.DETAIL](params.id);
    const [postData = {}] = await Promise.all([getPost()]);

    return {
      post: postData.data || {}
    };
  },

  methods: {
    handleClickImage(imageObj, post) {
      console.log("handleClickImage", imageObj, post);
    },

    deletePost() {
      console.log('deletePost')
    },

    likePost() {
      console.log('likePost')
    }
  }
};
</script>

<style>
</style>