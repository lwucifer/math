<template>
  <div class="page-timeline">
    <SliderBanner :images="banners" class="timeline-banner" />

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <PostEditor
            :active="postEditorActive"
            @submit="addPost"
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
              @delete="showModalConfirmDelete"
              @like="likePost"
              @edit="editPost"
              @share="openModalShare"
              @get-comment="getComment"
              @post-comment="postComment"
            >
              <template slot="media-content" slot-scope="{ link }">
                <PostImage
                  v-if="post.files && post.files.length"
                  class="my-4"
                  :images="post.files.map(item => ({
                    id: item.post_id,
                    thumb: get(item, 'link.high', null),
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

              <template slot="comment" slot-scope="{ commentTree }">
                <transition-group
                  enter-active-class="animated faster fadeIn"
                  leave-active-class="animated faster fadeOut"
                >
                  <CommentItem
                    v-for="comment in commentTree.comments || []"
                    :key="comment.id"
                    :post="post"
                    :data="comment"
                    @edit="editComment"
                    @delete="deleteComment"
                    @like="likeComment"
                    @get-child-comment="getChildComment"
                    @post-child-comment="postChildComment"
                  >
                    <template slot="child-comment" slot-scope="{ commentTree }">
                      <transition-group
                        enter-active-class="animated faster fadeIn"
                        leave-active-class="animated faster fadeOut"
                      >
                        <CommentItem
                          v-for="childComment in commentTree.comments || []"
                          :key="childComment.id"
                          :level="2"
                          :post="post"
                          :parentComment="comment"
                          :data="childComment"
                          @edit="editChildComment"
                          @delete="deleteChildComment"
                          @like="likeChildComment"
                        />
                      </transition-group>
                    </template>
                  </CommentItem>
                </transition-group>
              </template>
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
              :post="modalDetailPost"
              :parent-post="modalDetailParentPost"
              :is-parent-post="modalDetailParentPostId === modalDetailPostId"
              @click-close="handleCloseModal"
              @click-prev="handleClickPrev"
              @click-next="handleClickNext"
              @delete="showModalConfirmDelete"
            >
              <PostDetailPost
                slot="post"
                slot-scope="{ post, isParentPost }"
                show-edit
                show-comment
                :post="post"
                :is-parent-post="isParentPost"
                @like="(...args) => isParentPost ? likePost(...args) : likeDetailPost(...args)"
                @get-comment="(...args) => isParentPost ? getComment(...args) : getCommentDetailPost(...args)"
                @post-comment="(...args) => isParentPost ? postComment(...args) : postCommentDetailPost(...args)"
              >
                <template v-if="!isEmpty(post)" slot="comment" slot-scope="{ commentTree }">
                  <transition-group
                    enter-active-class="animated faster fadeIn"
                    leave-active-class="animated faster fadeOut"
                  >
                    <CommentItem
                      v-for="comment in commentTree.comments || []"
                      :key="comment.id"
                      :post="post"
                      :data="comment"
                      @edit="(...args) => isParentPost ? editComment(...args) : editCommentDetailPost(...args)"
                      @delete="(...args) => isParentPost ? deleteComment(...args) : deleteCommentDetailPost(...args)"
                      @like="(...args) => isParentPost ? likeComment(...args) : likeCommentDetailPost(...args)"
                      @get-child-comment="(...args) => isParentPost ? getChildComment(...args) : getChildCommentDetailPost(...args)"
                      @post-child-comment="(...args) => isParentPost ? postChildComment(...args) : postChildCommentDetailPost(...args)"
                    >
                      <template slot="child-comment" slot-scope="{ commentTree }">
                        <transition-group
                          enter-active-class="animated faster fadeIn"
                          leave-active-class="animated faster fadeOut"
                        >
                          <CommentItem
                            v-for="childComment in commentTree.comments || []"
                            :key="childComment.id"
                            :level="2"
                            :post="post"
                            :parentComment="comment"
                            :data="childComment"
                            @edit="(...args) => isParentPost ? editChildComment(...args) : editChildCommentDetailPost(...args)"
                            @delete="(...args) => isParentPost ? deleteChildComment(...args) : deleteChildCommentDetailPost(...args)"
                            @like="(...args) => isParentPost ? likeChildComment(...args) : likeChildCommentDetailPost(...args)"
                          />
                        </transition-group>
                      </template>
                    </CommentItem>
                  </transition-group>
                </template>
              </PostDetailPost>
            </PostDetail>
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

          <app-modal-confirm
            v-if="modalConfirmDelete"
            okText="Xoá"
            title="Bạn có chắc chắn muốn xoá?"
            :confirmLoading="modalConfirmDeleteLoading"
            @cancel="hideModalConfirmDelete"
            @ok="deletePost(modalConfirmDeleteId)"
          ></app-modal-confirm>
        </div>

        <div class="col-md-4">
          <div v-sticky sticky-offset="{ top: 101 }" :sticy-z-index="9">
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
                <a
                  href
                  :class="{ active: coursesTab === 0 }"
                  @click.prevent="coursesTab = 0"
                >Miễn phí</a>
                <a
                  href
                  :class="{ active: coursesTab === 1 }"
                  @click.prevent="coursesTab = 1"
                >Trả phí</a>
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
  </div>
