<template>
  <div class="about-feature">
      <div class="container">
          <div class="about-feature__title">
              <p>Tính năng</p>
              <p>nổi bật của sản phẩm</p>
          </div>
          <div class="about-feature__group-btn row">
              <button
                class="col-md-4 about-feature__btn"
                :class="btnChange == 1 ? 'active' : ''"
              >
                  Học sinh
              </button>
              <button
                class="col-md-4 about-feature__btn"
              >
                  Giáo viên
              </button>
              <button
                class="col-md-4 about-feature__btn"
              >
                  Quản trị
              </button>
          </div>
          <div class="row">
              <div class="col-md-6">
                  <div class="about-feature__img"></div>
              </div>
              <div class="col-md-6">
                  <div class="d-flex align-items-center mt-3 mb-4">
                      <div class="mr-5">
                          <IconCheckCircle1 height="20" width="20"/>
                      </div>
                      <div>
                          Học tập trên Web, Mobile app thông qua các hệ thống bài giảng, khóa học đa dạng được cá nhân hóa.
                      </div>
                  </div>
                  <div class="d-flex align-items-center mb-4">
                      <div class="mr-5">
                          <IconCheckCircle1 height="20" width="20"/>
                      </div>
                      <div>
                          Học trực tiếp với giáo viên qua phòng học online.
                      </div>
                  </div>
                  <div class="d-flex align-items-center mb-4">
                      <div class="mr-5">
                          <IconCheckCircle1 height="20" width="20"/>
                      </div>
                      <div>
                          Tương tác trực tiếp với giáo viên thông qua các công cụ hỏi đáp.
                      </div>
                  </div>
                  <div class="d-flex align-items-center mb-4">
                      <div class="mr-5">
                          <IconCheckCircle1 height="20" width="20"/>
                      </div>
                      <div>
                          Theo dõi tiến độ học tập, tỷ lệ hoàn thành các bài giảng khóa học.
                      </div>
                  </div>
                  <div class="d-flex align-items-center mb-4">
                      <div class="mr-5">
                          <IconCheckCircle1 height="20" width="20"/>
                      </div>
                      <div>
                          Đánh giá năng lực bản thân thông qua hệ thống các bài tập, bài kiểm tra và kỳ thi.
                      </div>
                  </div>
                  <div class="d-flex align-items-center mb-4">
                      <div class="mr-5">
                          <IconCheckCircle1 height="20" width="20"/>
                      </div>
                      <div>
                         Đánh giá năng lực giáo viên.
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import IconCheckCircle1 from '~/assets/svg/icons/check-circle-1.svg?inline';
export default {
    components:{
        IconCheckCircle1
    },
    data(){
        return{
            btnChange: 1
        }
    }
}
</script>

<style lang="scss">

</style>