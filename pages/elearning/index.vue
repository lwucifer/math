<template>
  <div class="container">
    <ElearningSliderTab
      :lessons="lessons"
      :sciences="sciences"
      :swiperOptions="sliderOptions"
      title="Nổi bật"
    />
    <ElearningSliderTab
      :lessons="lessons"
      :sciences="sciences"
      :swiperOptions="sliderOptions"
      title="Gợi ý"
      class="mt-5"
    />
    <ElearningSliderTab
      :lessons="sciences"
      :swiperOptions="sliderOptions"
      title="Bài giảng mới nhất"
      class="mt-5"
    />
    <div class="text-center mt-3">
      <app-button square>Xem tất cả bài giảng</app-button>
    </div>
    <ElearningSliderTab
      :lessons="sciences"
      :swiperOptions="sliderOptions"
      title="Khóa học mới nhất"
      class="mt-5"
    />
    <div class="text-center mt-3">
      <app-button square>Xem tất cả khóa học</app-button>
    </div>
  </div>
</template>

<script>
import ElearningSliderTab from "~/components/page/elearning/ElearningSliderTab";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningSliderTab
  },

  data() {
    return {
      isAuthenticated: true,
      lessons: [
        {
          id: 1,
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 1,
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
          name: "Nền tảng tiếng Anh cho người mới bắt đầu",
          image: "https://picsum.photos/218/130",
          price: "219000",
          online: 1,
          onlineStatus: "Lớp học đang diễn ra",
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
          id: 8,
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
  },

  watch: {},

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course.scss";
</style>