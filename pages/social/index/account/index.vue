<template>
  <div>
    <section class="bg-white">
      <account-cover />
      <tab-menu
        :list="menus"
        active="timeline"
        class="sa__menu"
        @selectedItem="changeTab"
      >
      </tab-menu>
    </section>
  </div>
</template>

<script>
  import AccountCover from '~/components/page/social/account/AccountCover.vue'
  export default {
    components: {
      AccountCover
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