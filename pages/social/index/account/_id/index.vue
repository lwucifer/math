<template>
  <div>
    <section class="bg-white mb-3">
      <account-cover/>
      <account-menu active="timeline"/>
    </section>
    <section>
      Dòng thời gian
    </section>
  </div>
</template>

<script>
  import AccountCover from '~/components/page/social/account/AccountCover.vue'
  import AccountMenu from '~/components/page/social/account/AccountMenu.vue'
  
  export default {
    components: {
      AccountCover,
      AccountMenu
    },
    data() {
      return {
      
      }
    },
    methods: {
    
    }
  }
</script>

<style>

</style>