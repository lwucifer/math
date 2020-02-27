<template>
  <div>
      <div class="school-list-box__title">
            <h4>
                <span class="school-list-box__title__name">{{ name }}</span>
            </h4>
        </div>
      <div class="school-list-box__content">
            <div class="row row--school-list">
                <div
                    class="custom-col-lg-5 col-3 col-sm-6 col-xs-12"
                    v-for="(item, index) in items"
                    :key="index"
                >
                    <ProfileItem :item="item"/>
                </div>
            </div>
        </div>
        <div class="school-list-box__footer">
            <div class="text-center">
                <app-button
                    square
                    class="mt-3 school-list-box__footer__submit-btn"
                    @click="showAll"
                >
                    <span class="">Xem tất cả</span>
                </app-button>
            </div>
        </div>
  </div>
</template>

<script>
import ProfileItem from "~/components/page/profile/ProfileItem"
export default {
    components:{
        ProfileItem
    },
    props:{
        items: {
                type: Array,
                required: true,
                default: () => []
            },
        name: {
                type: String,
                required: true
            },

    },
    methods: {
            showAll() {
                console.log('[Component] SchoolListBox: Click `Xem tat ca`')
                this.$emit('showAll', this.id)
            }
        }
}
</script>

<style>

</style>