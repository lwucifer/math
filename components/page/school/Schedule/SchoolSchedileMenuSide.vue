<template>
  <div>
    <div class="news-intro-school">
        <div class="intro-text-school-menu-side">Tin xem nhiều</div>
            <div v-for="(item,index) in 5" :key="index">
                <n-link  class="row mb-3 text-decoration-none" to>
                    <div class="col-md-5">
                        <img  class="w-100" src="~assets/images/tmp/img-intro.png">
                    </div>
                    <div class="col-md-7">
                        <div>
                            <p>Danh sách lớp học và thời khóa biểu áp dụng từ ngày 04/5/2020</p>
                            <p class="text-sub">01/06/2020</p>
                        </div>
                    </div>
                </n-link>
            </div>
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