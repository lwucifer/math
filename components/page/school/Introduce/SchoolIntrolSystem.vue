<template>
  <div>
      <div class="row">
        <div class="col-md-6 mb-3 mx-0" v-for="(item,index) in listSystem" :key="index">
            <app-button
                class="btn-system-school"
                color="white"
                :class="changeContent==item.key ? 'change-tab' :''"
                @click="changeTab(item)"
            >
                <slot name="icon">
                    <IconArrowRight24px class="icon--btn icon--btn--pre"/>
                </slot>
                {{item.name}}
            </app-button>
        </div>
     </div>
     <div class="intro-system-detail-school" v-if="changeContent">
         <div class="title-system-school">
             {{nameSystem}}
         </div>
        <div class="content-system-school container">
            <div class="row mb-4" v-for="(el,index) in 4" :key="index">
                <div class="col-md-2">
                    <img v-lazy="'https://picsum.photos/96/128'"/>
                </div>
                <div class="col-md-10 d-flex flex-column justify-content-center">
                    <div class="d-flex mb-3">
                        <span class="title-left">Họ và tên</span>
                        <span>Ngộ Thị Không</span>
                    </div>
                    <div class="d-flex mb-3">
                        <span class="title-left">Chức vụ</span>
                        <span >Hiệu trưởng</span>
                    </div>
                    <div class="d-flex mb-3">
                        <span class="title-left">Điện thoại</span>
                        <span>0546869</span>
                    </div>
                    <div class="d-flex mb-3">
                        <span class="title-left">Email</span>
                        <span>Gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
import IconArrowRight24px from '~/assets/svg/v2-icons/arrow_right_24px.svg?inline';
export default {
    components:{
        IconArrowRight24px
    },
    data(){
        return{
            changeContent:'',
            nameSystem:',',
            listSystem:[
            {
                name:"Chi Bộ Đảng",
                key:"1"
            },
            {
                name:"Tổ Hành Chính - Văn Phòng",
                key:"2"
            },
            {
                name:"Ban Giám Hiệu",
                key:"3"
            },
            {
                name:"Tổ Chuyên môn",
                key:"4"
            },
            {
                name:"Công Đoàn",
                key:"5"
            },
            {
                name:"Ban thường trực Hội PHHS",
                key:"6"
            },
            {
                name:"Đoàn Thanh Niên",
                key:"7"
            }
        ]
        }
    },
    methods:{
        changeTab(val){
            this.changeContent = val.key
            this.nameSystem = val.name
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_introduce-school.scss";
</style>