<template>
  <div class="list-scroll">
        <n-link to="">Trang chủ</n-link>

        <app-dropdown
            class="sub-list"
            position="left"
            open-on-click
            content-width="100px">

            <a slot="activator" slot-scope="{ on }" v-on="on">
                Giới thiệu <IconCaretDownThin class="ml-2"/>
            </a>

            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </app-dropdown>

        <n-link to="">Bài giảng - Khóa học</n-link>
        <n-link to="">Thông báo <IconCaretDownThin class="ml-2"/></n-link>
        <n-link to="">Tin tức - Sự kiện</n-link>
  </div>
</template>

<script>
import IconCaretDownThin from '~/assets/svg/icons/caret-down-thin.svg?inline';

export default {
    components: {
        IconCaretDownThin
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_list-scrollto.scss";
</style>