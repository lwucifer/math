<template>
  <div class="page-timeline">
    <SliderBanner :images="banners" class="timeline-banner" />

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <PostEditor
            @submit="handlePostEditorSubmit"
            :active="postEditorActive"
            @active-change="active => postEditorActive = active"
          />

          <VclFacebook v-if="postLoading" class="bg-white" />

          <transition-group
            enter-active-class="animated faster fadeIn"
            leave-active-class="animated faster fadeOut"
          >
            <Post
              v-for="post in feeds && feeds.listPost ? feeds.listPost : []"
              :key="post.post_id"
              :post="post"
              class="mb-4"
              :show-menu-dropdown="post.author && post.author.id === userId"
              @delete="deletePost"
              @like="likePost"
              @edit="editPost"
              @share="openModalShare"
            >
              <template slot="media-content" slot-scope="{ link }">
                <PostImage
                  v-if="post.files && post.files.length"
                  class="my-4"
                  :images="post.files.map(item => ({
                  id: item.post_id,
                  thumb: item.link.high,
                  object: 'image'
                }))"
                  @click-item="imageObj => handleClickImage(imageObj, post)"
                />

                <template v-else-if="post.link && link">
                  <app-divider class="my-4"></app-divider>
                  <app-content-box
                    tag="a"
                    target="_blank"
                    class="mb-4"
                    size="md"
                    :href="link.url"
                    :image="link.image"
                    :title="link.title"
                    :desc="link.description"
                    :meta-footer="link.siteName"
                  />
                </template>
              </template>

              <PostShareContent v-if="post.type === POST_TYPES.SHARE" :post="post.parent_post">
                <PostImage
                  v-if="post.parent_post && post.parent_post.files && post.parent_post.files.length"
                  slot="media-content"
                  class="mt-4"
                  :images="post.parent_post.files.map(item => ({
                  id: item.post_id,
                  thumb: item.link.high,
                  object: 'image'
                }))"
                  @click-item="imageObj => handleClickImage(imageObj, post.parent_post)"
                />
              </PostShareContent>
            </Post>
          </transition-group>

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
          </div>

          <client-only>
            <infinite-loading @infinite="feedInfiniteHandler">
              <VclFacebook slot="spinner" class="bg-white" />
              <template slot="no-more">Không còn bài viết.</template>
            </infinite-loading>
          </client-only>

          <app-modal
            v-if="modalDetailShow"
            centered
            :width="1170"
            :component-class="{ 'post-detail-modal': true }"
            @close="handleCloseModal"
          >
            <PostDetail
              slot="content"
              :parent-post="modalDetailDataParent"
              :post="modalDetailDataPost"
              @click-close="handleCloseModal"
              @click-prev="handleClickPrev"
              @click-next="handleClickNext"
            />
          </app-modal>

          <PostModalShare
            v-if="showModalShare"
            :post="shareData"
            @cancel="cancelShare"
            @share="sharePost"
          >
            <PostShareContent slot="share-content" :post="shareData.parent_post">
              <PostImage
                v-if="shareData.parent_post && shareData.parent_post.files && shareData.parent_post.files.length"
                slot="media-content"
                class="my-4"
                :images="shareData.parent_post.files.map(item => ({
                  id: item.post_id,
                  thumb: item.link.high,
                  object: 'image'
                }))"
              />
            </PostShareContent>
          </PostModalShare>

          <app-modal v-if="showModalEditPost" :width="770">
            <PostEditor
              slot="content"
              ref="editEditor"
              class="mb-0"
              mode="edit"
              :initialValues="editPostData"
              prefetch
              :show-overlay="false"
              @submit="handleSubmitEditPost"
            />
            <div slot="footer" class="text-right px-4 pb-3">
              <app-button
                class="mr-3"
                color="info"
                :disabled="modalEditPostLoading"
                size="sm"
                square
                @click="closeModalEditPost"
              >Huỷ</app-button>

              <app-button
                color="primary"
                :loading="modalEditPostLoading"
                size="sm"
                square
                @click="handleClickSaveEditPost"
              >Lưu</app-button>
            </div>
          </app-modal>
        </div>

        <div class="col-md-4">
          <AsideBox :title="`Tin nhắn`" link="/messages" linkText="Xem toàn bộ >>">
            <app-content-box
              v-for="message in messagesConverted"
              v-bind="message"
              class="mb-4"
              nuxt
              size="sm"
              :key="message.id"
              :to="`/messages/t/${message.id}`"
            />
          </AsideBox>

          <AsideBox title="Khóa học Online nổi bật">
            <div class="timeline-aside-tabs">
              <a href :class="{ active: coursesTab === 0 }" @click.prevent="coursesTab = 0">Miễn phí</a>
              <a href :class="{ active: coursesTab === 1 }" @click.prevent="coursesTab = 1">Trả phí</a>
            </div>

            <div class="time-aside-tabs-content">
              <div v-show="coursesTab === 0" class="timeline-aside-tab-pane">
                <app-content-box
                  v-for="item in freeCourses"
                  :key="item.id"
                  class="align-items-center"
                  size="sm"
                  :image="get(item, 'avatar.low', null)"
                >
                  <n-link slot="image" :to="`/elearning/${item.id}`">
                    <img :src="item.image" :alt="item.name" />
                  </n-link>

                  <n-link slot="title" :to="`/elearning/${item.id}`">{{ item.name }}</n-link>

                  <n-link slot="desc" to>{{ get(item, 'teacher.name', null) }}</n-link>
                </app-content-box>
              </div>

              <div v-show="coursesTab === 1" class="timeline-aside-tab-pane">
                <app-content-box
                  v-for="item in privateCourses"
                  :key="item.id"
                  class="align-items-center"
                  size="sm"
                  :image="get(item, 'avatar.low', null)"
                >
                  <n-link slot="image" :to="`/elearning/${item.id}`">
                    <img :src="item.image" :alt="item.name" />
                  </n-link>

                  <n-link slot="title" :to="`/elearning/${item.id}`">{{ item.name }}</n-link>

                  <n-link slot="desc" to>{{ get(item, 'teacher.name', null) }}</n-link>
                </app-content-box>
              </div>

              <div class="text-center mt-4">
                <app-button class="timeline-aside-btn" nuxt to="/elearning">Xem Tất Cả</app-button>
              </div>
            </div>
          </AsideBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState, mapGetters } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { POST_TYPES, LIKE_SOURCE_TYPES, LIKE_TYPES } from "~/utils/constants";
