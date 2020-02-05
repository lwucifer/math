<template>
  <div class="container">
    <div class="course-guess__title">
      <h1>Làm chủ 6 công cụ Marketing online HOT NHẤT hiện nay</h1>
      <div class="info">
        <div>
          <app-avatar src="https://picsum.photos/32/32" :size="32" class="mr-2" />
          <span>Vũ Ngọc Quyền</span>
        </div>
        <div>
          <IconUser class="mr-2" />
          <p>
            <strong>28.751</strong> học viên
          </p>
        </div>
        <div class="price">
          <span>$ 169.000 VNĐ</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <AsideBox class="course-guess__side">
          <div class="text-center">
            <img src="https://picsum.photos/259/146" alt />
            <app-button fullWidth square class="mt-3">Mua ngay</app-button>
            <app-button color="white" fullWidth square class="mt-3">Thêm giỏ hàng</app-button>
          </div>
          <div class="links">
            <n-link to class="active">Thông tin chung</n-link>
            <n-link to>Giáo trình</n-link>
            <n-link to>Giảng viên</n-link>
          </div>
        </AsideBox>
      </div>
      <div class="col-md-9">
        <div class="course-guess__content">
          <h3>Lợi ích từ khóa học</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="icon">
                <IconTick />
              </div>
              <p>Bạn sẽ biết, học được các cách</p>
            </div>
            <div class="col-md-6">
              <div class="icon">
                <IconTick />
              </div>
              <p>Có được Nguồn hàng kinh doanh khi liên hệ trực tiếp với người bán, nhà cung cấp</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="icon">
                <IconTick />
              </div>
              <p>Cách nghiên cứu, theo dõi và học hỏi từ chính Đối thủ cạnh tranh của bạn qua các công cụ Miễn phí</p>
            </div>
            <div class="col-md-6">
              <div class="icon">
                <IconTick />
              </div>
              <p>Xác định Sản phẩm kinh doanh phù hợp, Mô hình bạn sẽ Kinh doanh</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="icon">
                <IconTick />
              </div>
              <p>Nhận diện chân dung khách hàng Tiềm năng của mình, cách xây dựng chính sách chăm sóc khách hàn</p>
            </div>
            <div class="col-md-6">
              <div class="icon">
                <IconTick />
              </div>
              <p>Tự tin xây dựng đồng bộ các kênh Marketing (Facebook, Instagram, Zalo, Youtube, Email Marketing,...) qua từng bước chia sẻ chi tiết</p>
            </div>
          </div>
        </div>

        <div class="course-guess__content pb-3">
          <h3>Mô tả tổng quát</h3>
          <div>
            <p>- Bạn đang mong muốn xây dựng một Hệ thống Kinh doanh Online Bài Bản cho riêng mình mà vẫn chưa tìm được hướng đi rõ ràng từ việc xác định sản phẩm kinh doanh - mô hình kinh doanh phù hợp, cách để liên hệ nhà cung cấp để đàm phán nhập hàng, cách nghiên cứu khách hàng, đối thủ, quảng cáo và tối ưu...... ?</p>
            <p>- Bạn đã có kinh nghiệm Kinh doanh online, và đang mong muốn mở rộng Hệ Thống Online Đa Kênh ngoài kênh truyền thống sang Facebook, Instagram, Zalo, Youtube, Email Marketing, Website, SMS...?</p>
            <div class="text-center mt-4">
              <app-button color="white" class="border-0">Xem thêm</app-button>
            </div>
          </div>
        </div>

        <div class="course-guess__content">
          <h3>Giáo trình</h3>
          <div class="chapters-info">
            <p>
              Thể loại:
              <strong class="color-primary">Marketing</strong>
            </p>
            <p class="ml-auto mr-4">
              Số bài:
              <strong class="color-primary">183</strong>
            </p>
            <p>
              Thời lượng:
              <strong class="color-primary">05:50:27</strong>
            </p>
          </div>
          <div class="chapters">
            <div class="chapter">
              <div class="title">
                <span>Chương 1: Mở đầu</span>
                <span>
                  <span>22 bài</span>
                  <a @click="click">
                    <IconDown />
                  </a>
                </span>
              </div>
              <div class="content">
                <div class="item">
                  <IconPlay class="mr-2" />
                  <span>Bài 1: Tạo và tối ưu tài khoản Instagram trên máy tính</span>
                  <span class="ml-auto">09:10</span>
                </div>
                <div class="item">
                  <IconPlay class="mr-2" />
                  <span>Bài 1: Tạo và tối ưu tài khoản Instagram trên máy tính</span>
                  <span class="ml-auto">09:10</span>
                </div>
              </div>
            </div>
            <div class="chapter">
              <div class="title">
                <span>Chương 2: Mở đầu</span>
                <span>
                  <span>22 bài</span>
                  <a @click="click">
                    <IconDown />
                  </a>
                </span>
              </div>
              <div class="content">
                <div class="item">
                  <IconPlay class="mr-2" />
                  <span>Bài 1: Tạo và tối ưu tài khoản Instagram trên máy tính</span>
                  <span class="ml-auto">09:10</span>
                </div>
                <div class="item">
                  <IconPlay class="mr-2" />
                  <span>Bài 1: Tạo và tối ưu tài khoản Instagram trên máy tính</span>
                  <span class="ml-auto">09:10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="course-guess__content pb-3">
          <h3>Giảng viên</h3>
          <div class="teacher-top">
            <app-avatar src="https://picsum.photos/125/125" :size="125" />
            <div class="info">
              <h4 class="name">Vũ Ngọc Quyền</h4>
              <p>Giảng viên</p>
              <div class="stars">
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
              </div>
            </div>

            <div class="right">
              <div>
                <strong class="color-primary">2</strong>
                Khóa học
              </div>
              <div>
                <strong class="color-primary">2.254</strong>
                Học viên
              </div>
            </div>
          </div>

          <div class="mt-4 teacher-bottom">
            <h4 class="mb-3">Tiểu sử</h4>
            <p>- Bạn đang mong muốn xây dựng một Hệ thống Kinh doanh Online Bài Bản cho riêng mình mà vẫn chưa tìm được hướng đi rõ ràng từ việc xác định sản phẩm kinh doanh - mô hình kinh doanh phù hợp, cách để liên hệ nhà cung cấp để đàm phán nhập hàng, cách nghiên cứu khách hàng, đối thủ, quảng cáo và tối ưu...... ?</p>
            <p>- Bạn đã có kinh nghiệm Kinh doanh online, và đang mong muốn mở rộng Hệ Thống Online Đa Kênh ngoài kênh truyền thống sang Facebook, Instagram, Zalo, Youtube, Email Marketing, Website, SMS...?</p>
            <div class="text-center mt-4">
              <app-button color="white" class="border-0">Xem thêm</app-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AsideBox
      title="Các khóa học khác của giảng viên"
      class="link-underline"
      link="/school"
      linkText="Xem toàn bộ >>"
    >
      <CourseSlider :courses="courses" :swiperOptions="sliderOptions" class="rounded" />
    </AsideBox>
  </div>
