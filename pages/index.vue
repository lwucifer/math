<template>
  <div class="page-timeline">
    <SliderBanner :images="banners" class="timeline-banner" />

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <PostEditor @submit="handlePostEditorSubmit" />

          <VclFacebook v-if="loading" class="bg-white" />

          <template v-else>
            <Post
              v-for="post in feeds && feeds.listPost ? feeds.listPost : []"
              :key="post.post_id"
              :post="post"
              class="mb-4"
              :show-menu-dropdown="post.author && post.author.id === userId"
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
          </template>

          <div class="d-none">
            <!-- DEMO FOR POST LINK -->
            <!-- <Post class="mb-4">
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
            </Post>-->
            <!-- END DEMO FOR POST LINK -->

            <!-- DEMO FOR POST SLIDER -->
            <!-- <Post>
              <template slot="media-content">
                <PostSlider
                  :images="timelineSliderItems"
                  class="my-4"
                  @click-item="handleClickImage"
                />
              </template>
            </Post>-->
            <!-- END DEMO FOR POST SLIDER -->

            <!-- DEMO FOR POST 1 IMAGE -->
            <!-- <Post>
              <template slot="media-content">
                <PostImage
                  :images="[{ object: 'image', thumb: 'https://picsum.photos/1920/1080'}]"
                  class="my-4"
                  @click-item="modalDetailShow = true"
                />
              </template>
            </Post>-->
            <!-- END DEMO FOR POST 1 IMAGE -->

            <!-- DEMO FOR POST 2 IMAGE -->
            <!-- <Post>
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
            </Post>-->
            <!-- END DEMO FOR POST 2 IMAGE -->

            <!-- DEMO FOR POST 3 IMAGE -->
            <!-- <Post>
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
            </Post>-->
            <!-- END DEMO FOR POST 3 IMAGE -->

            <!-- DEMO FOR POST 4 IMAGE -->
            <!-- <Post>
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
            </Post>-->
            <!-- END DEMO FOR POST 4 IMAGE -->

            <!-- DEMO FOR POST 5 IMAGE -->
            <!-- <Post>
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
            </Post>-->
            <!-- END DEMO FOR POST 5 IMAGE -->
          </div>

          <app-modal
            v-if="modalDetailShow"
            centered
            :width="1170"
            :component-class="{ 'post-detail-modal': true }"
            @close="handleCloseModal"
          >
            <PostDetail
              v-if="modalDetailShow"
              slot="content"
              :post="dataModalDetail"
              @click-close="handleCloseModal"
              @click-prev="handleClickPrev"
              @click-next="handleClickNext"
            />
          </app-modal>
        </div>

        <div class="col-md-4">
          <AsideBox :title="`Tin nhắn (2)`" link="/messages" linkText="Xem toàn bộ >>">
            <app-content-box
              v-for="(item, index) in messages"
              class="mb-4"
              nuxt
              to
              size="sm"
              :key="index"
              :image="item.image"
              :title="item.title"
              :desc="item.desc"
            />
          </AsideBox>

          <AsideBox title="Khóa học Online nổi bật">
            <div class="timeline-aside-tabs">
              <a href class="active" @click.prevent>Miễn phí</a>
              <a href @click.prevent>Trả phí</a>
            </div>

            <div class="time-aside-tabs-content">
              <div class="timeline-aside-tab-pane">
                <app-content-box
                  v-for="(item, index) in coursesList"
                  class="align-items-center"
                  size="sm"
                  :key="index"
                  :image="item.image"
                  :title="item.title"
                  :desc="item.desc"
                >
                  <n-link slot="image" to>
                    <img :src="item.image" :alt="item.title" />
                  </n-link>

                  <n-link slot="title" to>{{ item.title }}</n-link>

                  <n-link slot="desc" to>{{ item.desc }}</n-link>
                </app-content-box>
              </div>

              <!-- <div class="timeline-aside-tab-pane">
                <app-content-box
                  v-for="(item, index) in coursesList.reverse()"
                  nuxt
                  size="sm"
                  :key="index"
                  :image="item.image"
                  :title="item.title"
                  :desc="item.desc"
                ></app-content-box>
              </div>-->

              <div class="text-center mt-4">
                <app-button class="timeline-aside-btn">Xem Tất Cả</app-button>
              </div>
            </div>
          </AsideBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { POST_TYPES, LIKE_SOURCE_TYPES, LIKE_TYPES } from "~/utils/constants";