import { createLike } from "~/models/social/Like";
import { createShare } from "~/models/social/Share";
import { createPost, editPost } from "~/models/post/Post";
import {
  COURSES_LIST,
  TIMELINE_SLIDER_ITEMS
} from "~/server/fakedata/timeline";
import { VclFacebook } from "vue-content-loading";
import FeedsService from "~/services/social/feeds";
import SocialPostsService from "~/services/social/post";
import LikesService from "~/services/social/likes";
import ShareService from "~/services/social/shares";
import LimitMessagesSerice from "~/services/message/LimitMessages";
import SearchService from "~/services/elearning/public/Search";
import PostService from "~/services/social/post";

import SliderBanner from "~/components/page/timeline/slider/SliderBanner";
import PostEditor from "~/components/page/timeline/postEditor/PostEditor";
import AsideBox from "~/components/layout/asideBox/AsideBox";
import Post from "~/components/page/timeline/post/Post";
import PostSlider from "~/components/page/timeline/post/PostSlider";
import PostDetail from "~/components/page/timeline/post/PostDetail";
import PostImage from "~/components/page/timeline/post/PostImage";
import PostModalShare from "~/components/page/timeline/post/PostModalShare";
import PostShareContent from "~/components/page/timeline/post/PostShareContent";

import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";

