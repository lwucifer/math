<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <SchoolManagerSide active="3" />
      </div>
      <div class="col-md-9">
        <div class="box">
          <div class="school-manager__box">
            <div class="d-flex mb-4">
              <h6 class="color-red">Thêm mới tổ chuyên môn</h6>
              <n-link :to="'/school/manager/group'" class="ml-auto">
                <IconClose class="fill-999" width="13" height="13" />
              </n-link>
            </div>
            <div class="school-manager__from">
              <div class="row">
                <div class="col-md-12">
                  <label>Tổ chuyên môn</label>
                </div>
                <div class="col-md-12">
                  <app-input v-model="name"/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label>Giáo viên trong tổ</label>
                </div>
                <div class="col-md-12">
                  <div>
                    <app-select
                      mode="tags"
                      :options="tagOptions"
                      v-model="tag"
                      placeholder="Nhập họ tên hoặc mã giáo viên"
                      style="width: 100%"
                    >
                      <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
                        <app-avatar src="https://picsum.photos/80/80" size="sm" class="mr-3"></app-avatar>
                        {{ option.text }}
                      </div>
                    </app-select>
                    <app-divider class="ma-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <app-button size="sm" normal square>Xác nhận</app-button>
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
      ],
      tag: [],
      tagOptions: [
        { value: 0, text: "Nguyen Tien Dat" },
        { value: 1, text: "Nguyen Van A" },
        { value: 2, text: "Nguyen Van B" },
        { value: 3, text: "Nguyen Van C" },
        { value: 4, text: "Nguyen Van D" },
        { value: 5, text: "Nguyen Van E" },
        { value: 6, text: "Nguyen Van F" },
        { value: 7, text: "Nguyen Van G" }
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
    },

    handleCloseTag(id, index) {
      this.$emit("change", this.unSelectOption(index));
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>