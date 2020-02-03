<template>
  <div>
    <PostEditor />

    <app-skeleton :loading="loading" class="mb-4"></app-skeleton>

    <app-skeleton :loading="loading" class="mb-4"></app-skeleton>

    <template v-if="!loading">
      <Post
        v-for="post in postsList"
        class="mb-4"
        :key="post.label"
        :fullname="post.creator && post.creator.fullname"
        :updated="post.updated"
        :likes="post.likes"
        :comments="post.comments"
        :content="post.content"
      >
        <PostImage
          v-if="post.attachments && post.attachments.length"
          slot="media-content"
          class="my-4"
          :images="post.attachments"
          @click-item="imageObj => handleClickImage(imageObj, post)"
        />
      </Post>
    </template>

    <div class="">
      <!-- DEMO FOR POST LINK -->
      <Post class="mb-4">
        <template slot="media-content">
          <app-divider class="my-4"></app-divider>
          <app-content-box
            tag="a"
            target="_blank"
            href
            class="mb-4"
            size="md"
            image="https://picsum.photos/150/150"
            title="ĐỘT PHÁ THU NHẬP 06 KÊNH MARKETING ONLINE NGAY LẬP"
            desc="Tất cả những ai muốn khởi nghiệp Kinh doanh Online bài bản, bắt đầu từ những công việc cốt lõi nhất: xác định sản phẩm kinh doanh, tìm kiếm nguồn hàng kinh doanh, liên hệ nhà cung cấp, nghiên cứu khách hàng, đối thủ, xây dựng nội dung bán hàng..."
            meta-footer="cellphones.com.vn"
          />
        </template>
      </Post>
      <!-- END DEMO FOR POST LINK -->

      <!-- DEMO FOR POST SLIDER -->
      <Post>
        <template slot="media-content">
          <PostSlider
            :images="timelineSliderItems"
            class="my-4"
            @click-item="handleClickImage"
          />
        </template>
      </Post>
      <!-- END DEMO FOR POST SLIDER -->

      <!-- DEMO FOR POST 1 IMAGE -->
      <Post>
        <template slot="media-content">
          <PostImage
            :images="[{ object: 'image', thumb: 'https://picsum.photos/1920/1080'}]"
            class="my-4"
            @click-item="modalDetailShow = true"
          />
        </template>
      </Post>
      <!-- END DEMO FOR POST 1 IMAGE -->

      <!-- DEMO FOR POST 2 IMAGE -->
      <Post>
        <template slot="media-content">
          <PostImage
            :images="[
              { object: 'image', thumb: 'https://picsum.photos/361/361'},
              { object: 'image', thumb: 'https://picsum.photos/361/361'},
            ]"
            class="my-4"
            @click-item="modalDetailShow = true"
          />
        </template>
      </Post>
      <!-- END DEMO FOR POST 2 IMAGE -->

      <!-- DEMO FOR POST 3 IMAGE -->
      <Post>
        <template slot="media-content">
          <PostImage
            :images="[
              { object: 'image', thumb: 'https://picsum.photos/546/362'},
              { object: 'image', thumb: 'https://picsum.photos/179/179'},
              { object: 'image', thumb: 'https://picsum.photos/179/179'},
            ]"
            class="my-4"
            @click-item="modalDetailShow = true"
          />
        </template>
      </Post>
      <!-- END DEMO FOR POST 3 IMAGE -->

      <!-- DEMO FOR POST 4 IMAGE -->
      <Post>
        <template slot="media-content">
          <PostImage
            :images="[
              { object: 'image', thumb: 'https://picsum.photos/555/555'},
              { object: 'image', thumb: 'https://picsum.photos/182/182'},
              { object: 'image', thumb: 'https://picsum.photos/182/182'},
              { object: 'image', thumb: 'https://picsum.photos/182/182'},
            ]"
            class="my-4"
            @click-item="modalDetailShow = true"
          />
        </template>
      </Post>
      <!-- END DEMO FOR POST 4 IMAGE -->

      <!-- DEMO FOR POST 5 IMAGE -->
      <Post>
        <template slot="media-content">
          <PostImage
            :images="[
              { object: 'image', thumb: 'https://picsum.photos/729/437'},
              { object: 'image', thumb: 'https://picsum.photos/178/178'},
              { object: 'image', thumb: 'https://picsum.photos/178/178'},
              { object: 'image', thumb: 'https://picsum.photos/178/178'},
              { object: 'image', thumb: 'https://picsum.photos/178/178'},
            ]"
            class="my-4"
            @click-item="modalDetailShow = true"
          />
        </template>
      </Post>
      <!-- END DEMO FOR POST 5 IMAGE -->
    </div>

    <app-modal
      v-if="modalDetailShow"
      centered
      :width="1170"
      :component-class="{ 'post-detail-modal': true }"
      @close="handleCloseModal"
    >
      <PostDetail v-if="modalDetailShow" slot="content" :post="dataModalDetail" @click-close="handleCloseModal" @click-prev="handleClickPrev" @click-next="handleClickNext"/>
    </app-modal>
  </div>
