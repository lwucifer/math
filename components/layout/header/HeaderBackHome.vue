<template>
    <header-frame search-placeholder="Tìm kiếm bài giảng và khóa học của bạn" class="header-back-home">
        <template v-slot:functionMenu>
            <div class="d-md-flex">
                <app-button
                size="sm"
                square
                normal
                class="ml-4 btn-secondary-header"
                >
                Quay lại trang chủ
                </app-button>
            </div>
        </template>
        <template v-slot:rightMenu>
            <div v-if="isAuthenticated">
                <app-notification-header />
            </div>

            <div v-if="isAuthenticated" class="the-header__user">
                <app-avatar
                class="the-header__user-avt"
                src="https://picsum.photos/60/60"
                :size="40"
                >
                </app-avatar>
                <div class="dropdown-content">
                    <n-link class="item" to :class="active == 1 ? 'active' : ''">
                        <IconBuilding width="20" height="20"/>Quản lí
                    </n-link>
                    <n-link class="item" to :class="active == 1 ? 'active' : ''">
                        <IconCoin width="20" height="20"/>Thống kê
                    </n-link>
                    <n-link class="item" to :class="active == 1 ? 'active' : ''">
                        <IconUser3 width="20" height="20"/>Thông tin tài khoản
                    </n-link>
                    <n-link class="item" to :class="active == 1 ? 'active' : ''">
                        <IconBell width="20" height="20"/>Thông báo
                    </n-link>
                    <n-link class="item" to :class="active == 1 ? 'active' : ''">
                        <IconHistory width="20" height="20"/>Lịch sử giao dịch
                    </n-link>
                    <n-link class="item" to :class="active == 1 ? 'active' : ''">
                        <IconSupport width="20" height="20"/>Trợ giúp
                    </n-link>
                    <n-link class="item" to :class="active == 1 ? 'active' : ''">
                        <IconLogout width="20" height="20"/>Đăng xuất
                    </n-link>
                </div>
            </div>

            <div v-else class="d-flex">
                <app-button class="mr-3 btn-login" @click.prevent="redirectSignin">Đăng nhập</app-button>
                <n-link
                class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
                :to="'/auth/signup'"
                >Đăng ký</n-link>
            </div>

            <div v-else class="d-flex">
                <app-button class="mr-3 btn-login" @click.prevent="redirectSignin">Đăng nhập</app-button>
                <n-link
                class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
                :to="'/auth/signup'"
                >Đăng ký</n-link>
            </div>

            <ModalSigninByPhone :visible="showLogin" @click-close="showLogin = false" />
        </template>
    </header-frame>
</template>

<script>
import HeaderFrame from "~/components/common/header/HeaderFrame";
export default {
    components:{
        HeaderFrame
    },
    data: () => ({
    showLogin: false
  }),
  computed: {
    isAuthenticated() {
      return true;
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    redirectSignin() {
      this.$router.push("/auth/signin");
    }
  }
}
</script>

<style lang="scss">
.header-back-home{
    .the-header__right{
    margin-left:0;
}
    .the-header__user{
        position: relative;
        &:hover .dropdown-content{
            visibility: visible; /* shows sub-menu */
            opacity: 1;
            z-index: 1;
            transform: translateY(0%);
            transition-delay: 0s, 0s, 0.3s;
        }
    }
    .dropdown-content { 
   /* hides sub-menu */
        list-style-type: none;
        visibility: hidden;
        position: absolute;
        top: 100%;
        z-index: 12;
        opacity: 0;
        right: 0;
        width: 373px;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        transform: translateY(-2em);
        transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
        .item{
            display: flex;
            align-items: center;
            border-bottom:1px solid #EEEEEE;;
            color: #666666;
            font-size: 16px;
            line-height: 22px;
            text-decoration: none;
            width: 100%;
            height: 44px;
            padding: 12px 22px;
            svg{
                margin-right: 10px;
                path{fill:#666666}
            }
        }
        }
}


</style>