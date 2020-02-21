<template>
  <div class="container course-view">
    <h2>{{ elearningInfo.name }}</h2>
    <div class="course-view__info">
      <div class="author">
        <app-avatar :src="teacher.avatar" :size="32" />
        <span class="name ml-2">{{ teacher.name }}</span>
      </div>

      <div class="views">
        <IconEye />
        <strong class="ml-2 mr-1">{{ elearningInfo.review_count }}</strong> lượt
        xem
      </div>

      <div class="price color-red bold" v-if="!elearningInfo.free">
        <IconUsd class="mr-2" />
        {{ price.original_price | toThousandFilter() }} đ
      </div>
      <div class="price color-red bold" v-else>
        <IconUsd class="mr-2" />Miễn phí
      </div>

      <div class="stars">
        <app-stars :stars="Math.floor(lesson.stars)" :size="16" />
        <strong class="ml-3">{{ lesson.stars }}</strong>
        <span>({{ elearningInfo.review_rate }})</span>
      </div>
    </div>

    <div class="course-view__main">
      <div class="row">
        <div class="col-md-9">
          <div class="course-view__thumnail">
            <app-video :poster-src="elearningInfo.avatar"> </app-video>
          </div>

          <div class="course-view__main-nav">
            <a href="#tab1" :class="tab == 1 ? 'active' : ''" @click="tab = 1"
              >Giới thiệu</a
            >

            <a href="#tab2" :class="tab == 2 ? 'active' : ''" @click="tab = 2"
              >Nội dung bài giảng</a
            >

            <a href="#tab3" :class="tab == 3 ? 'active' : ''" @click="tab = 3"
              >Giáo viên</a
            >

            <a href="#tab4" :class="tab == 4 ? 'active' : ''" @click="tab = 4"
              >Đánh giá</a
            >
          </div>

          <div class="box" id="tab1">
            <h5 class="mb-4">Lợi ích từ bài giảng</h5>
            <div class="row">
              <div class="col-md-6 d-flex mb-15">
                <div class="icon mr-2">
                  <IconSuccess width="16" height="16" />
                </div>
                <span>Bạn sẽ biết, học được các cách</span>
              </div>
              <div class="col-md-6 d-flex mb-15">
                <div class="icon mr-2">
                  <IconSuccess width="16" height="16" />
                </div>
                <span
                  >Có được Nguồn hàng kinh doanh khi liên hệ trực tiếp với người
                  bán, nhà cung cấp</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 d-flex mb-15">
                <div class="icon mr-2">
                  <IconSuccess width="16" height="16" />
                </div>
                <span
                  >Cách nghiên cứu, theo dõi và học hỏi từ chính Đối thủ cạnh
                  tranh của bạn qua các công cụ Miễn phí</span
                >
              </div>
              <div class="col-md-6 d-flex mb-15">
                <div class="icon mr-2">
                  <IconSuccess width="16" height="16" />
                </div>
                <span
                  >Nhận diện chân dung khách hàng Tiềm năng của mình, cách xây
                  dựng chính sách chăm sóc khách hàn</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 d-flex mb-15">
                <div class="icon mr-2">
                  <IconSuccess width="16" height="16" />
                </div>
                <span
                  >Nhận diện chân dung khách hàng Tiềm năng của mình, cách xây
                  dựng chính sách chăm sóc khách hàn</span
                >
              </div>
              <div class="col-md-6 d-flex mb-15">
                <div class="icon mr-2">
                  <IconSuccess width="16" height="16" />
                </div>
                <span
                  >Tự tin xây dựng đồng bộ các kênh Marketing (Facebook,
                  Instagram, Zalo, Youtube, Email Marketing,...) qua từng bước
                  chia sẻ chi tiết</span
                >
              </div>
            </div>
          </div>

          <div class="box">
            <h5 class="mb-4">Mô tả tổng quát</h5>
            <div>
              {{ elearningInfo.description }}
              <!-- <p>
                - Bạn đang mong muốn xây dựng một Hệ thống Kinh doanh Online Bài
                Bản cho riêng mình mà vẫn chưa tìm được hướng đi rõ ràng từ việc
                xác định sản phẩm kinh doanh - mô hình kinh doanh phù hợp, cách
                để liên hệ nhà cung cấp để đàm phán nhập hàng, cách nghiên cứu
                khách hàng, đối thủ, quảng cáo và tối ưu...... ?
              </p>
              <p>
                - Bạn đã có kinh nghiệm Kinh doanh online, và đang mong muốn mở
                rộng Hệ Thống Online Đa Kênh ngoài kênh truyền thống sang
                Facebook, Instagram, Zalo, Youtube, Email Marketing, Website,
                SMS...?
              </p> -->
            </div>
            <div class="text-center mt-3 mb-3">
              <a class="btn-load-more">Xem thêm</a>
            </div>
          </div>

          <div id="tab2" class="box course-view__content">
            <h5>Nội dung bài giảng</h5>
            <div class="info">
              <div class="info-item">
                Thể loại:
                <strong class="color-primary">Marketing</strong>
              </div>
              <div class="info-item">
                Trình độ:
                <strong class="color-primary">Lớp 10</strong>
              </div>
              <div class="info-item">
                Môn học:
                <strong class="color-primary">Toán</strong>
              </div>
              <div class="info-item">
                Số bài giảng:
                <strong class="color-primary">1</strong>
              </div>
              <div class="info-item">
                Thời lượng:
                <strong class="color-primary">23:50</strong>
              </div>
            </div>

            <div class="content-item">
              <IconPlayO class="mr-3" />Bài 1: Tạo và tối ưu tài khoản Instagram
              trên máy tính
              <span class="ml-auto">23:50</span>
            </div>
            <div class="content-item">
              <IconBooks class="fill-primary mr-3" />Tài liệu đính kèm
              <strong class="ml-auto color-primary d-flex-center">
                Tải về
                <IconDownload class="ml-2" />
              </strong>
            </div>
          </div>

          <div id="tab3" class="box">
            <h5 class="mb-4">Thông tin giáo viên</h5>
            <course-teacher-info :teacher="teacher" class="mb-4" />
            <hr />
            <div id="tab4" class="pt-2">
              <h5 class="mt-3 mb-4">Đánh giá bài giảng</h5>
              <course-rates />
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <course-right-side :data="{}" />
        </div>
      </div>
    </div>

    <course-slider-tab
      class="mt-4"
      :lessons="sciences"
      :swiperOptions="sliderOptions"
      title="Bài giảng cùng giáo viên"
    />
    <course-slider-tab
      :lessons="sciences"
      :swiperOptions="sliderOptions"
      title="Bài giảng liên quan"
      class="mt-5"
    />
  </div>
