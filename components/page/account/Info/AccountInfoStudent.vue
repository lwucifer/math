<template>
    <div class="wrapInfoAccount">
      <div v-if="accounttype === 'STUDENT'">
        <h5>Thông tin trường học</h5>
        <app-input labelFixed  label="Trường" disabled/>
        <app-input  label="Mã học sinh" disabled/>
        <app-input  label="Lớp" disabled/>
      </div>
      <div v-else-if="accounttype ==='TEACHER'">
        <h5>Thông tin đơn vị công tác</h5>
        <app-input labelFixed  label="Trường" disabled/>
        <app-input labelFixed  label="Mã giáo viên" disabled/>
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
.wrapInfoStudent{
  margin-top: 40px;
}
</style>