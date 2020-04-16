<template>
  <div>
      <h5 class="color-primary my-4">E-LEARNING HỌC TẬP</h5>
      <div class="setting-notify-content__account-info">
        <div class="d-flex">
            <div>
                <p>Thông báo từ giáo viên</p>
                <p>Thông báo đẩy, Email</p>
            </div>
            <button class="btn-show-form__account-info" @click.prevent="showFormNotify=!showFormNotify">
                <IconCaretUp class="icon" v-if="showFormNotify"/>
                <IconCaretDown class="icon" v-else/>
            </button>
        </div>
         <FormNotify v-if="showFormNotify"/>
        <hr>
        <div class="pt-4">
            <p>Nhắc nhở làm bài tập</p>
            <p>Thông báo đẩy, Email</p>
            <FormNotify/>
        </div>
        <hr>
        <div class="pt-4">
            <p>Thông báo sau khi có điểm</p>
            <p>Thông báo đẩy, Email</p>
        </div>
        <hr>
        <div class="pt-4">
            <p>Thông báo lịch học tại phòng học online</p>
            <p>Thông báo đẩy, Email</p>
        </div>
      </div>

      <h5 class="color-primary my-4">MẠNG XÃ HỘI</h5>
      <div class="setting-notify-content__account-info">
        <div>
            <p>Bình luận</p>
            <p>Thông báo đẩy, Email</p>
        </div>
        <hr>
        <div class="pt-4">
            <p>Gắn thẻ</p>
            <p>Thông báo đẩy, Email</p>
        </div>
        <hr>
        <div class="pt-4">
            <p>Yêu cầu kết bạn</p>
            <p>Thông báo đẩy, Email</p>
        </div>
        <hr>
        <div class="pt-4">
            <p>Các thông báo khác</p>
            <p>Thông báo đẩy, Email</p>
        </div>
      </div>
  </div>
</template>

<script>
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconCaretUp from "~/assets/svg/icons/caret-up.svg?inline";
import FormNotify from "~/components/page/account/info/FormfNotify"
export default {
    components:{
        IconCaretDown,
        IconCaretUp,
        FormNotify
    },
    data(){
        return({
            showFormNotify:false
        })
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-info-setting.scss";
</style>