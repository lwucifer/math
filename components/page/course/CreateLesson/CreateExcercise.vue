<template>
  <div>
    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <div class="cc-panel__body">
        <app-alert type="warning" class="mb-4" show-close>
          <template slot="icon">
            <IconInfoCircle class="icon ce-alert-icon heading-3 fill-sub" />
          </template>
          Bạn có thể tạo bài kiểm tra bắt buộc cho bài giảng, khóa học của bạn tại đây. Học sinh cần hoàn thành bài kiểm tra và đạt điểm để hoàn thành khóa học.
        </app-alert>

        <app-button class="font-weight-semi-bold" color="secondary" size="sm" square>Tạo bài tập</app-button>
      </div>
    </div>

    <div class="cc-panel bg-white mb-4">
      <div class="cc-panel__title">
        <h1 class="cc-panel__heading heading-5 text-primary">Bài tập</h1>
      </div>

      <div class="cc-panel__body">
        <div class="mb-4">
          <label for="title" class="text-sub mb-2 d-inline-block">Tiêu đề bài tập</label>
          <app-input id="title" :counter="10" />
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="require" class="text-gray caption">Bài tập bắt buộc?</label>
          </div>
          <div class="col-md-10">
            <app-select
              class="cc-select"
              id="require"
              :options="[{ value: 1, text: 'Có'}, { value: 0, text: 'Không'}]"
              placeholder="Bắt buộc"
              size="sm"
              style="width: 112px"
            >
              <template slot="placeholder-icon">
                <IconAngleDown class="icon" />
              </template>
            </app-select>
          </div>
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="time" class="text-gray caption">Thời gian làm bài</label>
          </div>

          <div class="col-md-10">
            <app-input type="number" class="mb-0" id="time" size="sm" style="width: 112px"></app-input>
          </div>
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="point" class="text-gray caption">Điểm đạt</label>
          </div>

          <div class="col-md-10">
            <app-input type="number" class="mb-0" id="point" size="sm" style="width: 112px"></app-input>
          </div>
        </div>

        <div class="row align-items-center mb-4">
          <div class="col-md-2">
            <label for="count" class="text-gray caption">Số lần làm bài</label>
          </div>

          <div class="col-md-10">
            <app-input type="number" class="mb-0" id="count" size="sm" style="width: 112px"></app-input>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <app-button size="sm" color="disabled" class="font-weight-semi-bold mr-4" square>Huỷ bỏ</app-button>
          <app-button size="sm" color="primary" class="font-weight-semi-bold" square>Tạo bài tập</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconInfoCircle from "~/assets/svg/design-icons/info-circle.svg?inline";
import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";

export default {
  components: {
    IconInfoCircle,
    IconAngleDown
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/create/_create-excercise.scss";
</style>