<template>
  <div class="container elearning-lesson">
    <div class="elearning-lesson__main">
      <div class="row">
        <div class="col-md-8">
          <div class="box11">
            <div class="elearning-lesson_image">
              <img src="https://picsum.photos/750/422" alt />
            </div>
            <div class="elearning-lesson__main-nav">
              <n-link :to="'/elearning/course'">Tổng quan</n-link>
              <a class="active">Hỏi đáp</a>
              <n-link :to="'/elearning/course/notify'">Thông báo</n-link>
              <n-link :to="'/elearning/course/question'">Đánh giá</n-link>
            </div>
            <div class="elearning-lesson__main-content">
              <div class="d-flex-center">
                <strong>154 bình luận</strong>
                <div class="ml-auto d-flex">
                  <app-input class="mr-3 mb-0" size="sm">
                    <button slot="unit">
                      <IconSearch class="fill-999" height="16" width="16" />
                    </button>
                  </app-input>
                  <app-select v-model="opt" :options="opts" size="sm" />
                </div>
              </div>
              <hr class="mt-4 mb-4" />
              <ElearningCourseComment :data="comments" :auth="auth" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <ElearningCourseSide :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningCourseComment from "~/components/page/elearning/course/comment/Comment";
import ElearningCourseSide from "~/components/page/elearning/course/ElearningCourseSide";
import IconSearch from "~/assets/svg/design-icons/search.svg?inline";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningCourseComment,
    ElearningCourseSide,
    IconSearch,
    IconCamera
  },

  data() {
    return {
      tab: 2,
      isAuthenticated: true,
      teacher: {},
      title: "Làm chủ 6 công cụ Marketing online HOT NHẤT hiện nay",
      opt: "",
      auth: {
        id: 1,
        avatar: "https://picsum.photos/51/51",
        name: "Nguyễn Nguyên"
      },
      comments: [
        {
          id: 1,
          avatar: "https://picsum.photos/60/60",
          name: "Ngọc Quyên",
          content:
            "Từ Bố ơi mình đi đâu thế? đã siêu thích chú Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: ""
        },
        {
          id: 2,
          avatar: "https://picsum.photos/55/55",
          name: "Nguyễn Ngọc",
          content:
            "Bố ơi mình đi đâu thế? đã siêu thích chú Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: ""
        }
      ],
      opts: [
        { value: "", text: "Sắp xếp theo" },
        { value: "1", text: "Nhiều thích nhất" },
        { value: "2", text: "Mới nhất" },
        { value: "3", text: "Cũ nhất" }
      ],
      lesson: {
        avatar: "https://picsum.photos/32/32",
        author: "Nguyễn Ngọc Quyên",
        views: 28751,
        stars: 4.5,
        rates: 469,
        price: 0
      },
      data: {
        number: 9,
        times: "9 giờ 30 phút",
        classes: [
          {
            id: 1,
            name: "Bài giảng online cho khoá học",
            done: false
          },
          {
            id: 2,
            name: "Bài giảng online cho khoá học",
            done: true
          }
        ],
        list: [
          {
            id: 1,
            name: "Chương 1: Các bài học chương 1",
            status: "2/5",
            times: "1 giờ 18 phút",
            lessons: [
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: true,
                time: "1 giờ 30 phút",
                wait: false
              },
              {
                id: 2,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: false,
                time: "1 giờ 30 phút"
              },
              {
                id: 3,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: true,
                time: "1 giờ 30 phút"
              }
            ]
          },
          {
            id: 2,
            name: "Chương 1: Các bài học chương 1",
            status: "2/5",
            times: "1 giờ 18 phút",
            lessons: [
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: true,
                time: "1 giờ 30 phút"
              },
              {
                id: 2,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: false,
                time: "1 giờ 30 phút",
                wait: true
              },
              {
                id: 3,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: true,
                time: "1 giờ 30 phút"
              }
            ]
          },
          {
            id: 3,
            name: "Chương 1: Các bài học chương 1",
            status: "2/5",
            times: "1 giờ 18 phút",
            lessons: [
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: true,
                time: "1 giờ 30 phút"
              },
              {
                id: 2,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: false,
                time: "1 giờ 30 phút"
              },
              {
                id: 3,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                done: true,
                time: "1 giờ 30 phút",
                wait: true
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"])
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course.scss";
</style>