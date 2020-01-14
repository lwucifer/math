<template>
  <div class="page-timeline">
    <SliderBanner :images="banners" class="timeline-banner" />

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <PostEditor />

          <Post class="mb-4" v-for="(post, index) in postsList" :key="index">
            <PostImage
              :images="post.attachments.map(item => ({ id: item.id, type: item.object, src: item.thumb }))"
              class="my-4"
              @click-item="imageObj => handleClickImage(imageObj, post)"
            />
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
          </div>

          <app-modal
            v-if="modalDetailShow"
            centered
            :width="1170"
            :component-class="{ 'post-detail-modal': true }"
            @close="$router.push('/')"
          >
            <PostDetail :images="timelineSliderItems" @click-close="modalDetailShow = false" />
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
import SliderBanner from "~/components/Slider/SliderBanner";
import PostEditor from "~/components/PostEditor/PostEditor";
import AsideBox from "~/components/AsideBox/AsideBox";
import Post from "~/components/Post/Post";
import PostSlider from "~/components/Post/PostSlider";
import PostDetail from "~/components/Post/PostDetail";
import PostImage from "~/components/Post/PostImage";

import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  watchQuery: ["post_id", "photo_id"],

  components: {
    SliderBanner,
    PostEditor,
    AsideBox,
    Post,
    PostSlider,
    PostDetail,
    PostImage
  },
  async fetch({ params, query, store }) {
    await Promise.all([
      store.dispatch(`social/${actionTypes.SOCIAL_POST.LIST}`)
    ]);
  },

  data() {
    return {
      banners: new Array(3).fill(BannerImage, 0),
      coursesTab: 0,
      modalDetailShow: false,
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
      window.addEventListener("popstate", this.handlerPopstate);
    }
  },

  beforeDestroy() {
    window.removeEventListener("popstate", this.handlerPopstate);
  },

  watch: {
    $route: {
      immediate: true,
      handler: function(newValue) {
        // if (newValue.query.post_id) {
        //   this.modalDetailShow = true;
        // } else {
        //   this.modalDetailShow = false;
        // }
        console.log("watch $route, newValue");
      }
    }
  },

  methods: {
    /**
     * Click image -> change url
     * @param { Object } imageObj - { type: image | video, post: post object }
     */
    handleClickImage(imageObj, post) {
      console.log("handleClickImage", imageObj);
      if (typeof history.pushState != "undefined") {
        history.pushState(
          { theater: true },
          "",
          `${window.location.origin}/post?image_id=${imageObj.id}`
        );
      }
    },

    /**
     * Hande click nav button of browser
     * @param { Object } event - event emited
     */
    handlerPopstate(event) {
      console.log("event.state", event.state);
      const fullPath = document.location.href.replace(
        window.location.origin,
        ""
      );
      const isTheater = document.location.search.includes("&theater");

      if (event.state.theater) {
      } else {
        this.$router.push();
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_timeline.scss";
</style>