<template>
  <div class="container mb-6">
    <div class="row">
      <div class="col-md-3">
        <AsideBox title="Trường của tôi" class="school__side">
          <div v-for="(item, index) in myschools" class="mb-3" :key="index">
            <n-link slot="title" to>{{item.name}}</n-link>
          </div>
          <app-button class="timeline-aside-btn mt-4" fullWidth>Tạo trường mới</app-button>
        </AsideBox>
      </div>
      <div class="col-md-9">
        <ul class="school-nav">
          <li>
            <a href class="active">Giới thiệu</a>
          </li>
          <li>
            <a href>Học sinh</a>
          </li>
          <li>
            <a href>Cán bộ, giáo viên</a>
          </li>
          <li>
            <a href>Quản lý thiết bị</a>
          </li>
          <li>
            <a href>Quản lý Thư viện</a>
          </li>
          <li>
            <a href>Quản lý văn thư</a>
          </li>
          <li>
            <a href>Quản lý khoản thu</a>
          </li>
        </ul>

        <SchoolAbout :school="school" />

        <PostListSlider
          :posts="posts"
          :swiperOptions="sliderOptions"
          :showName="true"
          :title="'Tin tức'"
          class="slider-box"
        />
      </div>
    </div>
    <div class="mt-6 school-list-slider">
      <AsideBox
        title="Các trường liên quan"
        class="link-underline"
        link="/school"
        linkText="Xem toàn bộ >>"
      >
        <div class="row">
          <div v-for="(item, index) in schools" class="col-3" :key="index">
            <SchoolDetail :school="item" />
          </div>
        </div>
      </AsideBox>
    </div>
  </div>
</template>

<script>
import SchoolDetail from "~/components/page/school/SchoolDetail";
import SchoolAbout from "~/components/page/school/SchoolAbout";
import PostListSlider from "~/components/page/timeline/post/PostListSlider";
import AsideBox from "~/components/layout/asideBox/AsideBox";
import { mapState } from "vuex";

export default {
  name: "School",

  watchQuery: ["school_id"],

  components: {
    SchoolDetail,
    AsideBox,
    PostListSlider,
    SchoolAbout
  },

  data() {
    return {
      isAuthenticated: true,
      school: {
        id: "1",
        name: "Đại học Đại Nam",
        logo: "https://picsum.photos/171/171",
        avatar: "https://picsum.photos/251/251",
        province: "Hà Nội",
        district: "Hà Đông",
        ward: "Phú Lãm",
        address: "69 ",
        description:
          "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero rutrum, aliquam massa nec, egestas lacus. Aliquam tristique mollis turpis non tempor.</p><br/>" +
          "<p><b>Cơ sở chính:</b> Phú Lãm, Hà Đông, Hà Nội</p>" +
          "<p><b>Cơ sở 1:</b> 56 Vũ Trọng Phụng, Thanh Xuân, Hà Nội</p>" +
          "<p><b>Điện thoại:</b> (024) 35577799 - Fax: (024) 35578759</p>" +
          "<p><b>Email:</b> dnu@dainam.edu.vn</p>",
        level: 1,
        teachers: 10,
        students: 1000,
        status: 1
      },
      sliderOptions: {
        spaceBetween: 10,
        slidesPerView: 4,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        navigation: false,
        pagination: {
          el: ".swiper-pagination"
        },
        showName: true
      },
      posts: [
        {
          image_type: "image",
          image: "https://picsum.photos/200/120",
          id: 1,
          name:
            "Thông báo: Tổ chức thi lần 3 học phần điều kiện tốt nghiệp TOEIC và Nguyên lý CBCN Mác"
        },
        {
          image_type: "image",
          image: "https://picsum.photos/200/120",
          id: 2,
          name:
            "ĐH Đại Nam phát động tuần lễ “nói không” với túi nilon và đồ nhựa sử dụng 1 lần"
        },
        {
          image_type: "image",
          image: "https://picsum.photos/200/120",
          id: 3,
          name:
            "Thông báo: Tổ chức thi lần 3 học phần điều kiện tốt nghiệp TOEIC và Nguyên lý CBCN Mác"
        },
        {
          image_type: "image",
          image: "https://picsum.photos/200/120",
          id: 4,
          name:
            "ĐH Đại Nam phát động tuần lễ “nói không” với túi nilon và đồ nhựa sử dụng 1 lần"
        },
        {
          image_type: "image",
          image: "https://picsum.photos/200/120",
          id: 5,
          name:
            "Thông báo: Tổ chức thi lần 3 học phần điều kiện tốt nghiệp TOEIC và Nguyên lý CBCN Mác"
        },
        {
          image_type: "image",
          image: "https://picsum.photos/200/120",
          id: 6,
          name:
            "ĐH Đại Nam phát động tuần lễ “nói không” với túi nilon và đồ nhựa sử dụng 1 lần"
        }
      ],
      myschools: [
        {
          id: 1,
          name: "Đại học Đại Nam"
        },
        {
          id: 2,
          name: "Trung tâm tiếng Anh Appolo"
        }
      ],
      sliderOptions: {
        spaceBetween: 10,
        slidesPerView: 4,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        navigation: false,
        pagination: {
          el: ".swiper-pagination"
        },
        showName: true
      },
      sliderOptions2: {
        spaceBetween: 10,
        slidesPerView: 4,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true
      },
      schools: [
        {
          avatar: "https://picsum.photos/260/155",
          id: 1,
          name: "Trường THCS Nguyễn Trãi",
          province: "Hà Nội",
          district: "Hà Đông",
          ward: "Phú Lãm",
          address: "69 ",
          students: 1000
        },
        {
          avatar: "https://picsum.photos/260/155",
          id: 2,
          name: "Trường THCS Nguyễn Trãi",
          province: "Hà Nội",
          district: "Hà Đông",
          ward: "Phú Lãm",
          address: "69 ",
          students: 1000
        },
        {
          avatar: "https://picsum.photos/260/155",
          id: 3,
          name: "Trường THCS Nguyễn Trãi",
          province: "Hà Nội",
          district: "Hà Đông",
          ward: "Phú Lãm",
          address: "69 ",
          students: 1000
        },
        {
          avatar: "https://picsum.photos/260/155",
          id: 4,
          name: "Trường THCS Nguyễn Trãi",
          province: "Hà Nội",
          district: "Hà Đông",
          ward: "Phú Lãm",
          address: "69 ",
          students: 1000
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
    classes() {
      return {
        "col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4": !this.isAuthenticated,
        "col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4": this.isAuthenticated
      };
    }
  },

  watch: {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school.scss";
</style>