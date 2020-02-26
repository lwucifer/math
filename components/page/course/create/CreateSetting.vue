<template>
  <div class="cc-panel bg-white mb-4">
    <div class="cc-panel__title">
      <h1 class="cc-panel__heading heading-5 text-primary">Cài đặt</h1>
    </div>

    <div class="cc-panel__body">
      <app-alert type="secondary" class="mb-4">
        Vui lòng hoàn thành
        <n-link to>
          <b>hồ sơ cá nhân</b>
        </n-link>&nbsp;trước khi cài đặt học phí cho bài giảng, khóa học của bạn
      </app-alert>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Chế độ hiển thị</div>
        <div class="col-md-9">
          <app-select
            class="cc-select"
            :options="[{ value: 0, text: 'Chế độ hiển thị 1'}, { value: 1, text: 'Chế độ hiển thị 2'}]"
            placeholder="Chọn chế độ hiển thị"
          >
            <template slot="placeholder-icon">
              <IconAngleDown class="icon" />
            </template>
          </app-select>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-4">Cho phép bình luận tại bài giảng</div>
        <div class="col-md-8">
          <app-radio-group v-model="testRadio">
            <app-radio value="1" class="mr-4" checked>Có</app-radio>
            <app-radio value="0">Không</app-radio>
          </app-radio-group>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Học phí</div>
        <div class="col-md-9">
          <app-select
            class="cc-select"
            :options="[{ value: 0, text: 'Học phí 1'}, { value: 1, text: 'Học phí 2'}]"
            placeholder="Chọn học phí"
          >
            <template slot="placeholder-icon">
              <IconAngleDown class="icon" />
            </template>
          </app-select>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Giá bán</div>
        <div class="col-md-4">
          <app-input type="number" class="mb-0"></app-input>
        </div>
      </div>

      <div class="row align-items-center mb-4">
        <div class="col-md-3">Giá sau khuyến mại</div>
        <div class="col-md-4">
          <app-input type="number" class="mb-0"></app-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";

export default {
  components: {
    IconAngleDown
  },

  data() {
    return {
      testRadio: null,
    }
  }
};
</script>

<style>
</style>