export default {
  watchQuery: ["post_id", "photo_id"],

  middleware: "authenticated",

  components: {
    SliderBanner,
    PostEditor,
    AsideBox,
    Post,
    PostSlider,
    PostDetail,
    PostImage,
    VclFacebook,
    PostModalShare,
    PostShareContent
  },

  async fetch({ params, query, store }) {
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_CONFIG.LIST}`),
      store.dispatch(`social/${actionTypes.SOCIAL_LABEL.LIST}`)
    ]);
  },

  async asyncData({ $axios }) {
    const getFeeds = () => new FeedsService($axios)[actionTypes.BASE.LIST]();
    const getMessages = () =>
      new LimitMessagesSerice($axios)[actionTypes.BASE.LIST]();
    const getFreeCourse = () =>
      new SearchService($axios)[actionTypes.BASE.ADD]({
        free: true,
        limit: 5
      });
    const getPrivateCourse = () =>
      new SearchService($axios)[actionTypes.BASE.ADD]({
        free: false,
        limit: 5
      });

    const [
      { data: feeds = {} },
      { data: messages = [] },
      { data: freeCourses = [] },
      { data: privateCourses = [] }
    ] = await Promise.all([
      getFeeds(),
      getMessages(),
      getFreeCourse(),
      getPrivateCourse()
    ]);

    return {
      feeds: feeds || [],
      messages: messages || [],
      freeCourses: freeCourses.content || [],
      privateCourses: privateCourses.content || []
    };
  },

  data() {
    return {
      POST_TYPES: Object.freeze(POST_TYPES),
      loading: false,
      banners: new Array(3).fill(BannerImage, 0),
      postEditorActive: false,
      postLoading: false,
      // Modal post detail
      modalDetailShow: false,
      modalDetailDataParent: {},
      modalDetailDataPost: {},
      // Edit post
      showModalEditPost: false,
      modalEditPostLoading: false,
      editPostData: {},
      // Share post
      showModalShare: false,
      shareData: {},
      // Course tabs
      coursesTab: 0,

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
      coursesList: COURSES_LIST,
      timelineSliderItems: TIMELINE_SLIDER_ITEMS
    };
  },

  computed: {
    ...mapGetters("social", ["configPrivacyLevels"]),

    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    },

    messagesConverted() {
      return this.messages ? this.messages.map(item => {
        return {
          id: item.room.id,
          title: item.room.members
            .filter(member => member.user_id !== this.userId)
            .map(member => member.fullname)
            .join(", "),
          desc: item.message.content,
          image: get(item, 'room.room_avatar.low', null)
        };
      }) : [];
    }
  },

  mounted() {
    if (process.browser) {
      window.addEventListener("popstate", event => {
        const timeout = setTimeout(() => {
          this.handlePopstate(event);
          clearTimeout(timeout);
        });
      });
    }
  },

  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("popstate", event => {
        const timeout = setTimeout(() => {
          this.handlePopstate(event);
          clearTimeout(timeout);
        });
      });
    }
  },

  methods: {
    get,

    /**
     * Click image -> change url
     * @param { Object } imageObj - { id, thumb, object }
     * @param { Object } post
     */
    handleClickImage({ id }, post) {
      // Change url
      if (typeof window.history.pushState != "undefined") {
        this.modalDetailDataParent = post;
        this.modalDetailShow = true;

        window.history.pushState(
          { theater: true },
          "",
          `${window.location.origin}/post/${post.post_id}?photo_id=${id}`
        );
      } else {
        this.$router.push(
          `${window.location.origin}/post/${post.post_id}?photo_id=${id}`
        );
      }

      // get data
      this.getDetailPost(id);
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
      this.modalDetailDataParent = {};
      this.modalDetailDataPost = {};
    },

    /**
     * on click prev arrow on modal post detail -> get prev image info
     * @param { Number } id - post_id of image post
     * @param { Object } post - parent post
     */
    handleClickPrev(id, post) {
      this.handleClickImage({ id }, post);
    },

    /**
     * on click next arrow on modal post detail -> get next image info
     * @param { Number } id - post_id of image post
     * @param { Object } post - parent post
     */
    handleClickNext(id, post) {
      this.handleClickImage({ id }, post);
    },

    async getDetailPost(id) {
      const getPost = await new PostService(this.$axios)[
        actionTypes.BASE.DETAIL
      ](id);
      if (getPost.success) {
        this.modalDetailDataPost = getPost.data;
      } else {
        this.$toasted.error(getPost.message);
      }
    },

    /**
     * Submit POST a post
     */
    async handlePostEditorSubmit(data, cb) {
      this.postLoading = true;

      const formData = new FormData();
      const dataWithModel = createPost(data);

      for (const key in dataWithModel) {
        // Check whether field is an array
        if (key === "post_image") {
          const values = data[key];
          for (let i = 0; i < values.length; i++) {
            formData.append(key, values[i]);
          }
        } else {
          formData.append(
            key,
            Array.isArray(dataWithModel[key])
              ? JSON.stringify(data[key])
              : data[key]
          );
        }
      }

      this.postEditorActive = false;

      const doAdd = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL_POST.ADD}`,
        formData
      );

      if (doAdd.success) {
        cb();
        const timeout = setTimeout(() => {
          this.feeds.listPost = [doAdd.data, ...this.feeds.listPost];
          this.postLoading = false;
          clearTimeout(timeout);
        }, data.post_image.length * 1000);
      } else {
        this.$toasted.error(doAdd.message);
        this.postLoading = false;
      }
    },

    /**
     * DELETE a post
     */
    async deletePost(id) {
      const doDelete = await new SocialPostsService(this.$axios)[
        actionTypes.BASE.DELETE
      ](id);

      if (doDelete.success) {
        const { feeds } = this;
        const newListPost =
          feeds && feeds.listPost
            ? feeds.listPost.filter(item => item.post_id !== id)
            : [];
        this.feeds = {
          listPost: newListPost,
          page: feeds.page || {}
        };
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    /**
     * Like a POST
     */
    async likePost(id, cb) {
      const likeModel = createLike(id, LIKE_SOURCE_TYPES.POST, LIKE_TYPES.LIKE);
      const { success = false, data = {} } = await new LikesService(
        this.$axios
      )[actionTypes.BASE.ADD](likeModel);

      if (success) {
        const { feeds } = this;
        const newListPost =
          feeds && feeds.listPost
            ? feeds.listPost.map(item => {
                if (item.post_id === likeModel.source_id) {
                  return {
                    ...item,
                    type_like: data.type_like,
                    is_like: !!data.type_like
                  };
                }
                return item;
              })
            : [];
        this.feeds.listPost = newListPost;
      }

      // Have to run cb
      cb();
    },

    editPost(post) {
      this.editPostData = {
        post_id: post.post_id,
        content: post.content,
        link: post.link || "",
        post_image: post.files || [],
        list_tag:
          post.tags && post.tags.length ? post.tags.map(item => item.id) : [],
        check_in: null,
        privacy: get(post, "privacy.value", null),
        label_id: get(post, "label.id", null)
      };
      this.showModalEditPost = true;
    },

    closeModalEditPost() {
      this.showModalEditPost = false;
      this.editPostData = {};
    },

    handleClickSaveEditPost() {
      this.$refs.editEditor && this.$refs.editEditor.submit();
    },

    async handleSubmitEditPost(data) {
      this.modalEditPostLoading = true;

      const formData = new FormData();
      const dataWithModel = editPost(data);

      for (const key in dataWithModel) {
        // Check whether field is an array
        if (key === "post_image") {
          const values = data[key];
          for (let i = 0; i < values.length; i++) {
            formData.append(key, values[i]);
          }
        } else {
          formData.append(
            key,
            Array.isArray(dataWithModel[key])
              ? JSON.stringify(data[key])
              : data[key]
          );
        }
      }

      const doEdit = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL_POST.EDIT}`,
        formData
      );

      if (doEdit.success) {
        const { success, data: newPost = {} } = await new PostService(
          this.$axios
        )[actionTypes.BASE.DETAIL](data.post_id);

        if (success) {
          const timeout = setTimeout(() => {
            const postIndex = this.feeds.listPost.findIndex(
              item => item.post_id === newPost.post_id
            );
            this.feeds.listPost[postIndex] = newPost;
            this.modalEditPostLoading = false;
            this.showModalEditPost = false;
            clearTimeout(timeout);
          }, data.post_image.length * 1000);
        }
      } else {
        this.$toasted.error(doEdit.message);
        this.modalEditPostLoading = false;
      }
    },

    openModalShare(post) {
      this.shareData = post;
      const timeout = setTimeout(() => {
        this.showModalShare = true;
        clearTimeout(timeout);
      });
    },

    async sharePost({ post_id, content, list_tag, label_id }, cb) {
      const shareModel = createShare(post_id, content);
      const doShare = await new ShareService(this.$axios)[actionTypes.BASE.ADD](
        shareModel
      );

      if (doShare.success) {
        const { success, data: newPost = {} } = await new PostService(
          this.$axios
        )[actionTypes.BASE.DETAIL](doShare.data.post_id);

        if (success) {
          this.feeds.listPost = [newPost, ...this.feeds.listPost];
        }

        this.cancelShare();
        const timeout = setTimeout(() => {
          cb();
          clearTimeout(timeout);
        }, 500);
      } else {
        this.$toasted.error(doShare.message);
      }
    },

    cancelShare() {
      this.showModalShare = false;
      this.shareData = {};
    },

    /**
     * Infinite scroll handler
     */
    async feedInfiniteHandler($state) {
      const { data: feeds = {} } = await new FeedsService(this.$axios)[
        actionTypes.BASE.LIST
      ]({
        params: {
          page: this.feeds.page.number + 1
        }
      });

      if (feeds.listPost && feeds.listPost.length) {
        this.feeds = {
          listPost: this.feeds.listPost.concat(feeds.listPost),
          page: feeds.page
        };
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_timeline.scss";
</style>