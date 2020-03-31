<template>
    <div class="wrapInfoAccount">
      <div v-if="accounttype === 'STUDENT'">
        <h5>Thông tin trường học</h5>
        <app-input labelFixed  label="Tên trường" disabled/>
        <app-input  label="Mã trường" disabled/>
        <app-input  label="Email" disabled/>
        <app-input  label="Số điện thoại" disabled/>
        <app-input  label="Địa chỉ" disabled/>
        <app-input  label="Mã học sinh" disabled/>
        <app-input  label="Lớp" disabled/>
      </div>
      <div v-else-if="accounttype ==='TEACHER'">
        <h5>Thông tin đơn vị công tác</h5>
        <app-input labelFixed  label="Tên trường" disabled/>
        <app-input  label="Mã trường" disabled/>
        <app-input  label="Email" disabled/>
        <app-input  label="Số điện thoại" disabled/>
        <app-input  label="Địa chỉ" disabled/>
        <app-input  label="Mã cán bộ" disabled/>
        <app-input  label="Chức vụ" disabled/>
        <app-input labelFixed  label="Tổ chuyên môn" disabled/>
        <app-input labelFixed  label="Lớp chủ nhiệm" disabled/>
        <app-input labelFixed  label="Các lớp giảng dạy" disabled/>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{

    }
  },
  props:{
    accounttype: {
      type: String,
      
    }

  },
  components:{
    
  },
  computed:{
    ...mapState("account", ["personalList"]),
  },

}
</script>

<style lang="scss">

</style>