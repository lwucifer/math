<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="4" />
      </div>
      <div class="col-md-9">
        <div class="box">
          <div class="school-manager__box">
            <div class="d-flex mb-3">
              <h6 class="color-red">Thêm mới giáo viên</h6>
              <n-link :to="'/school/manager/teacher'" class="ml-auto">
                <IconClose class="fill-999" width="13" height="13" />
              </n-link>
            </div>
            <div class="row school-manager__from">
              <div class="col-md-6">
                <div class="form-group">
                  <label>
                    Mã giáo viên
                    <span class="color-red">*</span>
                  </label>
                  <input type="text" :value="code" disabled class="form-control" />
                </div>
                <div class="form-group">
                  <label>
                    Họ và tên
                    <span class="color-red">*</span>
                  </label>
                  <input type="text" :value="name" class="form-control" />
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        Ngày sinh
                        <span class="color-red">*</span>
                      </label>
                      <app-date-picker class="form-control" v-model="birthday" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        Giới tính
                        <span class="color-red">*</span>
                      </label>
                      <app-select-sex v-model="sex" :sex="sex" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>
                    Tổ chuyên môn
                    <span class="color-red">*</span>
                  </label>
                  <app-vue-select
                    class="app-vue-select"
                    v-model="filter.course"
                    :options="courses"
                    label="text"
                    placeholder="Lựa chọn"
                    searchable
                    clearable
                    @input="handleChangedInput"
                    @search:focus="handleFocusSearchInput"
                    @search:blur="handleBlurSearchInput"
                  ></app-vue-select>
                </div>
                <div class="form-group">
                  <label>
                    Số điện thoại
                    <span class="color-red">*</span>
                  </label>
                  <input type="text" :value="phone" class="form-control" />
                </div>
                <div class="form-group">
                  <label>
                    Email
                    <span class="color-red">*</span>
                  </label>
                  <input type="text" :value="email" class="form-control" />
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <app-button size="sm" normal square>Hoàn thành</app-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolManagerSide from "~/components/page/school/manager/SchoolManagerSide";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";

// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";

export default {
  components: {
    IconPhoto,
    IconClose,
    SchoolManagerSide
  },

  data() {
    return {
      isAuthenticated: true,
      school: SCHOOL,
      avatar: [],
      sex: "nam",
      avatarSrc: "https://picsum.photos/170/170",
      filter: {
        course: null,
        status: null,
        time: null
      },
      courses: [
        {
          value: 1,
          text: "Khóa học 1"
        },
        {
          value: 2,
          text: "Khóa học 2"
        }
      ]
    };
  },

  methods: {
    async handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
      const body = new FormData();
      body.append("avatar_images", fileList[0]);
      console.log("[avatar_images]", fileList[0]);
      this.accountPersonalEditAvatar(body).then(result => {});
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>