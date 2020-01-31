<template>
    <div class="container">
        <div class="account__cover">
            <img :src="account.cover">
            <a href class="change-cover">
                <IconPhoto width="26" height="26"/>
            </a>
            <div class="account__avatar">
                <div class="avatar">
                    <app-avatar :src="account.avatar" :size="170"/>
                    <a href class="change-avatar">
                        <IconPhoto width="22" height="22"/>
                    </a>
                </div>
                <h3>{{account.name}}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="account__side">
                    <div class="account__side-item info">
                        <h3>Giới thiệu</h3>
                        <table>
                            <tr>
                                <td>Email</td>
                                <td>hello@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Số điện thoại</td>
                                <td>0988777999</td>
                            </tr>
                            <tr>
                                <td>Ngày sinh</td>
                                <td>06/09/1996</td>
                            </tr>
                            <tr>
                                <td>Giới tính</td>
                                <td>Nam</td>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <td>10 Lê Văn Lương</td>
                            </tr>
                        </table>
                        <app-button square fullWidth>Chỉnh sửa thông tin</app-button>
                    </div>

                    <div class="account__side-item photos">
                        <h3>Ảnh</h3>
                        <div class="row m-0">
                            <div class="col-md-4 p-0">
                                <img src="https://picsum.photos/110/110">
                            </div>
                            <div class="col-md-4 p-0">
                                <img src="https://picsum.photos/110/110">
                            </div>
                            <div class="col-md-4 p-0">
                                <img src="https://picsum.photos/110/110">
                            </div>
                            <div class="col-md-4 p-0">
                                <img src="https://picsum.photos/110/110">
                            </div>
                            <div class="col-md-4 p-0">
                                <img src="https://picsum.photos/110/110">
                            </div>
                            <div class="col-md-4 p-0">
                                <img src="https://picsum.photos/110/110">
                            </div>
                        </div>
                        <app-button square fullWidth>Xem toàn bộ ảnh</app-button>
                    </div>

                    <div class="account__side-item friends">
                        <h3>Bạn bè <span>268</span></h3>
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                                <strong>Regina Edwards</strong>
                            </div>
                            <div class="col-md-4 mb-3">
                                <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                                <strong>Regina Edwards</strong>
                            </div>
                            <div class="col-md-4 mb-3">
                                <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                                <strong>Regina Edwards</strong>
                            </div>
                            <div class="col-md-4 mb-3">
                                <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                                <strong>Regina Edwards</strong>
                            </div>
                            <div class="col-md-4 mb-3">
                                <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                                <strong>Regina Edwards</strong>
                            </div>
                            <div class="col-md-4 mb-3">
                                <app-avatar src="https://picsum.photos/110/110" :size="100"/>
                                <strong>Regina Edwards</strong>
                            </div>
                        </div>
                        <app-button square fullWidth>Tất cả bạn bè</app-button>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="account__main">
                    <ul class="account__tab-nav">
                        <li><a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Timeline</a></li>
                        <li><a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Bạn bè</a></li>
                        <li><a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Ảnh</a></li>
                    </ul>
                    <div class="tab-content">
                          <PostEditor />
                          <app-skeleton class="mb-4"></app-skeleton>
                          <Post class="mb-4" v-for="(post, index) in postsList" :key="index">
                            <PostImage
                              :images="post.attachments.map(item => ({ id: item.id, type: item.object, src: item.thumb }))"
                              class="my-4"
                              @click-item="imageObj => handleClickImage(imageObj, post)"
                            />
                          </Post>
                          <Post class="mb-4" v-for="post in postsList" :key="post.label"
                          :fullname="post.creator.fullname"
                          :updated="post.updated"
                          :likes="post.likes"
                          :comments="post.comments"
                          :content="post.content">
                          </Post>

                          <div class="d-none">
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
                                      :images="[{ type: 'image', src: 'https://picsum.photos/1920/1080'}]"
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
                                        { type: 'image', src: 'https://picsum.photos/361/361'},
                                        { type: 'image', src: 'https://picsum.photos/361/361'},
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
                                        { type: 'image', src: 'https://picsum.photos/546/362'},
                                        { type: 'image', src: 'https://picsum.photos/179/179'},
                                        { type: 'image', src: 'https://picsum.photos/179/179'},
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
                                        { type: 'image', src: 'https://picsum.photos/555/555'},
                                        { type: 'image', src: 'https://picsum.photos/182/182'},
                                        { type: 'image', src: 'https://picsum.photos/182/182'},
                                        { type: 'image', src: 'https://picsum.photos/182/182'},
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
                                        { type: 'image', src: 'https://picsum.photos/729/437'},
                                        { type: 'image', src: 'https://picsum.photos/178/178'},
                                        { type: 'image', src: 'https://picsum.photos/178/178'},
                                        { type: 'image', src: 'https://picsum.photos/178/178'},
                                        { type: 'image', src: 'https://picsum.photos/178/178'},
                                      ]"
                                      class="my-4"
                                      @click-item="modalDetailShow = true"
                                    />
                                  </template>
                                </Post>
                                <!-- END DEMO FOR POST 5 IMAGE -->
                                <app-modal
                                    v-if="modalDetailShow"
                                    centered
                                    :width="1170"
                                    :component-class="{ 'post-detail-modal': true }"
                                    @close="handleCloseModal"
                                >
                                    <PostDetail slot="content" :images="timelineSliderItems" @click-close="handleCloseModal" />
                                </app-modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostEditor from "~/components/page/timeline/postEditor/PostEditor";
