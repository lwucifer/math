<template>
    <div class="intro-school">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="intro-text">
                    <div class="intro-text__title">Giới thiệu</div>

                    <div class="intro-text__border"></div>

                    <div class="intro-text__content">
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.</p> 

                        <p>Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p> 

                        <p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
                    </div>

                    <app-button
                        size="md"
                        class="intro-text__btn text-white"
                        color="primary">Xem thêm</app-button>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="intro-img">
                    <img src="~assets/images/tmp/img-intro.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_intro-school.scss";
</style>