</template>

<script>
import CourseSlider from "~/components/page/course/CourseSlider";
import CourseItem from "~/components/page/course/CourseItem";
import AsideBox from "~/components/layout/asideBox/AsideBox";
import IconUser from "~/assets/svg/icons/user2.svg?inline";
import IconTick from "~/assets/svg/icons/tick2.svg?inline";
import IconDown from "~/assets/svg/icons/down.svg?inline";
import IconUp from "~/assets/svg/icons/up.svg?inline";
import IconPlay from "~/assets/svg/icons/play.svg?inline";
import IconStar from "~/assets/svg/icons/star.svg?inline";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "Course",

  components: {
    CourseSlider,
    CourseItem,
    AsideBox,
    IconTick,
    IconDown,
    IconUp,
    IconPlay,
    IconStar,
    IconUser
  },

  data() {
    return {
      isAuthenticated: true,
      courses: [
        {
          id: "1",
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/259/155",
          tag: "Ngoại ngữ",
          price: "219000",
          off: "70"
        },
        {
          id: "1",
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/259/155",
          tag: "Ngoại ngữ",
          price: "219000",
          off: "70"
        },
        {
          id: "1",
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/259/155",
          tag: "Ngoại ngữ",
          price: "219000",
          off: "70"
        },
        {
          id: "1",
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/259/155",
          tag: "Ngoại ngữ",
          price: "219000",
          off: "70"
        },
        {
          id: "1",
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/259/155",
          tag: "Ngoại ngữ",
          price: "219000",
          off: "70"
        },
        {
          id: "1",
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/259/155",
          tag: "Ngoại ngữ",
          price: "219000",
          off: "70"
        }
      ],
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 4,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        navigation: false,
        pagination: {
          el: ".swiper-pagination"
        },
        showName: true
      }
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  },

  watch: {},

  methods: {
    activate: function(el) {
      this.active_el = el;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-detail.scss";
</style>