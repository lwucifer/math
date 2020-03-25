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
              <a class="active">Tổng quan</a>
              <n-link :to="'/elearning/course/question'">Hỏi đáp</n-link>
              <n-link :to="'/elearning/course/notify'">Thông báo</n-link>
              <n-link :to="'/elearning/course/question'">Đánh giá</n-link>
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
// Import faked data
import { COURSE_LESSON } from "~/server/fakedata/elearning/test";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

export default {
  name: "Elearning",
  layout: "exams",

  components: {
    ElearningCourseComment,
    ElearningCourseSide,
    IconSearch,
    IconCamera
  },

  data() {
    return {
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
        list: COURSE_LESSON
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