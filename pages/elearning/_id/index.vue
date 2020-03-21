<template>
  <div class="container elearning-view">
    <div class="row">
      <div class="col-md-8">
        <h2>{{ info.name }}</h2>

        <div class="elearning-view__info">
          <div class="author">
            <app-avatar :src="info.teacher.avatar.low" :size="32" />
            <span class="name ml-2">{{ info.teacher.name }}</span>
          </div>

          <div class="views ml-auto">
            <IconEye />
            <strong class="ml-2 mr-1">{{ lesson.views }}</strong> lượt xem
          </div>

          <div class="stars">
            <app-stars :stars="Math.floor(lesson.stars)" :size="16" />
            <strong class="ml-3">{{ lesson.stars }}</strong>
            <span>({{ lesson.rates }})</span>
          </div>
        </div>

        <div class="elearning-view__main-nav" v-sticky>
          <a href="#tab1" :class="tab == 1 ? 'active' : ''" @click="tab = 1">Giới thiệu</a>

          <a href="#tab2" :class="tab == 2 ? 'active' : ''" @click="tab = 2">Nội dung bài giảng</a>

          <a href="#tab3" :class="tab == 3 ? 'active' : ''" @click="tab = 3">Giáo viên</a>

          <a href="#tab4" :class="tab == 4 ? 'active' : ''" @click="tab = 4">Đánh giá</a>
        </div>

        <div class="box" id="tab1">
          <h5 class="mb-4">Lợi ích từ bài giảng</h5>
          <div>{{ info.benefits }}</div>
        </div>

        <div class="box">
          <h5 class="mb-4">Mô tả tổng quát</h5>
          <div>
            <p>- Bạn đang mong muốn xây dựng một Hệ thống Kinh doanh Online Bài Bản cho riêng mình mà vẫn chưa tìm được hướng đi rõ ràng từ việc xác định sản phẩm kinh doanh - mô hình kinh doanh phù hợp, cách để liên hệ nhà cung cấp để đàm phán nhập hàng, cách nghiên cứu khách hàng, đối thủ, quảng cáo và tối ưu...... ?</p>
            <p>- Bạn đã có kinh nghiệm Kinh doanh online, và đang mong muốn mở rộng Hệ Thống Online Đa Kênh ngoài kênh truyền thống sang Facebook, Instagram, Zalo, Youtube, Email Marketing, Website, SMS...?</p>
          </div>
          <div class="text-center mt-3 mb-3">
            <a class="btn-load-more">Xem thêm</a>
          </div>
        </div>

        <div id="tab2" class="box elearning-view__content">
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
            <IconPlayO class="mr-3" />Bài 1: Tạo và tối ưu tài khoản Instagram trên máy tính
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
          <CourseTeacherInfo :teacher="teacher" class="mb-4" />
          <hr />
          <div id="tab4" class="pt-2">
            <h5 class="mt-3 mb-4">Đánh giá bài giảng</h5>
            <ElearningRates />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <ElearningRightSide :data="{}" v-sticky sticky-offset="top" />
      </div>
    </div>

    <ElearningSliderTab
      class="mt-4"
      :lessons="sciences"
      :swiperOptions="sliderOptions"
      title="Bài giảng cùng giáo viên"
    />
    <ElearningSliderTab
      :lessons="sciences"
      :swiperOptions="sliderOptions"
      title="Bài giảng liên quan"
      class="mt-5"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

import InfoService from "~/services/elearning/public/Info";

import CourseTeacherInfo from "~/components/page/course/CourseTeacherInfo";
import ElearningSliderTab from "~/components/page/elearning/ElearningSliderTab";
import ElearningRates from "~/components/page/elearning/ElearningRates";
import ElearningRightSide from "~/components/page/elearning/ElearningRightSide";

import IconEye from "~/assets/svg/icons/eye.svg?inline";
import IconPlayO from "~/assets/svg/icons/play-o.svg?inline";
import IconDownload from "~/assets/svg/icons/download.svg?inline";
import IconBooks from "~/assets/svg/icons/books.svg?inline";

export default {
  name: "E-learning",

  components: {
    CourseTeacherInfo,
    ElearningSliderTab,
    ElearningRates,
    ElearningRightSide,
    IconEye,
    IconPlayO,
    IconBooks,
    IconDownload
  },

  async asyncData({ $axios, params }) {
    const getInfo = await new InfoService($axios)[actionTypes.BASE.LIST]({
      params: {
        elearning_id: params.id
      }
    });

    return {
      info: getInfo.data || {}
    };
  },

  data() {
    return {
      tab: 1,
      isAuthenticated: true,
      teacher: {},
      lesson: {
        avatar: "https://picsum.photos/32/32",
        author: "Nguyễn Ngọc Quyên",
        views: 28751,
        stars: 4.5,
        rates: 469,
        price: 0
      },
      sciences: [
        {
          id: 1,
          name: "2 Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 2,
          name: "2 Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 3,
          name: "2 Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 4,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 5,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        },
        {
          id: 6,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 0,
          onlineStatus: "Thời gian học kế tiếp 11:50 AM, 10/12/2019",
          teacher: {
            id: 1,
            name: "Trần Văn A",
            avatar: "https://picsum.photos/20/20",
            star: 4,
            starAmount: 476
          }
        }
      ],
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
    ...mapState("auth", ["loggedUser"])
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-id.scss";
</style>