</template>

<script>
import CourseTeacherInfo from "~/components/page/course/CourseTeacherInfo";
import IconEye from "~/assets/svg/icons/eye.svg?inline";
import IconUsd from "~/assets/svg/icons/usd.svg?inline";
import IconSuccess from "~/assets/svg/icons/success.svg?inline";
import IconPlayO from "~/assets/svg/icons/play-o.svg?inline";
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";
import CourseSliderTab from "~/components/page/course/CourseSliderTab";
import CourseRates from "~/components/page/course/CourseRates";
import CourseRightSide from "~/components/page/course/CourseRightSide";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
// Import faked data
import { SCIENCES } from "~/server/fakedata/course/courses";

export default {
  components: {
    CourseSliderTab,
    CourseRates,
    CourseRightSide,
    IconEye,
    IconUsd,
    IconSuccess,
    IconPlayO,
    IconBooks,
    IconDownload,
    CourseTeacherInfo
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning-public-info/${actionTypes.ELEARNING.INFO}`,
      params.id
    );
  },

  data() {
    return {
      tab: 1,
      isAuthenticated: true,
      // teacher: {},
      title: "Làm chủ 6 công cụ Marketing online HOT NHẤT hiện nay",
      lesson: {
        avatar: "https://picsum.photos/32/32",
        author: "Nguyễn Ngọc Quyên",
        views: 28751,
        stars: 4.5,
        rates: 469,
        price: 1201000
      },
      sciences: SCIENCES,
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        showName: true
      },
      active_el: 0
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning-public-info", ["elearningInfo"]),
    teacher() {
      return {
        avatar: get(this.elearningInfo, "teacher.avatar", ""),
        name: get(this.elearningInfo, "teacher.name", "")
      };
    },
    price() {
      return {
        original_price: get(this.elearningInfo, "price.original_price", 0)
      };
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-id.scss";
</style>
