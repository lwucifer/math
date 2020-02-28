<template>
  <div class="school-account__side">
    <div class="auth">
      <div class="avatar">
        <app-avatar :src="teacher.avatar" :size="125" />
        <app-upload class="cgi-upload-avt change-avatar" @change="handleUploadChange">
          <template>
            <div class="cgi-upload-avt-preview">
              <IconPhoto width="22" height="22" />
            </div>
          </template>
        </app-upload>
      </div>
      <p class="course-teacher__name">{{teacher.name}}</p>
      <p>Giảng viên</p>
      <n-link
        square
        class="mt-3 btn btn--color-primary btn--square color-white"
        to="/course/create"
      >Tạo khóa học</n-link>
    </div>
    <div class="links">
      <n-link class="link-gray" to>Khóa học</n-link>
      <n-link class="link-gray" to>Kho nhập liệu</n-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      isAuthenticated: true,
      teacher: {
        id: "1",
        name: "Savannah Mckinney",
        avatar: "https://picsum.photos/125/125"
      }
    };
  },

  methods: {
    async handleUploadChange(fileList, event) {}
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>