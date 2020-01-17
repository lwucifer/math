<template>
    <div class="the-header">
        <div class="container the-header__content">
            <div class="the-header__logo">
                <n-link to="/">
                    <Logo/>
                </n-link>
            </div>

            <ul class="the-header__menu">
                <li>
                    <n-link to="/" class="active">Timeline</n-link>
                </li>
                <li>
                    <n-link to="/course">Khoá học</n-link>
                </li>
                <li>
                    <n-link to="/school">Trường học</n-link>
                </li>
                <li>
                    <n-link to="message">Tin nhắn <span class="the-header__menu-status text-active">(2)</span></n-link>
                </li>
            </ul>

            <form class="the-header__search" @submit.prevent>
                <input type="text" placeholder="Tìm kiếm">
                <button type="submit">
                    <IconSearch width="15" height="15"/>
                </button>
            </form>

            <div class="the-header__right">
                <ul class="the-header__right-menu">
                    <li>
                        <a href="" class="the-header__noti">
                            <IconGlobeNoti width="34" height="29"/>
                            <span class="text-white">12</span>
                        </a>
                    </li>
                </ul>

                <div v-if="isAuthenticated" class="the-header__user">
                    <app-avatar class="the-header__user-avt" src="https://picsum.photos/60/60" :size="44"></app-avatar>

                    <div class="the-header__user-name">Nguyễn Tiến Đạt</div>
                    <div class="the-header__user-arrow">
                        <IconCaretDown width="13" height="7"/>
                    </div>
                </div>

                <app-button v-else outline square color="primary" @click="showLogin = true">Đăng nhập</app-button>
                <ModalSigninByPhone :visible="showLogin" :step="1" @click-close="showLogin = false"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from "~/assets/svg/icons/schoolly.svg?inline";
    import IconSearch from "~/assets/svg/icons/search.svg?inline"
    import IconGlobeNoti from "~/assets/svg/icons/globe-noti.svg?inline";
    import IconCaretDown from "~/assets/svg/icons/caret-down.svg?inline";
    import ModalSigninByPhone from "~/components/page/auth/ModalSigninByPhone";


    export default {
        components: {
            Logo,
            IconSearch,
            IconGlobeNoti,
            IconCaretDown,
            ModalSigninByPhone
        },

        data: () => ({
            isAuthenticated: false,
            showLogin: false
        })
    }
</script>

<style lang="scss">
    @import "~/assets/scss/components/the-header/_the-header.scss";
</style>