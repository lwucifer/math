<template>
  <div class="mt-4">
      <h1 class="color-primary" style="font-size:54px">Schoolly</h1>
      <h3 class="title_image-auth">Giải pháp học trực tuyến</h3>
      <img :src="image">
  </div>
</template>

<script>
import LogoAuth from "~/assets/images/auth/illustration.png"
export default {
  data(){
    return{
      image: LogoAuth 
    }
  }
}
</script>

<style>
.title_image-auth{
  color: #1D4354;
  margin-top: 15px;
  margin-bottom: 100px;
}
</style>