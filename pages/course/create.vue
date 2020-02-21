<template>
  <div class="container course-create">
    <div class="row">
      <div class="col-md-3">
        <aside class="course-create-aside bg-white">
          <ul class="cca-checkbox-list">
            <li class="active">
              <app-checkbox>Thông tin chung</app-checkbox>
            </li>
            <li>
              <app-checkbox>Nội dung học tập</app-checkbox>
            </li>
            <li>
              <app-checkbox>Cài đặt</app-checkbox>
            </li>
            <li>
              <app-checkbox>Bài tập <span class="cca-sub-text text-sub">(Tùy chọn)</span></app-checkbox>
            </li>
            <li>
              <app-checkbox>Bài kiểm tra <span class="cca-sub-text text-sub">(Tùy chọn)</span></app-checkbox>
            </li>
          </ul>

          <div class="cca-action">
            <app-button square full-width>Gửi lên</app-button>
          </div>
        </aside>
      </div>

      <div class="col-md-9">
        <template v-if="createType === 'lesson'">
          <LessonCreateGeneralInformation class="mb-5"/>
          <LessonCreateLearningContent />
          <LessonCreateSetting />
          <LessonCreateExcercise />
          <LessonCreateExam />
        </template>

        <template v-else>
          <!-- <CourseCreateGeneralInformation class="mb-5"/> -->
          <CourseCreateLearningContent />
          <!-- <CourseCreateSetting />
          <CourseCreateExcercise />
          <CourseCreateExam /> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LessonCreateGeneralInformation from "~/components/page/course/CreateLesson/CreateGeneralInformation";
import LessonCreateLearningContent from "~/components/page/course/CreateLesson/CreateLearningContent";
import LessonCreateSetting from "~/components/page/course/CreateLesson/CreateSetting";
import LessonCreateExcercise from "~/components/page/course/CreateLesson/CreateExcercise";
import LessonCreateExam from "~/components/page/course/CreateLesson/CreateExam";

import CourseCreateGeneralInformation from "~/components/page/course/CreateCourse/CreateGeneralInformation";
import CourseCreateLearningContent from "~/components/page/course/CreateCourse/CreateLearningContent";
import CourseCreateSetting from "~/components/page/course/CreateCourse/CreateSetting";
import CourseCreateExcercise from "~/components/page/course/CreateCourse/CreateExcercise";
import CourseCreateExam from "~/components/page/course/CreateCourse/CreateExam";

export default {
  layout: "create",

  components: {
    LessonCreateGeneralInformation,
    LessonCreateLearningContent,
    LessonCreateSetting,
    LessonCreateExcercise,
    LessonCreateExam,

    CourseCreateGeneralInformation,
    CourseCreateLearningContent,
    CourseCreateSetting,
    CourseCreateExcercise,
    CourseCreateExam
  },

  data() {
    return {
      createType: 'course' // 'lesson' || 'course',
      // createStep: ''
    };
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-create.scss";
</style>