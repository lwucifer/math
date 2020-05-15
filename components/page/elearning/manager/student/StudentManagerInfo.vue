<template>
  <div class="mt-4">
    <div class="row mr-1">
      <div class="col-md-6">
        <div class="wrap-border">
          <app-avatar class="the-header__user-avt" src="https://picsum.photos/80/80" :size="80"></app-avatar>
          <div class="text-black">
            <p class="mb-4">
              Họ và tên:
              <strong>{{progress.name}}</strong>
            </p>
            <p>
              Lớp :
              <strong>{{progress.class_name}}</strong>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-6 wrap-border flex-column justify-content-center">
        <h5 class="mb-4">
          Tiến độ học tập:
          <span class="text-primary">{{progress.progress}} %</span>
        </h5>
        <div class="w-100">
          <app-progress :percentage="progress.progress" size="lg" rounded />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const STORE_TEACHING_PROGRESS = "elearning/teaching/progress";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(STORE_TEACHING_PROGRESS, ["progress"])
  }
};
</script>

<style lang="scss">
.wrap-border {
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  padding: 13px 20px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
}
</style>