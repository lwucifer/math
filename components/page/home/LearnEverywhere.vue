<template>
    <div class="learn-everywhere">
        <div class="container">
            <h1 class="learn-everywhere-title text-center">Học tập cho bất cứ ai, bất cứ nơi nào</h1>

            <div class="learn-everywhere-content">
                <div class="row">
                    <div class="col-12 col-md-5 d-flex align-items-center">
                        <div class="learn-everywhere-box pr-5">
                            <h3 class="learn-everywhere-box__title">Phòng học Online <span>học tập dễ dàng và hiệu quả</span></h3>

                            <div class="border"></div>

                            <div class="learn-everywhere-box__text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </div>

                            <app-button
                                nuxt
                                tag="a"
                                to=""
                                size="md"
                                color="default"
                                class="text-primary"
                                outline>Tham gia</app-button>
                        </div>
                    </div>

                    <div class="col-12 col-md-7">
                        <div class="learn-everywhere-box">
                            <img src="/images/home/learn-everywhere-1.png" alt="">
                        </div>
                    </div>


                    <div class="col-12 col-md-5">
                        <div class="learn-everywhere-box">
                            <img src="/images/home/learn-everywhere-2.png" alt="">
                        </div>
                    </div>

                    <div class="col-12 col-md-7 d-flex align-items-center">
                        <div class="learn-everywhere-box learn-everywhere-box--modifier">
                            <h3 class="learn-everywhere-box__title">Mạng xã hội tích hợp <span>kết nối mọi người</span></h3>

                            <div class="border"></div>

                            <div class="learn-everywhere-box__text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </div>

                            <app-button
                                nuxt
                                tag="a"
                                to=""
                                size="md"
                                color="default"
                                class="text-primary"
                                outline>Kết nối</app-button>
                        </div>
                    </div>


                    <div class="col-12 col-md-5 d-flex align-items-center">
                        <div class="learn-everywhere-box pr-5">
                            <h3 class="learn-everywhere-box__title">Bài giảng và khóa học <span>đầy đủ cho mọi cấp độ</span></h3>

                            <div class="border"></div>

                            <div class="learn-everywhere-box__text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </div>

                            <app-button
                                nuxt
                                tag="a"
                                to=""
                                size="md"
                                color="default"
                                class="text-primary"
                                outline>Học miễn phí</app-button>
                        </div>
                    </div>

                    <div class="col-12 col-md-7">
                        <div class="learn-everywhere-box">
                            <img src="/images/home/learn-everywhere-3.png" alt="">
                        </div>
                    </div>
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
@import "~/assets/scss/components/home/_learn-everywhere.scss";
</style>