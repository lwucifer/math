<template>
  <div class="wrap-account-intro-social">
      <h4 class="mb-4">{{title}}</h4>
      <div class="row">
          <IconPersonPin24px class="col-md-1"/>
          <div class="col-md-10">
              <p class="mb-2">Học sinh</p>
              <p>Lớp {{work.class}}</p>
          </div>
          <div class="col-md-1">
              <AccountIntroPrivacy :size="20"/>
          </div>
      </div>
      <div class="row">
          <IconSocialMenuBuilding class="col-md-1 icon-building"/>
          <div class="col-md-10">
              <p class="mb-2">Trường học</p>
              <p>{{work.school}}</p>
              <p>{{work.address}}</p>
          </div>
          <div class="col-md-1">
              <AccountIntroPrivacy :size="20"/>
          </div>
      </div>
  </div>
</template>

<script>
import IconPersonPin24px from '~/assets/svg/v2-icons/person_pin_24px.svg?inline';
import IconSocialMenuBuilding from '~/assets/svg/icons/social-menu-building.svg?inline';
import AccountIntroPrivacy from '~/components/page/social/account/AccountIntroPrivacy';
export default {
    components:{
        IconPersonPin24px,
        IconSocialMenuBuilding,
        AccountIntroPrivacy
    },
    props:{
        title:{
            type: String,
            default:""
        },
        work:{
            type: Object,
            default: ()=>{}
        }
    }
}
</script>

<style lang="scss">

</style>