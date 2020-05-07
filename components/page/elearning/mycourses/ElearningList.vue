<template>
  <div class="row my-5">
      <div class="col-md-3" v-for="item in 7" :key="item">
        <ElearningItem />
    </div>
  </div>
</template>

<script>
import ElearningItem  from "~/components/page/elearning/mycourses/ElearningItem"
export default {
    components:{
        ElearningItem
    }
}
</script>

<style>

</style>