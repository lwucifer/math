<template>
  <div class="elearning-manager-student__info">
    <div class="row row-space-4">
      <div class="col-4">
        <div class="item">
          <p class="mb-2">
            Họ và tên:
            <strong class="h3">{{data.name}}</strong>
          </p>
          <p>
            Lớp:
            <strong>{{data.class}}</strong>
          </p>
        </div>
      </div>
      <div class="col-7">
        <div class="item">
          <strong>Tiến độ học tập</strong>
          <div class="app-percent">
            <div :style="'width:' + data.percent + '%'" class="relative">
              <span class="dot"></span>
              <span class="app-percent__text">{{data.percent}}%</span>
            </div>
            <div class="app-percent__chart" :style="'width:' + data.percent + '%'"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "E-learning",

  components: {},

  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-student.scss";
</style>