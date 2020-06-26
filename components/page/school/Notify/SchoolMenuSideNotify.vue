<template>
  <div>
      <div class="menu-side-notify">
            <div class="intro-text-school-menu-side">Danh mục</div>
            <app-button
                class="btn-system-school activeMenu"
                color="white"
            >
                <slot name="icon">
                    <IconArrowRight24px class="icon--btn icon--btn--pre"/>
                </slot>
                    Thông báo chung
            </app-button>
            <app-button
                class="btn-system-school my-4"
                color="white"
            >
                <slot name="icon">
                    <IconArrowRight24px class="icon--btn icon--btn--pre"/>
                </slot>
                    Thông báo đối với CBGVNV
            </app-button>
            <app-button
                class="btn-system-school"
                color="white"
            >
                <slot name="icon">
                    <IconArrowRight24px class="icon--btn icon--btn--pre"/>
                </slot>
                    Thông báo đối với Học sinh
            </app-button>
        </div>
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
  </div>
</template>

<script>
import IconArrowRight24px from '~/assets/svg/v2-icons/arrow_right_24px.svg?inline';
export default {
    components:{
        IconArrowRight24px
    }
}
</script>

<style lang="scss">

</style>