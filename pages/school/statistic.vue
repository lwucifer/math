<template>
  <div class="container school-statistic">
    <h3 class="mt-4">Thống kê - Trường THCS Nguyễn Trãi, HĐôngm , Hà Nội</h3>
    <hr class="mt-3 mb-3" />
    <div class="school-statistic__tool">
      <app-button size="sm" rounded>
        <IconFilter />
        <span>Lọc kết quả</span>
      </app-button>
      <app-vue-select
        :options="status"
        label="text"
        placeholder="Theo khối"
        searchable
        clearable
        @input="handleChangedInput"
        @search:focus="handleFocusSearchInput"
        @search:blur="handleBlurSearchInput"
      ></app-vue-select>
      <app-vue-select
        :options="status"
        label="text"
        placeholder="Theo lớp"
        searchable
        clearable
        @input="handleChangedInput"
        @search:focus="handleFocusSearchInput"
        @search:blur="handleBlurSearchInput"
      ></app-vue-select>
    </div>
    <div class="box22 mt-5">
      <div class="school-statistic__grid">
        <div class="row">
          <div class="col-md-3 item">
            <div>
              Tổng số giáo viên
              <h3>1,000</h3>
            </div>
          </div>
          <div class="col-md-3 item">
            <div>
              Tổng số học sinh
              <h3>10,000</h3>
            </div>
          </div>
          <div class="col-md-3 item">
            <div>
              Tổng số bài giảng
              <h3>1,000</h3>
            </div>
          </div>
          <div class="col-md-3 item">
            <div>
              Tổng số khoá học
              <h3>999</h3>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-4 mb-4" />
      <h5>Bảng đánh giá xếp hạng - Trường THCS NguyễnTrãi , HĐôngm , Hà Nội</h5>
      <div class="d-flex-center mt-4">
        <span class="h6">Sắp xếp</span>
        <app-vue-select
          class="min-w-150 ml-3"
          :options="status"
          label="text"
          placeholder="Toàn thời gian"
          searchable
          clearable
          @input="handleChangedInput"
          @search:focus="handleFocusSearchInput"
          @search:blur="handleBlurSearchInput"
        ></app-vue-select>
      </div>
      <p class="d-flex mt-4">
        Lớp có nhiều học sinh tham gia học tập nhất: <strong class="color-primary ml-2">Lớp 6A</strong>
      </p>
      <p class="d-flex mt-4">
        Giáo viên có nhiều bài giảng khoá học nhất: <strong class="color-primary ml-2">Trần Văn Văn</strong>
      </p>
      <p class="d-flex mt-4">
        Giáo viên có nhiều bài giảng khoá học nhất: <strong class="color-primary ml-2">Trần Văn Văn</strong>
        <app-stars :stars="5" class="ml-3 mr-3"/>
        <b>4.5</b>
        <span>(2000)</span>
      </p>
    </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
// Import faked data
import { SCHOOL } from "~/server/fakedata/school/test";

export default {
  components: {
    IconPhoto,
    SchoolAccountSide
  },

  data() {
    return {
      isAuthenticated: true,
      school: SCHOOL,
      avatar: [],
      avatarSrc: "https://picsum.photos/170/170",
      status: [
        {
          value: 1,
          text: "Video"
        },
        {
          value: 2,
          text: "Văn bản"
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
    },
    submit() {
      console.log("[Component] Elearning exam: submitted");
    },
    handleChangedInput(val) {
      if (val !== null) {
      } else {
      }
      console.log("[Component] Elearning exam: changing input...", val);
    },
    handleFocusSearchInput() {
      console.log("[Component] Elearning exam: focus searching ");
    },
    handleBlurSearchInput() {
      console.log("[Component] Elearning exam: blur searching ");
    },
    handleSearch() {
      console.log("[Component] Elearning exam: searching");
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>