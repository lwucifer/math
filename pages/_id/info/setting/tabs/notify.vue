<template>
  <div>
    <div class="mb-6">
      <h4 class="color-primary mb-2">E-LEARNING HỌC TẬP</h4>
      <div class="setting-notify-content__account-info">
        <FormNotify
          v-for="notify in notifys" :key="notify.title"
          :notify="notify"/>
      </div>
    </div>
    
    <div>
      <h4 class="color-primary mb-2">MẠNG XÃ HỘI</h4>
      <div class="setting-notify-content__account-info">
        <FormNotify
          v-for="notify in socials" :key="notify.title"
          :notify="notify"/>
      </div>
    </div>
  </div>
</template>

<script>
  import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline"
  import IconCaretUp from "~/assets/svg/icons/caret-up.svg?inline"
  import FormNotify from "~/components/page/account/info/FormfNotify"
  
  export default {
    layout: 'account-info',
    
    components: {
      IconCaretDown,
      IconCaretUp,
      FormNotify,
    },
    data() {
      return ({
        showFormNotify: false,
        notifys: [
          {
            title: "Thông báo từ giáo viên",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          },
          {
            title: "Nhắc nhở làm bài tập",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          },
          {
            title: "Thông báo khi có điểm",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          },
          {
            title: "Thông báo lịch học tại phòng học online",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          }
        ],
        socials: [
          {
            title: "Bình luận",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          },
          {
            title: "Gắn thẻ",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          },
          {
            title: "Yêu cầu kết bạn",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          },
          {
            title: "Các thông báo khác",
            describe: "Nhận thông báo nhắc nhở làm bài tập ở bài giảng/khóa học mà bạn tham gia"
          }
        ]
      })
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/account/_account-info-setting.scss";
</style>