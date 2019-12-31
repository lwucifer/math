<template>
  <div class="page-timeline">
    <SliderBanner :images="banners" class="timeline-banner" />

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <PostEditor />

          <Post class="mb-4">
            <template slot="media-content">
              <app-divider class="my-4"></app-divider>
              <app-content-box
                tag="a"
                target="_blank"
                href
                class="mb-4"
                size="md"
                image="https://via.placeholder.com/150x150"
                title="ĐỘT PHÁ THU NHẬP 06 KÊNH MARKETING ONLINE NGAY LẬP"
                desc="Tất cả những ai muốn khởi nghiệp Kinh doanh Online bài bản, bắt đầu từ những công việc cốt lõi nhất: xác định sản phẩm kinh doanh, tìm kiếm nguồn hàng kinh doanh, liên hệ nhà cung cấp, nghiên cứu khách hàng, đối thủ, xây dựng nội dung bán hàng..."
                meta-footer="cellphones.com.vn"
              />
            </template>
          </Post>

          <Post>
            <template slot="media-content">
              <PostSlider
                :images="timelineSliderItems"
                class="my-4"
                @click="modalDetailShow = true"
              />
            </template>
          </Post>

          <app-modal v-if="modalDetailShow" @click-overlay="modalDetailShow = false" :width="1170">
            <PostDetail />
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

import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";

export default {
  components: {
    SliderBanner,
    PostEditor,
    AsideBox,
    Post,
    PostSlider,
    PostDetail
  },

  data() {
    return {
      banners: new Array(3).fill(BannerImage, 0),
      coursesTab: 0,
      modalDetailShow: false,
      messages: [
        {
          image: "https://via.placeholder.com/64x64",
          title: "Mr. Damian",
          desc: "Tiếng Trung cơ bản cho người mới bắt đầu 1"
        },
        {
          image: "https://via.placeholder.com/64x64",
          title: "Nguyễn Đăng Dũng",
          desc:
            "Nắm được các kỹ năng cơ bản của giao tiếp: kỹ năng nghe, nói, khen chê và phi ngôn ngữ."
        },
        {
          image: "https://via.placeholder.com/64x64",
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
          image: "https://via.placeholder.com/64x64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        },
        {
          image: "https://via.placeholder.com/64x64",
          title: "Thực hành làm kế toán tổng hợp trên phầm mềm Misa",
          desc: "Nguyễn Lê Hoàng"
        },
        {
          image: "https://via.placeholder.com/64x64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        },
        {
          image: "https://via.placeholder.com/64x64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        },
        {
          image: "https://via.placeholder.com/64x64",
          title: "Chiến lược tài chính",
          desc: "Ts. Lê Thẩm Dương"
        }
      ],
      timelineSliderItems: [
        {
          type: "image",
          src: "https://via.placeholder.com/171x171?text=Image+1"
        },
        {
          type: "video",
          src: "https://via.placeholder.com/171x171?text=Image+2"
        },
        {
          type: "image",
          src: "https://via.placeholder.com/171x171?text=Image+3"
        },
        {
          type: "image",
          src: "https://via.placeholder.com/171x171?text=Image+4"
        },
        {
          type: "image",
          src: "https://via.placeholder.com/171x171?text=Image+5"
        },
        {
          type: "image",
          src: "https://via.placeholder.com/171x171?text=Image+6"
        },
        {
          type: "image",
          src: "https://via.placeholder.com/171x171?text=Image+7"
        },
        {
          type: "image",
          src: "https://via.placeholder.com/171x171?text=Image+8"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/_timeline.scss";
</style>