<template>
  <div>
      <div v-for="index in 6" :key="index">
          <AnnoucementItem />
          <hr>
      </div>
  </div>
</template>

<script>
import AnnoucementItem from "~/components/page/account/Info/AnnouncementItem"
export default {
    components:{
        AnnoucementItem
    },
    data(){
       return{
          
       }
    }
}
</script>

<style lang="scss">

</style>