<template>
  <div>
      <div class="row">
        <div class="col-6 d-flex">
            <div>
                <app-avatar src="https://picsum.photos/150/150" :size="150"/>
            </div>
            <div class="wrapInfoTeach__Profile">
                <div>
                    <span>Trần Nam</span>
                </div>
                <div>
                    <span>Giáo viên trường THCS Nguyễn Trãi, Hà Đông, Hà Nội</span>
                </div>
                <div class="d-flex align-items-center">
                    <app-stars :stars="5" :size="20"/>
                    <strong>4.5</strong>
                    <span>  (2000)</span>
                </div>
            </div>
        </div>
      <div class="wrapCourse__Profile col-6">
          <div>
              <span>5</span>
              <span>Bài giảng</span>
          </div>
          <div>
              <span>20</span>
              <span>Bài giảng</span>
          </div>
          <div>
              <span>500</span>
              <span>Bài giảng</span>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "~/assets/scss/components/profile/_profile-teacher-head.scss";
</style>