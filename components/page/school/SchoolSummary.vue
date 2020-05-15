<template>
  <div class="school-summary">
    <div class="partial">
      <div class="row">
        <!--Thumnail-->
        <div class="school-summary__thumnail">
          <img :src="get(school, 'cover.medium', '')" alt />
        </div>
        <!--End Thumnail-->

        <!--Contact-->
        <div class="school-summary__info">
          <h2 class="school-summary__info__title text-primary h4">
            {{ get(school, "name", "") }}
          </h2>
          <div class="school-summary__info__contact">
            <p>
              <i><IconLocation /></i
              ><span> {{ get(school, "address", "") }}</span>
            </p>
            <p>
              <i><IconPhone /></i><span> {{ get(school, "phone", "") }}</span>
            </p>
            <p>
              <i><IconEmail /></i><span> {{ get(school, "email", "") }}</span>
            </p>
            <p>
              <i><IconCode /></i><span> {{ get(school, "code", "") }}</span>
            </p>
          </div>
        </div>
        <!--End Contact-->

        <!--Number of teacher, students, ...-->
        <div class="school-summary__figure">
          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                numeral(get(school, "teacher_number", 0)).format()
              }}</span>
              <p>Giáo viên</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                numeral(get(school, "student_number", 0)).format()
              }}</span>
              <p>Học sinh</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                numeral(get(school, "lession_number", 0)).format()
              }}</span>
              <p>Bài giảng</p>
            </div>
          </div>

          <div class="school-summary__figure__item text-center">
            <div>
              <span class="text-primary">{{
                numeral(get(school, "elearning_number", 0)).format()
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
        <h5 class="font-weight-normal color-text-dark">Giới thiệu</h5>
        <p>{{ description }}</p>
        <div class="text-center mt-3" v-if="load_more">
          <a @click="handleLoadMore" to class="color-primary">Xem thêm</a>
        </div>
      </div>
    </div>
    <!--End intro-->
  </div>
</template>

<script>
import IconLocation from "~/assets/svg/v2-icons/location_on_24px.svg?inline";
import IconUser from "~/assets/svg/icons/user.svg?inline";
import IconPhone from "~/assets/svg/v2-icons/local_phone_24px.svg?inline";
import IconEmail from "~/assets/svg/v2-icons/email_24px.svg?inline";
import IconCode from "~/assets/svg/v2-icons/insert_link_24px.svg?inline";
import { get } from "lodash";
import numeral from "numeral";

const lengthDescription = 300;

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
      default: () => {},
    },
  },

  data() {
    return {
      description: get(this, "school.description", "").substring(
        0,
        lengthDescription
      ),
      load_more: get(this, "school.description.length", 0) > lengthDescription,
    };
  },

  watch: {
    school: {
      handler: function() {
        this.description = get(this, "school.description", "").substring(
          0,
          lengthDescription
        );
      },
      deep: true,
    },
  },

  methods: {
    get,
    numeral,
    handleLoadMore() {
      this.load_more = false;
      this.description = get(this, "school.description", "");
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-summary.scss";
</style>
