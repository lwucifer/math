<template>
  <div class="wrap-notification-header" v-click-outside="handleClickOutside">
    <button 
        @click="showMenuNotifi= !showMenuNotifi"
        class="item"
    >
        <IconNotifications24px class="fill-gray" />
        <span class="number" v-if="countSumNoti > 0">{{ countSumNoti }}</span>
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
                    :to="'/'+token.id+'/info/setting'"
                >
                    <IconSettings24px class="mr-3"/>
                    Cài đặt thông báo
                </n-link >
            </div>
        </div>
        <hr>
        <div class="notification-tabs">
            <a :class="{ active: tab === 'elearning' }" @click="changeTab('elearning')">
                <div class="d-flex">
                        e-leaning
                    <div class="count-notification" v-if="countNotiElearning > 0">
                        {{ countNotiElearning }}
                    </div>
                </div>
            </a>
            <a :class="{ active: tab === 'social' }" @click="changeTab('social')">
                <div class="d-flex">
                        mạng xã hội
                    <div class="count-notification" v-if="countNotiSocial > 0">
                        {{ countNotiSocial }}
                    </div>
                </div>
            </a>
        </div>
        <div v-if="tab === 'elearning'">
            <div class="tab-notification">
                <notification-item 
                    v-for="(item, index) in notiElearning"
                    :key="index"
                    :dataNoti="item"
                    :typeTab="tab"
                />
            </div>
        </div>
        <div v-if="tab === 'social'">
            <div class="tab-notification">
                 <notification-item 
                    v-for="(item, index) in notiSocial"
                    :key="index"
                    :dataNoti="item"
                    :typeTab="tab"
                />
            </div>
        </div>
        <div class="footer-notification">
            <n-link :to="getNotificationLink" @click="showMenuNotifi= !showMenuNotifi">
                Xem thêm
            </n-link>
        </div>
    </div>
  </div>
</template>

<script>
import IconNotifications24px from "~/assets/svg/v2-icons/notifications_24px.svg?inline";
import IconCheck24px from '~/assets/svg/v2-icons/check_24px.svg?inline';
import IconSettings24px from '~/assets/svg/v2-icons/settings_24px.svg?inline';
import { mapState, mapActions, mapGetters } from "vuex";
import { getToken } from "~/utils/auth";
const STORE_NOTIFI = 'elearning/study/notifications'
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

    computed: {
        ...mapState("auth", [
            "token",
        ]),
        ...mapGetters('elearning/study/notifications', ["countSumNoti"]),
        ...mapState("elearning/study/notifications", [
            "notiElearning",
            "notiSocial",
            "countNotiElearning",
            "countNotiSocial"
        ]),
        getNotificationLink() {
            const accountObj = getToken();
            if (!!accountObj) {
                return `/${accountObj.id}/info/announcement`;
            }
        },
    },

    methods:{
        ...mapActions(STORE_NOTIFI, ['getNotifications', 'getCountNotifications']),

        changeTab(_tab){
            this.tab = _tab;
        },
        handleClickOutside(){
            this.showMenuNotifi = false;
        },
        // handleReadNotifi(val){
        //     this.isReaded = val;
        // }
    },
    
    watch: {
        showMenuNotifi(newVal){
            
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-notication-header.scss";
</style>