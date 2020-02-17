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
        <CreateGeneralLessonInformation />
      </div>
    </div>
  </div>
</template>

<script>
import CreateGeneralLessonInformation from "~/components/page/course/CreateLesson/CreateGeneralInformation";

export default {
  layout: "create",

  components: {
    CreateGeneralLessonInformation
  },

  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-create.scss";
</style>