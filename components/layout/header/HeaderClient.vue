<template>
  <header-frame
    search-placeholder="Tìm kiếm"
  >
    <template v-slot:functionMenu>
      <div class="d-md-flex">
        <div class="the-header-account-client__middle-menu">
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
        <div class="the-header-account-client__menu-dropdown">
            <n-link :to="'#'" class="dropdown">
                Bài giảng và khóa học
              <IconCaretDown width="10" height="6" />
            </n-link>
            <div class="header-acoount-client__dropdown-content">
              <ul>
                <li class="item">
                  <n-link to="/" class="link-dark">
                    <IconTickGray/>
                    <span>Item 1</span>
                  </n-link>
                </li>
                <li class="item">
                  <n-link to="/" class="link-dark">
                    <IconTickGray/>
                    <span>Item 2</span>
                  </n-link>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </template>

    <template v-slot:rightMenu>
      <div v-if="isAuthenticated">
        <app-notification-header/>
      </div>

      <div v-if="isAuthenticated">
        <user-header/>
      </div>

      <div v-else class="d-flex">
        <app-button class="mr-3 btn-login" @click.prevent="redirectSignin">Đăng nhập</app-button>
        <n-link
          class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
          :to="'/auth/signup'"
        >Đăng ký
        </n-link>
      </div>

      <div v-else class="d-flex">
        <app-button class="mr-3 btn-login" @click.prevent="redirectSignin">Đăng nhập</app-button>
        <n-link
          class="btn btn--size-md btn-outline btn-outline--color-primary btn--square"
          :to="'/auth/signup'"
        >Đăng ký
        </n-link>
      </div>

      <ModalSigninByPhone :visible="showLogin" @click-close="showLogin = false"/>
    </template>
  </header-frame>
</template>

<script>
  import ModalSigninByPhone from "~/components/page/auth/ModalSigninByPhone";
  import HeaderFrame from "~/components/common/header/HeaderFrame";
  import UserHeader from "~/components/common/user-header/UserHeader";
  import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
  import IconTickGray from "~/assets/svg/icons/tick-gray.svg?inline";

  export default {
    components: {
      HeaderFrame,
      UserHeader,
      ModalSigninByPhone,
      IconCaretDown,
      IconTickGray
    },

    data: () => ({
      showLogin: false,
      dropdownShow: false
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
  };
</script>

<style lang="scss" scoped>
  .the-header-account-client__middle-menu{
    list-style-type: none;
    position: relative;
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
                    top: 60px;
                    left: 25%;
                    position: absolute;
                }
            }
        }
        &:last-child{
            position: relative;
            &::after{
                content: "";
                position: absolute;
                right: 0%;
                bottom: 15%;
                background: #333333; 
                height: 24px;
                width: 1px;
                opacity: 0.32;   
            }
        }
    } 
  }
  .the-header-account-client__menu-dropdown{
      margin-left:20px;
      display: flex;
      align-items: center;
      a{
        text-decoration: none;
        color: #666666;
        svg{
          path{fill:#666666}
        }
        &:hover{
          font-weight: bold;
          color: $color-primary;
          svg path{
            fill: $color-primary;
          }
        }
      }
      &:hover .header-acoount-client__dropdown-content{
        display: block;
      }
      .header-acoount-client__dropdown-content{
          display: none;
          position: absolute;
          list-style-type: none;
          width: 16rem;
          top: 60px;
          z-index: 11;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          li{
            display: flex;
            flex-direction: column;
            a{
              background: #ffffff;
              border-bottom: 1px solid #eee;
              padding: 1rem 2rem;
            }
            &:last-child{
                border-bottom: none;
              }
          }
      }
  }
</style>