</template>

<script>
import PostEditor from "~/components/page/timeline/postEditor/PostEditor";
import Post from "~/components/page/timeline/post/Post";
import PostSlider from "~/components/page/timeline/post/PostSlider";
import PostDetail from "~/components/page/timeline/post/PostDetail";
import PostImage from "~/components/page/timeline/post/PostImage";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  watchQuery: ["post_id", "photo_id"],

  components: {
    PostEditor,
    Post,
    PostSlider,
    PostDetail,
    PostImage
  },
  
  async fetch({ params, query, store }) {
    console.log("watchQuery");
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_POST.LIST}`)
    ]);
  },

  data() {
    return {
      loading: true,
      modalDetailShow: false,
      dataModalDetail: {},
      timelineSliderItems: [
        {
          id: 0,
          type: "image",
          src: "https://picsum.photos/171/171"
        },
        {
          id: 1,
          type: "video",
          src: "https://picsum.photos/1920/1080"
        },
        {
          id: 2,
          type: "image",
          src: "https://picsum.photos/1024/768"
        },
        {
          id: 3,
          type: "image",
          src: "https://picsum.photos/180/180"
        },
        {
          id: 4,
          type: "image",
          src: "https://picsum.photos/200/200"
        },
        {
          id: 5,
          type: "image",
          src: "https://picsum.photos/350/350"
        },
        {
          id: 6,
          type: "image",
          src: "https://picsum.photos/400/400"
        },
        {
          id: 7,
          type: "image",
          src: "https://picsum.photos/240/240"
        }
      ]
    };
  },

  computed: {
    ...mapState("social", ["postsList"])
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);

    if (process.browser) {
      window.addEventListener("popstate", event =>
        setTimeout(() => this.handlePopstate(event))
      );
    }
  },

  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("popstate", event =>
        setTimeout(() => this.handlePopstate(event))
      );
    }
  },

  methods: {
    /**
     * Click image -> change url
     * @param { Object } imageObj - { type: image | video, post: post object }
     */
    handleClickImage(imageObj, post) {
      if (typeof window.history.pushState != "undefined") {
        this.dataModalDetail = post;
        this.modalDetailShow = true;

        window.history.pushState(
          { theater: true },
          "",
          `${window.location.origin}/post?photo_id=${imageObj.id}`
        );
      } else {
        this.$router.push(`${window.location.origin}/post?photo_id=${imageObj.id}`)
      }
    },

    /**
     * Hande click nav button of browser
     * @param { Object } event - event emited
     */
    handlePopstate(event) {
      console.log("event.state", event.state);
      const fullPath = document.location.href.replace(
        window.location.origin,
        ""
      );
      // const isTheater = document.location.search.includes("&theater");

      if (event.state.theater) {
        this.modalDetailShow = true;
      } else {
        this.$router.push();
      }
    },

    /**
     * Click close modal -> set url in browser to '/'
     */
    handleCloseModal() {
      if (typeof window.history.pushState != "undefined") {
        window.history.pushState(
          { theater: true },
          "",
          `${window.location.origin}/`
        );
      }

      this.modalDetailShow = false;
      this.dataModalDetail = {};
    },

    /**
     * on click prev arrow on modal post detail -> get prev image info
     */
    handleClickPrev() {
      console.log("handleClickPrev")
    },

    /**
     * on click next arrow on modal post detail -> get next image info
     */
    handleClickNext() {
      console.log("handleClickNext")
    }
  }
};
</script>