</template>

<script>
import { get, isEmpty } from "lodash";
import { mapState, mapGetters } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { POST_TYPES, LIKE_SOURCE_TYPES, LIKE_TYPES } from "~/utils/constants";
import { createLike } from "~/models/social/Like";
import { createShare } from "~/models/social/Share";
import { createPost, editPost } from "~/models/post/Post";
import { createComment, editComment } from "~/models/social/Comment";
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
const PostSlider = () => import("~/components/page/timeline/post/PostSlider");
const PostDetail = () => import("~/components/page/timeline/post/PostDetail");
const PostImage = () => import("~/components/page/timeline/post/PostImage");
const PostModalShare = () =>
  import("~/components/page/timeline/post/PostModalShare");
const PostShareContent = () =>
  import("~/components/page/timeline/post/PostShareContent");
const PostDetailPost = () =>
  import("~/components/page/timeline/post/PostDetailPost");
const CommentItem = () =>
  import("~/components/page/timeline/comment/CommentItem");
const CommentItemReplied = () =>
  import("~/components/page/timeline/comment/CommentItemReplied");
const CommentEditor = () =>
  import("~/components/page/timeline/comment/CommentEditor");

import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";

export default {
  // watchQuery: ["post_id", "photo_id"],

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
    PostShareContent,
    CommentItem,
    CommentItemReplied,
    CommentEditor,
    PostDetailPost
  },

  fetch({ params, query, store }) {
    Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL.GET_CONFIGS}`),
      store.dispatch(`social/${actionTypes.SOCIAL.GET_LABELS}`),
      store.dispatch(`social/${actionTypes.SOCIAL.GET_FEEDS}`)
    ]);
  },

  async asyncData({ $axios, error }) {
    try {
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
        // { data: feeds = {} },
        { data: messages = [] },
        { data: freeCourses = [] },
        { data: privateCourses = [] }
      ] = await Promise.all([
        getMessages(),
        getFreeCourse(),
        getPrivateCourse()
      ]);

      return {
        // feeds: feeds || [],
        messages: messages || [],
        freeCourses: freeCourses.content || [],
        privateCourses: privateCourses.content || []
      };
    } catch (e) {
      error({ statusCode: e.status, message: e.message });
    }
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
      modalDetailParentPostId: null,
      modalDetailPostId: null,
      // Edit post
      showModalEditPost: false,
      modalEditPostLoading: false,
      editPostData: {},
      // Share post
      showModalShare: false,
      shareData: {},
      // Delete post
      modalConfirmDelete: false,
      modalConfirmDeleteId: null,
      modalConfirmDeleteLoading: false,
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
    ...mapState("social", ["feeds"]),
    ...mapGetters("social", ["configPrivacyLevels"]),

    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    },

    messagesConverted() {
      return this.messages && this.messages.length
        ? this.messages.map(item => {
            return {
              id: item.room.id,
              title: item.room.members
                .filter(member => member.user_id !== this.userId)
                .map(member => member.fullname)
                .join(", "),
              desc: item.message.content,
              image: get(item, "room.room_avatar.low", null)
            };
          })
        : [];
    },

    modalDetailPost() {
      return this.$store.state.social.detailPost;
    },

    modalDetailParentPost() {
      return (
        this.$store.getters[`social/post`](this.modalDetailParentPostId) || {}
      );
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
    isEmpty,

    /**
     * Click image -> change url
     * @param { Object } imageObj - { id, thumb, object }
     * @param { Object } post
     */
    handleClickImage({ id }, post) {
      // Change url
      if (typeof window.history.pushState != "undefined") {
        this.modalDetailParentPostId = post.post_id;

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

      // set data
      if (id === post.post_id) {
        this.modalDetailPostId = post.post_id;
      } else {
        this.modalDetailPostId = id;
        this.$store.dispatch(
          `social/${actionTypes.SOCIAL.GET_DETAIL_POST}`,
          id
        );
      }

      this.$nextTick(() => {
        this.modalDetailShow = true;
      });
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
      this.modalDetailParentPostId = null;
      this.modalDetailPostId = null;
      this.$store.dispatch(`social/${actionTypes.SOCIAL.CLEAR_DETAIL_POST}`);
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

    showModalConfirmDelete(id) {
      this.modalConfirmDelete = true;
      this.modalConfirmDeleteId = id;
    },

    hideModalConfirmDelete() {
      this.modalConfirmDelete = false;
      this.modalConfirmDeleteId = null;
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
      const dataWithModel = editPost(data);

      this.modalEditPostLoading = true;

      const doEdit = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.EDIT_POST}`,
        dataWithModel
      );

      if (doEdit.success) {
        this.modalEditPostLoading = false;
        this.showModalEditPost = false;
      } else {
        this.$toasted.error(doEdit.message);
        this.modalEditPostLoading = false;
      }
    },

    openModalShare(post) {
      this.shareData = post;
      this.$nextTick(() => {
        this.showModalShare = true;
      });
    },

    cancelShare() {
      this.showModalShare = false;
      this.shareData = {};
    },

    async sharePost({ post_id, content, list_tag, label_id }, cb) {
      const shareModel = createShare(post_id, content, list_tag, label_id);
      const doShare = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.SHARE}`,
        shareModel
      );

      if (doShare.success) {
        this.cancelShare();
        cb();
      } else {
        this.$toasted.error(doShare.message);
      }
    },

    //
    //
    //
    //
    //
    /**
     * Infinite scroll handler
     */
    async feedInfiniteHandler($state) {
      const getData = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.GET_FEEDS}`,
        {
          params: {
            page: get(this, "feeds.page.number", 0) + 1
          }
        }
      );

      if (getData.success && !isEmpty(getData.data)) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    /**
     * To Submit POST a post
     */
    async addPost(data, cb) {
      const dataWithModel = createPost(data);

      this.postLoading = true;
      this.postEditorActive = false;

      const doAdd = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.ADD_POST}`,
        dataWithModel
      );

      if (doAdd.success) {
        cb();
      } else {
        this.$toasted.error(doAdd.message);
      }

      this.postLoading = false;
    },

    /**
     * To DELETE a post
     */
    async deletePost(id) {
      this.modalConfirmDeleteLoading = true;
      const doDelete = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.DELETE_POST}`,
        id
      );

      if (!doDelete.success) {
        this.$toasted.error(doDelete.message);
      }

      this.hideModalConfirmDelete();
      this.modalConfirmDeleteLoading = false;
    },

    /**
     * To LIKE a POST
     */
    async likePost(id, cb) {
      const likeModel = createLike(id, LIKE_SOURCE_TYPES.POST, LIKE_TYPES.LIKE);

      await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.LIKE_POST}`,
        likeModel
      );

      // Have to run cb
      cb();
    },

    /**
     * To GET comment of post
     */
    async getComment(postId, page, setIsFetchingComment, setIsCommentFetched) {
      setIsCommentFetched && setIsFetchingComment(true);

      const getComment = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.GET_COMMENT}`,
        {
          source_id: postId,
          page
        }
      );

      setIsFetchingComment && setIsFetchingComment(false);
      setIsCommentFetched && setIsCommentFetched(true);
    },

    /**
     * To POST a comment to post
     */
    async postComment(postId, { content, listTags, image, link }, clearEditor) {
      const commentModel = createComment({
        source_id: postId,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link
      });

      const doPostComment = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.ADD_COMMENT}`,
        commentModel
      );

      if (doPostComment.success) {
        clearEditor();
      } else {
        this.$toasted.error(doPostComment.message);
      }
    },

    /**
     * To EDIT a comment of post
     */
    async editComment(dataModel, cancelEdit) {
      const commentModel = editComment(dataModel);

      const doEdit = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.EDIT_COMMENT}`,
        commentModel
      );

      if (doEdit.success) {
        cancelEdit();
      } else {
        this.$toasted.error(doEdit.message);
      }
    },

    /**
     * To DELETE a comment of post
     */
    async deleteComment({ id, source_id }, page) {
      const doDelete = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.DELETE_COMMENT}`,
        { id, source_id }
      );

      if (doDelete.success) {
        await this.getComment(source_id, page);
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    /**
     * To LIKE a comment of post
     */
    async likeComment(id, postId) {
      const model = createLike(id, LIKE_SOURCE_TYPES.COMMENT, LIKE_TYPES.LIKE);
      await this.$store.dispatch(`social/${actionTypes.SOCIAL.LIKE_COMMENT}`, {
        model,
        postId
      });
    },

    /**
     * To GET child comment list of post
     */
    async getChildComment(parentCommentId, postId, page, setIsFetchingComment) {
      setIsFetchingComment && setIsFetchingComment(true);

      const doGet = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.GET_CHILD_COMMENT}`,
        {
          source_id: postId,
          parent_comment_id: parentCommentId,
          page
        }
      );

      setIsFetchingComment && setIsFetchingComment(false);
    },

    /**
     * To POST a child comment of post
     */
    async postChildComment(dataModel, clearEditor) {
      const model = createComment(dataModel);
      const doAction = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.ADD_CHILD_COMMENT}`,
        model
      );

      if (doAction.success) {
        clearEditor();
      } else {
        this.$toasted.error(doAction.message);
      }
    },

    /**
     * To EDIT a child comment of post
     */
    async editChildComment(dataModel, cancelEdit) {
      const model = editComment(dataModel);

      const doEdit = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.EDIT_CHILD_COMMENT}`,
        model
      );

      if (doEdit.success) {
        cancelEdit();
      } else {
        this.$toasted.error(doEdit.message);
      }
    },

    /**
     * To DELETE a child comment of post
     */
    async deleteChildComment({ id, source_id, parent_comment_id }, page) {
      const doDelete = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.DELETE_CHILD_COMMENT}`,
        { id, source_id, parent_comment_id }
      );

      if (doDelete.success) {
        await this.getChildComment(parent_comment_id, source_id, page);
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    /**
     * To LIKE a child comment of post
     */
    async likeChildComment(id, postId, parentCommentId) {
      const model = createLike(id, LIKE_SOURCE_TYPES.COMMENT, LIKE_TYPES.LIKE);
      await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.LIKE_CHILD_COMMENT}`,
        {
          model,
          postId,
          parentCommentId
        }
      );
    },

    /**
     * To LIKE detail post modal
     */
    async likeDetailPost(id, cb) {
      const likeModel = createLike(id, LIKE_SOURCE_TYPES.POST, LIKE_TYPES.LIKE);

      await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.LIKE_DETAIL_POST}`,
        likeModel
      );

      // Have to run cb
      cb();
    },

    /**
     * To GET comment of detail post modal
     */
    async getCommentDetailPost(
      postId,
      page,
      setIsFetchingComment,
      setIsCommentFetched
    ) {
      setIsCommentFetched && setIsFetchingComment(true);

      const getComment = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.GET_COMMENT_DETAIL_POST}`,
        {
          source_id: postId,
          page
        }
      );

      setIsFetchingComment && setIsFetchingComment(false);
      setIsCommentFetched && setIsCommentFetched(true);
    },

    /**
     * To POST comment of detail post modal
     */
    async postCommentDetailPost(
      postId,
      { content, listTags, image, link },
      clearEditor
    ) {
      const commentModel = createComment({
        source_id: postId,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link
      });

      const doPostComment = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.ADD_COMMENT_DETAIL_POST}`,
        commentModel
      );

      if (doPostComment.success) {
        clearEditor();
      } else {
        this.$toasted.error(doPostComment.message);
      }
    },

    /**
     * To EDIT comment of detail post modal
     */
    async editCommentDetailPost(dataModel, cancelEdit) {
      const commentModel = editComment(dataModel);

      const doEdit = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.EDIT_COMMENT_DETAIL_POST}`,
        commentModel
      );

      if (doEdit.success) {
        cancelEdit();
      } else {
        this.$toasted.error(doEdit.message);
      }
    },

    /**
     * To DELETE comment of detail post modal
     */
    async deleteCommentDetailPost({ id, source_id }, page) {
      const doDelete = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.DELETE_COMMENT_DETAIL_POST}`,
        { id, source_id }
      );

      if (doDelete.success) {
        await this.getCommentDetailPost(source_id, page);
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    /**
     * To LIKE comment of detail post modal
     */
    async likeCommentDetailPost(id, postId) {
      const model = createLike(id, LIKE_SOURCE_TYPES.COMMENT, LIKE_TYPES.LIKE);
      await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.LIKE_COMMENT_DETAIL_POST}`,
        {
          model,
          postId
        }
      );
    },

    /**
     * To GET child comment list of post modal
     */
    async getChildCommentDetailPost(
      parentCommentId,
      postId,
      page,
      setIsFetchingComment
    ) {
      setIsFetchingComment && setIsFetchingComment(true);

      const doGet = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.GET_CHILD_COMMENT_DETAI_POST}`,
        {
          source_id: postId,
          parent_comment_id: parentCommentId,
          page
        }
      );

      setIsFetchingComment && setIsFetchingComment(false);
    },

    /**
     * To POST a child comment of post modal
     */
    async postChildCommentDetailPost(dataModel, clearEditor) {
      const model = createComment(dataModel);
      const doAction = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.ADD_CHILD_COMMENT_DETAIL_POST}`,
        model
      );

      if (doAction.success) {
        clearEditor();
      } else {
        this.$toasted.error(doAction.message);
      }
    },

    /**
     * To EDIT a child comment of post modal
     */
    async editChildCommentDetailPost(dataModel, cancelEdit) {
      const model = editComment(dataModel);

      const doEdit = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.EDIT_CHILD_COMMENT_DETAIL_POST}`,
        model
      );

      if (doEdit.success) {
        cancelEdit();
      } else {
        this.$toasted.error(doEdit.message);
      }
    },

    /**
     * To DELETE a child comment of post modal
     */
    async deleteChildCommentDetailPost(
      { id, source_id, parent_comment_id },
      page
    ) {
      const doDelete = await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.DELETE_CHILD_COMMENT_DETAIL_POST}`,
        { id, source_id, parent_comment_id }
      );

      if (doDelete.success) {
        await this.getChildCommentDetailPost(
          parent_comment_id,
          source_id,
          page
        );
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    /**
     * To LIKE a child comment of post modal
     */
    async likeChildCommentDetailPost(id, postId, parentCommentId) {
      const model = createLike(id, LIKE_SOURCE_TYPES.COMMENT, LIKE_TYPES.LIKE);
      await this.$store.dispatch(
        `social/${actionTypes.SOCIAL.LIKE_CHILD_COMMENT_DETAIL_POST}`,
        {
          model,
          postId,
          parentCommentId
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_timeline.scss";
</style>
