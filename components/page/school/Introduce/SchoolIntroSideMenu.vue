<template>
  <div>
    <div class="news-intro-school">
      <div class="intro-text-school-menu-side">Tin tức mới</div>
        <div v-for="(item,index) in 5" :key="index">
          <n-link  class="row mb-3 text-decoration-none" to>
            <div class="col-md-4">
              <img  class="w-100" src="~assets/images/tmp/img-intro.png">
            </div>
            <div class="col-md-8">
              <div>
                <p>Danh sách lớp học và thời khóa biểu áp dụng từ ngày 04/5/2020</p>
                <p class="text-sub">01/06/2020</p>
              </div>
            </div>
          </n-link>
      </div>
      <app-button
        square
        size="sm"
        class="px-4 mt-2"
      >
        Xem tất cả
      </app-button>
    </div>
    <div class="notify-intro-school">
      <div class="intro-text-school-menu-side">Thông báo mới</div>
        <div v-for="(item,index) in 5" :key="index">
          <n-link  class="row mb-5 text-decoration-none" to>
            <div class="col-md-3">
              <div class="circle-background">
                <IconEmail24px class="fill-primary"/>
              </div>
            </div>
            <div class="col-md-9">
              <div>
                <p>Thông báo về học bổng của Nhật Bản dành cho cán bộ lãnh đạo trẻ</p>
                <p class="text-sub">01/06/2020</p>
              </div>
            </div>
          </n-link>
      </div>
      <app-button
        square
        size="sm"
        class="px-4"
      >
        Xem tất cả
      </app-button>
    </div>
  </div>
</template>

<script>
import IconEmail24px from '~/assets/svg/v2-icons/email_24px.svg?inline';
export default {
  components:{
    IconEmail24px
  }
}
</script>

<style lang="scss">
@import "~assets/scss/components/school/_introduce-school.scss";
</style>