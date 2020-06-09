<template>
  <div class="wrap-notification-header" v-click-outside="handleClickOutside">
    <button 
        @click="showMenuNotifi= !showMenuNotifi"
        class="item"
    >
        <IconNotifications24px class="fill-gray" />
        <span class="number">9</span>
    </button>
    <div v-if="showMenuNotifi" class="content-dropdown">
        <div class="header-content">
            <h4 >Thông báo</h4>
            <div class="ml-auto d-flex">
                <n-link 
                    class="d-flex align-items-center text-primary text-decoration-none"
                    to
                >
                    <IconCheck24px class="fill-primary mr-3"/>
                    Đánh dấu tất cả là đã đọc
                </n-link >
                <n-link  
                    class="d-flex align-items-center ml-4 text-decoration-none text-gray"
                    to
                >
                    <IconSettings24px class="mr-3"/>
                    Cài đặt thông báo
                </n-link >
            </div>
        </div>
        <hr>
        <div class="notification-tabs">
            <a :class="{ active: tab === 'elearning' }" @click="tab = 'elearning'">
                <div class="d-flex">
                        e-leaning
                    <div class="count-notification">
                        12
                    </div>
                </div>
            </a>
            <a :class="{ active: tab === 'social' }" @click="tab = 'social'">
                <div class="d-flex">
                        mạng xã hội
                    <div class="count-notification">
                        12
                    </div>
                </div>
            </a>
        </div>
        <div v-if="tab === 'elearning'">
            <div class="tab-notification">
                <notification-item 
                    v-for="(item, index) in notis"
                    :key="index"
                    :isReaded="isReaded"
                    @read="handleReadNotifi"
                />
                <!-- <notification-item 
                    :isReaded="isReaded"
                    @read="handleReadNotifi"
                /> -->
            </div>
        </div>
        <div v-if="tab === 'social'">
            <div class="tab-notification">
                 <notification-item 
                    :isReaded="isReaded"
                    @read="handleReadNotifi"
                />
            </div>
        </div>
        <div class="footer-notification">
            <a>Xem thêm</a>
        </div>
    </div>
  </div>
</template>

<script>
import IconNotifications24px from "~/assets/svg/v2-icons/notifications_24px.svg?inline";
import IconCheck24px from '~/assets/svg/v2-icons/check_24px.svg?inline';
import IconSettings24px from '~/assets/svg/v2-icons/settings_24px.svg?inline';
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    components:{
        IconNotifications24px,
        IconCheck24px,
        IconSettings24px
    },
    data(){
        return {
            showMenuNotifi:false,
            tab: 'elearning',
            isReaded:false
        }
    },
    created() {
        
    },
    computed: {
        ...mapState("elearning/study/notifications", ["notis"]),
    },
    methods:{
        handleClickOutside(){
            this.showMenuNotifi = false;
        },
        handleReadNotifi(val){
            this.isReaded = val;
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-notication-header.scss";
</style>