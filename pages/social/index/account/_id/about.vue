<template>
  <div>
    <section class="bg-white">
      <account-cover />
      <tab-menu
        :list="menus"
        active="intro"
        class="sa__menu"
        @selectedItem="changeTab"
      >
      </tab-menu>
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
  export default {
    components: {
      AccountCover,
      AccountIntro,
      AccountIntroWork
    },
    data() {
      return {
        menus: [
          {
            key: 'timeline',
            text: 'Dòng thời gian'
          },
          {
            key: 'intro',
            text: 'Giới thiệu'
          },
          {
            key: 'friends',
            text: 'Bạn bè'
          },
          {
            key: 'gallery',
            text: 'Ảnh'
          },
        ],
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