import { createLike } from "~/models/social/Like";
import {
  MESSAGES,
  COURSES_LIST,
  TIMELINE_SLIDER_ITEMS
} from "~/server/fakedata/timeline";
import { VclFacebook } from "vue-content-loading";

import SliderBanner from "~/components/page/timeline/slider/SliderBanner";
import PostEditor from "~/components/page/timeline/postEditor/PostEditor";
import AsideBox from "~/components/layout/asideBox/AsideBox";
import Post from "~/components/page/timeline/post/Post";
import PostSlider from "~/components/page/timeline/post/PostSlider";
import PostDetail from "~/components/page/timeline/post/PostDetail";
import PostImage from "~/components/page/timeline/post/PostImage";

import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";

export default {
  watchQuery: ["post_id", "photo_id"],

  components: {
    SliderBanner,
    PostEditor,
    AsideBox,
    Post,
    PostSlider,
    PostDetail,
    PostImage,
    VclFacebook
  },

  async fetch({ params, query, store }) {
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_CONFIG.LIST}`)
    ]);
  },

  data() {
    return {
      POST_TYPES: Object.freeze(POST_TYPES),
      loading: true,
      banners: new Array(3).fill(BannerImage, 0),
      coursesTab: 0,
      modalDetailShow: false,
      dataModalDetail: {},
      coursesTabsList: [
        {
          text: "Miễn phí",
          value: 0
        },
        {
          text: "Trả phí",
          value: 1
        }
      ],

      //Fake data
      messages: MESSAGES,
      coursesList: COURSES_LIST,
      timelineSliderItems: TIMELINE_SLIDER_ITEMS
    };
  },

  computed: {
    ...mapState("social", ["feeds"]),
    ...mapGetters("social", ["configPrivacyLevels"]),

    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    }
  },

  created() {
    this.$store.dispatch(`social/${actionTypes.SOCIAL_FEEDS.LIST}`).then(() => {
      this.loading = false;
    });
  },

  mounted() {
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
        console.log("handleClickImage", imageObj);
        this.dataModalDetail = post;
        this.modalDetailShow = true;

        window.history.pushState(
          { theater: true },
          "",
          `${window.location.origin}/post?photo_id=${imageObj.id}`
        );
      } else {
        this.$router.push(
          `${window.location.origin}/post?photo_id=${imageObj.id}`
        );
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
      console.log("handleClickPrev");
    },

    /**
     * on click next arrow on modal post detail -> get next image info
     */
    handleClickNext() {
      console.log("handleClickNext");
    },

    /**
     * Submit POST a post
     */
    async handlePostEditorSubmit(data) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      console.log("formData after append", FormData);
      const doAdd = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL_POST.ADD}`,
        formData
      );
      console.log("doAdd result", doAdd);
    },

    /**
     * DELETE a post
     */
    async deletePost(id) {
      const doDelete = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL_POST.DELETE}`,
        id
      );
      console.log("doDelete", doDelete);
    },

    async likePost(id, cb) {
      const likeModel = createLike(id, LIKE_SOURCE_TYPES.POST, LIKE_TYPES.LIKE);
      const doLike = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL_LIKES.ADD}`,
        likeModel
      );
      console.log("likePost", doLike);
      this.$store.dispatch(`social/${actionTypes.SOCIAL_FEEDS.LIST}`);

      // Have to run cb
      cb();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_timeline.scss";
</style>