<template>
  <div class="wrap-notification-header">
    <button 
        @click="showMenuNotifi= !showMenuNotifi"
    >
        <IconNotifications24px class="fill-gray" />
    </button>
    <div v-if="showMenuNotifi" class="content-dropdown">
        <div class="header-content">
            <h4 >Thông báo</h4>
            <div class="ml-auto d-flex">
                <div class="d-flex align-items-center text-primary">
                    <IconCheck24px class="fill-primary mr-3"/>
                    Đánh dấu tất cả là đã đọc
                </div>
                <div class="d-flex align-items-center ml-4">
                    <IconSettings24px class="mr-3"/>
                    Cài đặt thông báo
                </div>
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
                <notification-item />
                <notification-item />
            </div>
        </div>
        <div v-if="tab === 'social'">
            <div class="tab-notification">
                <notification-item />
                <notification-item />
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
export default {
    components:{
        IconNotifications24px,
        IconCheck24px,
        IconSettings24px
    },
    data(){
        return {
            showMenuNotifi:false,
            tab: 'elearning'
        }
    },
    methods:{
        handleClickOutside(){
            this.showMenuNotifi = false;
        }
    }
}
</script>

<style lang="scss">
.wrap-notification-header{
    position: relative;
    .content-dropdown{
        background: #FFFFFF;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
        width: 58rem;
        position: absolute;
        top: 6rem;
        right: -3rem;
        z-index: 20;
        &::before{
            content: "";
            position: absolute;
            top: -1.2rem;  /* At the top of the tooltip */
            right: 6%;
            margin-left: -6px;
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent white transparent;
            display: block;
            z-index: 12px;
        }
        .header-content{
            padding: 2rem 1.6rem;
            display: flex;
        }
        .notification-tabs {
            padding: 0 2.4rem;
            border-bottom: 1px solid #E0E0E0;
            a {
                position: relative;
                display: inline-block;
                padding: 1.3rem .5rem;
                text-decoration: none;
                color: $color-text-dark;
                text-transform: uppercase;
                font-weight: 500;
                cursor: pointer;

                + a {
                    margin-left: 4rem;
                }

                &:after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: .3rem;
                    background-color: $color-primary;
                    transition: transform .3s;
                    transform: scale(0)
                }
                
                &:hover {
                    color: $color-primary;
                }

                &.active {
                    color: $color-primary;
                    
                    &:after {
                        transform: scale(1);
                    }
                }
                .count-notification{
                    width: 22px;
                    background: #D50000;
                    border-radius: 12px;
                    color: #FFFFFF;
                    font-size: 1.3rem;
                    text-align: center;
                    margin-left: 1.5rem;
                }
            }
            
        }
        .tab-notification{
            padding-top:10px;
        }
        .footer-notification{
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top:1px solid #E0E0E0;
            a{
                text-decoration: none;
                color: $color-primary;
                font-weight: bold;
                font-size: 15px;
            }
        }
    }
}
</style>