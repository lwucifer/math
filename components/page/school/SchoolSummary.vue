<template>
  <div class="school-summary">
    <div class="partial">
      <div class="row">
        <!--Thumnail-->
        <div class="school-summary__thumnail">
          <img :src="get(school, 'avatar', '')" alt />
        </div>
        <!--End Thumnail-->

        <!--Contact-->
        <div class="school-summary__info">
          <h2 class="school-summary__info__title text-primary">
            {{ get(school, "name", "") }}
          </h2>
          <div class="school-summary__info__contact">
            <p>
              <i><IconLocation/></i><span> {{ get(school, "address", "") }}</span>
            </p>
            <p>
              <i><IconPhone/></i><span> {{ get(school, "phone", "") }}</span>
            </p>
            <p>
              <i><IconEmail/></i><span> {{ get(school, "email", "") }}</span>
            </p>
            <p>
              <i><IconCode/></i><span> {{ get(school, "code", "") }}</span>
            </p>
          </div>
        </div>
        <!--End Contact-->

        <!--Number of teacher, students, ...-->
        <div class="school-summary__figure">
          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                get(school, "teacher_number", 0)
              }}</span>
              <p>Giáo viên</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                get(school, "student_number", 0)
              }}</span>
              <p>Học sinh</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                get(school, "lession_number", 0)
              }}</span>
              <p>Bài giảng</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                get(school, "elearning_number", 0)
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
        <p>{{ get(school, "description", "") }}</p>
        <div class="text-center mt-3">
          <n-link to class="color-primary">Xem thêm</n-link>
        </div>
      </div>
    </div>
    <!--End intro-->
  </div>
</template>

<script>
import IconLocation from '~/assets/svg/v2-icons/location_on_24px.svg?inline';
import IconUser from "~/assets/svg/icons/user.svg?inline";
import IconPhone from '~/assets/svg/v2-icons/local_phone_24px.svg?inline';
import IconEmail from '~/assets/svg/v2-icons/email_24px.svg?inline';
import IconCode from '~/assets/svg/v2-icons/insert_link_24px.svg?inline';

import { get } from "lodash";

export default {
  components: {
    IconLocation,
    IconCode,
    IconPhone,
    IconEmail,
    IconUser,
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
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-summary.scss";
</style>
