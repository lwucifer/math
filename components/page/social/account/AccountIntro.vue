<template>
  <div class="wrap-account-intro-social">
      <h4 class="mb-4">Giới thiệu</h4>
      <div class="row">
          <IconEmail24px class="col-md-1"/>
          <div class="col-md-10">
              <p class="mb-2">Email</p>
              <p v-if="!editmail">{{mail}}</p>
              <app-input 
                v-model="mail"
                v-else
               />
          </div>
          <div class="col-md-1">
              <button 
                class="btn-hover"
                @click.prevent="editmail =!editmail"
              >
                  <IconEdit24px />
              </button>
          </div>
          <div class="col-md-11 ml-auto" v-if="editmail">
              <hr class="mt-2 mb-4">
                <div class="w-100 text-right">
                    <app-button 
                        color="secondary" 
                        outline
                        @click.prevent="editmail=false"
                    >
                            
                    Hủy
                    </app-button>
                    <app-button class="ml-3">Lưu</app-button>
                </div>
          </div>
      </div>
      <div class="row">
            <IconSmartPhone1 class="col-md-1"/>
            <div class="col-md-10">
                <p class="mb-2">Số điện thoại</p>
                <p v-if="!editphone">{{phone}}</p>
                <app-input 
                    v-model="phone"
                    v-else
                />
            </div>
            <div class="col-md-1">
                <button 
                    class="btn-hover"
                    @click.prevent="editphone =!editphone"
                >
                    <IconEdit24px />
                </button>
            </div>
            <div class="col-md-11 ml-auto" v-if="editphone">
                <hr class="mt-2 mb-4">
                    <div class="w-100 text-right">
                        <app-button 
                            color="secondary" 
                            outline
                            @click.prevent="editphone=false"
                        >
                                
                        Hủy
                        </app-button>
                        <app-button class="ml-3">Lưu</app-button>
                    </div>
            </div>
        </div>
        <div class="row">
            <IconCalendarToday24px class="col-md-1"/>
            <div class="col-md-10">
                <p class="mb-2">Ngày sinh</p>
                <p v-if="!editbirthday">{{birthday}}</p>
                <div v-else>
                    <app-select placeholder="Ngày"/>
                    <app-select class="mx-3" placeholder="Tháng"/>
                    <app-select placeholder="Năm"/>
                </div>
            </div>
            <div class="col-md-1">
                <button 
                    class="btn-hover"
                    @click.prevent="editbirthday =!editbirthday"
                >
                    <IconEdit24px />
                </button>
            </div>
            <div class="col-md-11 ml-auto" v-if="editbirthday">
                <hr class="mt-5 mb-4">
                    <div class="w-100 text-right">
                        <app-button 
                            color="secondary" 
                            outline
                            @click.prevent="editbirthday=false"
                        >
                                
                        Hủy
                        </app-button>
                        <app-button class="ml-3">Lưu</app-button>
                    </div>
            </div>
        </div>
        <div class="row">
            <IconUser2 class="col-md-1"/>
            <div class="col-md-10">
                <p class="mb-2">Giới tinh</p>
                <p v-if="!editsex">{{sex}}</p>
                <div v-else>
                    <app-select placeholder="Giới tính"/>
                </div>
            </div>
            <div class="col-md-1">
                <button 
                    class="btn-hover"
                    @click.prevent="editsex =!editsex"
                >
                    <IconEdit24px />
                </button>
            </div>
            <div class="col-md-11 ml-auto" v-if="editsex">
                <hr class="mt-5 mb-4">
                    <div class="w-100 text-right">
                        <app-button 
                            color="secondary" 
                            outline
                            @click.prevent="editsex=false"
                        >
                                
                        Hủy
                        </app-button>
                        <app-button class="ml-3">Lưu</app-button>
                    </div>
            </div>
        </div>
        <div class="row">
            <IconMapPin1 class="col-md-1"/>
            <div class="col-md-10">
                <p class="mb-2">Địa chỉ</p>
                <p v-if="!editaddress">{{address}}</p>
                <app-input 
                    v-model="address"
                    v-else
                />
            </div>
            <div class="col-md-1">
                <button 
                    class="btn-hover"
                    @click.prevent="editaddress =!editaddress"
                >
                    <IconEdit24px />
                </button>
            </div>
            <div class="col-md-11 ml-auto" v-if="editaddress">
                <hr class="mt-2 mb-4">
                    <div class="w-100 text-right">
                        <app-button 
                            color="secondary" 
                            outline
                            @click.prevent="editaddress=false"
                        >
                                
                        Hủy
                        </app-button>
                        <app-button class="ml-3">Lưu</app-button>
                    </div>
            </div>
        </div>
  </div>
</template>

<script>
import IconEmail24px from '~/assets/svg/v2-icons/email_24px.svg?inline';
import IconEdit24px from '~/assets/svg/v2-icons/edit_24px.svg?inline';
import IconCalendarToday24px from '~/assets/svg/v2-icons/calendar_today_24px.svg?inline';
import IconMapPin1 from '~/assets/svg/v2-icons/map-pin-1.svg?inline';
import IconUser2 from '~/assets/svg/v2-icons/user-2.svg?inline';
import IconSmartPhone1 from '~/assets/svg/v2-icons/smart-phone-1.svg?inline';
export default {
    components:{
        IconEmail24px,
        IconEdit24px,
        IconCalendarToday24px,
        IconMapPin1,
        IconUser2,
        IconSmartPhone1
    },
    data(){
        return{
            editmail:false,
            editphone:false,
            editbirthday:false,
            editsex:false,
            editaddress:false,
            mail:"hoangnm@gmail.com",
            phone:"023153458",
            birthday:"05/12/1999",
            sex:"Nam",
            address:"60A Nguyễn Khang"
        }
    }
}
</script>

<style lang="scss">
.wrap-account-intro-social{
    padding:2.2rem;
    background: #FFFFFF;
    margin-top: 1rem;
    p:first-child{
        font-weight: 600;
    }
    .row{
        margin-bottom: 25px;
        &:last-child{
            margin-bottom: 0;;
        }
        .btn-hover{
            svg{
                width: 15px;
                height: 15px;
            }
        }
    }
}
</style>