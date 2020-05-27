<template>
  <div>
    <section class="bg-white">
      <account-cover />
      <account-menu active="intro"/>
    </section>
    <AccountIntro/>
    <AccountIntroWork 
      title="Nơi học tập"
      :work="work"
    />
    <AccountIntroWork 
      title="Nơi công tác"
      :work="work"
    />
  </div>
</template>

<script>
  import AccountCover from '~/components/page/social/account/AccountCover.vue';
  import AccountIntro from '~/components/page/social/account/AccountIntro.vue';
  import AccountIntroWork from '~/components/page/social/account/AccountIntroWork';
  import AccountMenu from '~/components/page/social/account/AccountMenu.vue'

  export default {
    components: {
      AccountCover,
      AccountIntro,
      AccountIntroWork,
      AccountMenu
    },
    data() {
      return {
        work:{
          class:"10A",
          school:"Trường THPT Nguyễn Trãi",
          address:"22 Hoàng Diệu, Phường Bình Thuận, Quận Hải Châu, TP Đà Nẵng"
        }
      }
    },
    methods: {
      changeTab(item) {
        this.$emit('changeCnt', item)
      }
    }
  }
</script>

<style>

</style>