import AsideBox from "~/components/layout/asideBox/AsideBox";
import Post from "~/components/page/timeline/post/Post";
import PostSlider from "~/components/page/timeline/post/PostSlider";
import PostDetail from "~/components/page/timeline/post/PostDetail";
import PostImage from "~/components/page/timeline/post/PostImage";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  watchQuery: ["post_id", "photo_id"],

  components: {
    PostEditor,
    Post,
    PostSlider,
    PostDetail,
    PostImage,
    IconPhoto,
  },
  async fetch({ params, query, store }) {
    console.log('watchQuery')
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_POST.LIST}`)
    ]);
  },

  data() {
    return {
      tab: 1,
      modalDetailShow: false,
      account: {
            id: '1',
            name: 'Dat Pham',
            avatar: 'https://picsum.photos/170/170',
            cover: 'https://picsum.photos/1170/400',
        },
        messages: [
        {
          image: "https://picsum.photos/64/64",
          title: "Mr. Damian",
          desc: "Tiếng Trung cơ bản cho người mới bắt đầu 1"
        },
        {
          image: "https://picsum.photos/64/64",
          title: "Nguyễn Đăng Dũng",
          desc:
            "Nắm được các kỹ năng cơ bản của giao tiếp: kỹ năng nghe, nói, khen chê và phi ngôn ngữ."
        },
        {
          image: "https://picsum.photos/64/64",
          title: "Trần Quyền",
          desc: "Tiếng Trung cơ bản cho người mới bắt đầu 1"
        }
      ],
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
      coursesList: [
        {
          image: "https://picsum.photos/64/64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        },
        {
          image: "https://picsum.photos/64/64",
          title: "Thực hành làm kế toán tổng hợp trên phầm mềm Misa",
          desc: "Nguyễn Lê Hoàng"
        },
        {
          image: "https://picsum.photos/64/64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        },
        {
          image: "https://picsum.photos/64/64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        },
        {
          image: "https://picsum.photos/64/64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        }
      ],
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
    if (process.browser) {
      window.addEventListener("popstate", event => setTimeout(() => this.handlePopstate(event)));
    }
  },

  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("popstate", event => setTimeout(() => this.handlePopstate(event)));
    }
  },

  methods: {
    /**
     * Click image -> change url
     * @param { Object } imageObj - { type: image | video, post: post object }
     */
    handleClickImage(imageObj, post) {
      console.log("handleClickImage", imageObj);
      if (typeof window.history.pushState != "undefined") {
        window.history.pushState(
          { theater: true },
          "",
          `${window.location.origin}/post?photo_id=${imageObj.id}`
        );
      }

      this.modalDetailShow = true;
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
    }
  }
};
</script>

<style>
    @import "~/assets/scss/components/account/_account.scss";
</style>


