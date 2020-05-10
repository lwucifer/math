<template>
  <div>
      <h1 class="color-primary">Schoolly</h1>
      <img :src="image">
  </div>
</template>

<script>
import LogoAuth from "~/assets/images/auth/image 13.png"
export default {
  data(){
    return{
      image: LogoAuth 
    }
  }
}
</script>

<style>

</style>