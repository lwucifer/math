<template>
  <div class="the-header-department" >
    <div class="the-header-department__content">
      <div class="the-header-department__logo">
        <n-link to="/">
          <Logo />
        </n-link>
      </div>

      <div class="the-header-department__left">
          <form class="the-header__search" @submit.prevent>
            <app-input placeholder="Tìm kiếm"/>
            <button type="submit">
            <IconSearch width="15" height="15" class="icon-search"/>
            </button>
        </form>
      </div>
      <div class="the-header-department__middle-menu">
          <ul>
              <li>
                  <a href="">Dòng thời gian</a>
              </li>
              <li>
                  <a href="">Elearning</a>
              </li>
              <li>
                  <a href="">Giáo viên</a>
              </li>
          </ul>
      </div>
      <div class="the-header-menu-dropdown-department">
          <n-link :to="'#'" class="dropdown">
              Bài giảng và khóa học
            <IconCaretDown width="10" height="6" />
          </n-link>
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
      <div class="the-header__right">
        <ul class="the-header-department__right-menu">
          <li>
            <a href class="the-header-notify">
              <IconMessager />
              <span class="text-white">12</span>
            </a>
          </li>
          <li>
            <a href class="the-header-notify">
              <IconBell width="22" height="22"/>
              <span class="text-white">12</span>
            </a>
          </li>
        </ul>
        <div v-if="isAuthenticated" class="the-header__user">
          <app-avatar class="the-header__user-avt" src="https://picsum.photos/60/60" :size="44"></app-avatar>

          <div
            class="the-header__user-name"
          >{{$store.state.auth.token ? $store.state.auth.token.fullname : ''}}</div>
        </div>

        <div v-else class="d-flex">
          <app-button class="mr-3 btn-login" @click.prevent="redirectSignin">Đăng nhập</app-button>
          <n-link
            class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
            :to="'/auth/signup'"
          >Đăng ký</n-link>
        </div>

        <ModalSigninByPhone :visible="showLogin" @click-close="showLogin = false" />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/assets/svg/logo/schoolly.svg?inline";
import IconSearch from "~/assets/svg/design-icons/search.svg?inline";
import IconMessager from "~/assets/svg/icons/messager.svg?inline";
import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
import IconUser3 from "~/assets/svg/icons/user3.svg?inline";
import IconHistory from "~/assets/svg/icons/history.svg?inline";
import IconExclamation from "~/assets/svg/icons/exclamation.svg?inline";
import IconBell from "~/assets/svg/icons/bell.svg?inline";
import ModalSigninByPhone from "~/components/page/auth/ModalSigninByPhone";
import IconBuilding from "~/assets/svg/design-icons/building.svg?inline";
import IconCoin from "~/assets/svg/design-icons/dollar-alt.svg?inline";
import IconSupport from "~/assets/svg/design-icons/comment-info.svg?inline";
import IconLogout from "~/assets/svg/design-icons/exit.svg?inline";

export default {
  components: {
    Logo,
    IconSearch,
    IconMessager,
    IconCaretDown,
    IconBell,
    ModalSigninByPhone,
    IconUser3,
    IconHistory,
    IconExclamation,
    IconBuilding,
    IconCoin,IconSupport,IconLogout
  },

  data: () => ({
    showLogin: false,
  }),
  computed: {
    isAuthenticated() {
    //   return this.$store.getters["auth/isAuthenticated"];
    return true;
    }
  },
  methods: {
    redirectSignin() {
      this.$router.push("/auth/signin");
    }
  }
};
</script>

<style lang="scss">
.the-header-department{
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
}
.the-header-department__content{
    display: flex;
    align-items: center;
    height: 80px;
    .the-header-department__logo{
        flex-shrink: 0;
        margin-left: 20px;
        margin-right: 5.4rem;

        svg {
            display: block;
            width: 165px;
            height: 47px;
        }
    }
}
.the-header-department__left{
    width: 30%;
    box-sizing: border-box;
    margin-right: 20px;
    .the-header__search{
        width: 100%;
        input{
            width: 90%;
            height: 40px;
        }
        button{
            width: 10%;
            height: 40px;
            background: #32AF85;
            svg{
                path { fill: #ffffff; }
            }
        }
    }
}
.the-header-department__middle-menu{
    list-style-type: none;
    li {
        display: inline-block;
        >a{
            padding-top:30px;
            display: flex;
            flex: row;
            align-items: center;
            text-decoration: none;
            padding:10px;
            color: #333333;
            height: 80px;
            position:relative;
            &:hover,:active {
                color: $color-primary;
                font-weight: bold;
                &::after{
                    content: "";
                    display: block;
                    width: 50%;
                    height: 3px;
                    background-color: $color-primary;
                    bottom: 0;
                    left: 25%;
                    position: absolute;
                }
            }
        }
    } 
    .the-header-department__menu-dropdown{
        .dropdown-content{
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            width: 373px;
            height: 308px;
            z-index: 1;
            display: none;
        }
       .dropdown{
            position: relative;
        }
        
    }
}
.the-header-department__right-menu{
    list-style-type: none;
    margin-right: 2rem;

    li {
        display: inline-block;
    } 
}
.the-header-notify{
    position: relative;
    display: inline-block;
    margin-left: 18px;
    .text-white{
        background: #E9446A;
        border-radius: 12px;
        width: 23px;
        height: 16.3px;
        position: absolute;
        top: -23.75%;
        right: -59.05%;
        font-weight: bold;
        font-size: 10px;
        line-height: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.the-header-menu-dropdown-department{
    display: flex;
    flex: row;
    position: relative;
    margin: 0px 15px 0px 25px;
    >a{
        text-decoration: none;
        color: #333333;
        &:hover{
            font-weight: bold;
            font-size: 14px;
            line-height: 19px;
        }
    }
    svg{
        margin-bottom: 2px;
        path{fill:#32AF85 }
    }
    .dropdown-content{
        display: none;
        flex-direction: column;
        position: absolute;
        background-color: #f9f9f9;
        width: 373px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        top: 110%;
        left: -30%;
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
    &:hover .dropdown-content{
        display: flex;
    }
}
</style>