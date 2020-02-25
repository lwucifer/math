<template>
  <div class="school-summary">
    <div class="partial">
      <div class="row">
        <!--Thumnail-->
        <div class="school-summary__thumnail">
          <img :src="school.thumnail" alt />
        </div>
        <!--End Thumnail-->

        <!--Contact-->
        <div class="school-summary__info">
          <h2 class="school-summary__info__title text-primary">
            {{ $_.get(school, "name", "") }}
          </h2>
          <div class="school-summary__info__contact">
            <p>
              <span>Địa chỉ:</span><b> {{ $_.get(school, "address", "") }}</b>
            </p>
            <p>
              <span>Số điện thoại:</span
              ><b> {{ $_.get(school, "phone", "") }}</b>
            </p>
            <p>
              <span>Email:</span><b> {{ $_.get(school, "email", "") }}</b>
            </p>
            <p>
              <span>Mã trường:</span><b> {{ $_.get(school, "code", "") }}</b>
            </p>
          </div>
        </div>
        <!--End Contact-->

        <!--Number of teacher, students, ...-->
        <div class="school-summary__figure">
          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                $_.get(school, "teacher_number", 0)
              }}</span>
              <p>Giáo viên</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                $_.get(school, "student_number", 0)
              }}</span>
              <p>Học sinh</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                $_.get(school, "lession_number", 0)
              }}</span>
              <p>Bài giảng</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                $_.get(school, "elearning_number", 0)
              }}</span>
              <p>Khóa học</p>
            </div>
          </div>
        </div>
        <!--End Number of teacher, students, ...-->
      </div>
    </div>
    <div class="line"></div>
    <!--Intro-->
    <div class="partial">
      <div class="school-summary__intro">
        <h4>Giới thiệu</h4>
        <p>{{ school.intro }}</p>
      </div>
    </div>
    <!--End intro-->
    <div class="line"></div>
  </div>
</template>

<script>
import IconPoint from "~/assets/svg/icons/point.svg?inline";
import IconUser from "~/assets/svg/icons/user.svg?inline";

export default {
  components: {
    IconPoint,
    IconUser
  },

  props: {
    school: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-summary.scss";
</style>
