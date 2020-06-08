<template>
  <div class="wrap-notification-item" :class="isReaded ? 'readed' :''">
      <app-avatar
        :size=50
        class="avatar-notifi"
      />
      <div class="wrap-content-item">
          <p class="content-item" >
              <strong>Ngọc Trinh</strong>
              đã bày tỏ cảm xúc đến bài viết mà bạn được gắn thẻ: “Du lịch Dubai với Trinh” 
          </p>
          <span>15 phút trước</span>
      </div>
      <div class="group-button-item">
            <div class="d-flex justify-content-center" v-click-outside="handleClickOutMenu">
                <button  @click="menuBtn=!menuBtn">
                    <IconMoreHoriz24px />
                </button>
                <ul class="menu-dropdown-content" 
                    v-if="menuBtn"
                   
                >
                    <li @click="handleClickCheck" 
                        v-if="!isReaded"
                    >
                        <a>
                            <IconCheck24px/>Đánh dấu là đã đọc
                        </a>
                    </li>
                    <li @click="handleClickCheck" v-else>
                        <a>
                            <IconCheck24px/>Đánh dấu là chưa đọc
                        </a>
                    </li>
                    <li>
                        <a>
                            <IconDeleteSweep24px/>Xóa thông báo này
                        </a>
                    </li>
                </ul>
            </div>
          
          <button v-if="isReaded">
              <IconEllipse2/>
          </button>
      </div>
  </div>
</template>

<script>
import IconMoreHoriz24px from '~/assets/svg/v2-icons/more_horiz_24px.svg?inline';
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';
import IconCheck24px from '~/assets/svg/v2-icons/check_24px.svg?inline';
import IconDeleteSweep24px from '~/assets/svg/v2-icons/delete_sweep_24px.svg?inline';
export default {
    components:{
        IconMoreHoriz24px,
        IconEllipse2,
        IconCheck24px,
        IconDeleteSweep24px
    },
    props:{
        isReaded:{
            type:Boolean,
            default: false
        }
    },
    data(){
        return{
            menuBtn:false
        }
    },
    methods:{
        handleClickCheck(){
            this.menuBtn = !this.menuBtn;
            this.$emit('read',!this.isReaded);
        },
        handleClickOutMenu(){
            this.menuBtn = false;
        }
    }
}
</script>

<style lang="scss">

</style>