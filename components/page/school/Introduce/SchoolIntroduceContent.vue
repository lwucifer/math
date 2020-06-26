<template>
    <div class="wrap-intro-school">
        <div class="row">
            <div class="col-md-8">
                <div class="intro-text">
                    <div class="mb-4">
                        <app-button
                            square
                            color='white'
                            class="mr-4 btn-intro-school"
                            @click.prevent="tab='intro'"
                            :class="tab=='intro' ? 'active' :''"
                        >
                            Giới thiệu chung
                        </app-button>
                        <app-button
                            square
                            color='white'
                            class="btn-intro-school"
                            @click.prevent="tab='diagram'"
                            :class="tab=='diagram' ? 'active' :''"
                        >
                            Sơ đồ tổ chức
                        </app-button>
                    </div>
                    
                    <div v-if="tab=='intro'">
                        <div class="mt-2">
                            <img  class="w-100" src="~assets/images/tmp/img-intro.png" alt="">
                        </div>

                        <div class="intro-text__content">
                            <div class="intro-text-school">20 Năm một chặng đường</div>
                            <p class="mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.</p> 

                            <p class="mb-4">Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p> 

                            <p class="mb-4">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
                        </div>
                    </div>
                    <div v-else-if="tab=='diagram'">
                        <SchoolIntrolSystem/>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <SchoolIntroSideMenu/>
            </div>
        </div>
    </div>
</template>

<script>
import SchoolIntroSideMenu from "~/components/page/school/Introduce/SchoolIntroSideMenu"
import SchoolIntrolSystem from "~/components/page/school/Introduce/SchoolIntrolSystem"
export default {
    components:{
        SchoolIntroSideMenu,
        SchoolIntrolSystem
    },
    data(){
        return{
            tab:'intro'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/components/school/_intro-school.scss";
@import "~assets/scss/components/school/_introduce-school.scss";
</style>