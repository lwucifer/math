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
              <a :class="tab == 1 ? 'active' : ''" @click="tab = 1">Tổng quan</a>
              <a :class="tab == 2 ? 'active' : ''" @click="tab = 2">Hỏi đáp</a>
              <a :class="tab == 3 ? 'active' : ''" @click="tab = 3">Thông báo</a>
              <a :class="tab == 4 ? 'active' : ''" @click="tab = 4">Đánh giá</a>
            </div>
            <div class="elearning-lesson__main-content">
              <div class="mb-4">
                <strong>Phù hợp với</strong>
                <p>Bất cứ ai muốn trở thành một Vlogger, tìm hiểu thêm về ngành làm vlog.</p>
              </div>
              <div class="mb-4">
                <strong>Mô tả</strong>
                <p>"Trong khoá học này, người xem sẽ có cái nhìn rõ ràng hơn về nghề ""vlogger"", làm thế nào để trở thành một vlogger, làm thế nào để xây dựng channel thành công, làm thế nào để kiếm được tiền từ nghề và thật nhiều động lực, quyết tâm để có thể xây dựng nên channel của riêng mình. Tự tin là khoá học đầu tiên về Vlog, khoá học các bạn thực sự cần và chính là khoá học bạn đang tìm kiếm. Trong khoá học, các bạn sẽ không phải ""HỌC"", mà tất cả nội dung sẽ được giảng viên chia sẻ dưới hình thức VLOG, mang đến cho các bạn sự gần gũi, thân thuộc mà lại vô cùng hiệu quả. "</p>
              </div>
              <div>
                <strong>Yêu cầu</strong>
                <p>
                  - Yêu cầu của khóa học.
                  <br />- Thời gian.
                  <br />- Đồ ăn, uống (để "tận hưởng" khoá học).
                  <br />- Máy tính (để nghiên cứu, áp dụng).
                  <br />- Máy ảnh hoặc điện thoại (thực hành).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <ElearningLessonSide :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningLessonSide from "~/components/page/elearning/lesson/ElearningLessonSide";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "E-learning",

  components: {
    ElearningLessonSide
  },

  data() {
    return {
      tab: 1,
      isAuthenticated: true,
      teacher: {},
      title: "Làm chủ 6 công cụ Marketing online HOT NHẤT hiện nay",
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
                status: true,
                time: "1 giờ 30 phút"
              },
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: false,
                time: "1 giờ 30 phút"
              },
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: true,
                time: "1 giờ 30 phút"
              },
            ]
          },
          {
            id: 1,
            name: "Chương 1: Các bài học chương 1",
            lessons: [
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: true,
                time: "1 giờ 30 phút"
              },
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: false,
                time: "1 giờ 30 phút"
              },
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: true,
                time: "1 giờ 30 phút"
              },
            ]
          },
          {
            id: 1,
            name: "Chương 1: Các bài học chương 1",
            lessons: [
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: true,
                time: "1 giờ 30 phút"
              },
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: false,
                time: "1 giờ 30 phút"
              },
              {
                id: 1,
                name: "LÀM THẾ NÀO ĐỂ TRỞ THÀNH MỘT VLOGGER YOUTUBER",
                status: true,
                time: "1 giờ 30 phút"
              },
            ]
          },
        ]
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
@import "~/assets/scss/components/elearning/lesson/_elearning-lesson.scss";
</style>