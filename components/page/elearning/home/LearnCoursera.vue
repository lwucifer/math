<template>
    <div class="learn-coursera">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-5">
                    <div class="learn-coursera__img">
                        <IconPlayCircleFilled  width="64px" height="64px"/>
                    </div>
                </div>

                <div class="col-12 col-md-7">
                    <div class="learn-coursera__text">
                        <div class="text-title">Learner outcomes on Coursera</div>

                        <div class="content">87% of people learning for professional development report career benefits like getting a promotion, a raise, or starting a new career</div>

                        <app-button
                            nuxt
                            to=""
                            class="text-white"
                            color="primary"
                            size="md">Tạo tài khoản</app-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconPlayCircleFilled from '~/assets/svg/v2-icons/play_circle_filled.svg?inline';

export default {
    components: {
        IconPlayCircleFilled
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/home/_learn-coursera.scss";
</style>