<template>
  <sub-block-section
    title="Thông tin trường học"
  >
    <template v-slot:content>
      <div class="wrapInfoAccount">
        <app-input labelFixed  label="Tên trường" v-model="organization.name" disabled/>
        <app-input  label="Mã trường" v-model="organization.code" disabled/>
        <app-input  label="Email" v-model="organization.email" disabled/>
        <app-input  label="Số điện thoại" v-model="organization.phone" disabled/>
        <app-input  label="Địa chỉ" v-model="organization.address" disabled/>
        <app-input  label="Mã học sinh" v-model="work.code" disabled/>
        <app-input  label="Lớp" v-model="work.class" disabled/>
      </div>
    </template>
  </sub-block-section>
</template>

<script>
import { mapState } from "vuex";
import { get, map } from "lodash";
export default {
  data(){
    return{
      accountType: get(this,"profileList.role.authority",""),
      organization:{
        code:"",
        name:"",
        phone:"",
        email:"",
        address:""
      },
      work:{
        class:"",
        code:"",
        profession:"",
        homeroom_class:"",
        teaching_classes:"",
        duty:""
      }
    }
  },
  props:{
    profileList: {
      type: Object,
    }
  },
  components:{
  
  },
  computed:{
    ...mapState("account", ["personalList"]),
  },
  created(){
    this.organization.code = get(this,"profileList.organization.code","");
    this.organization.name = get(this,"profileList.organization.name","");
    this.organization.phone = get(this,"profileList.organization.phone","");
    this.organization.email = get(this,"profileList.organization.email","");
    this.organization.address = get(this,"profileList.organization.address","");
    this.work.class = get(this,"profileList.work.classes","");
    this.work.code = get(this,"profileList.code","")
    this.work.profession = get(this,"profileList.work.profession","");
    this.work.homeroom_class = get(this,"profileList.work.homeroom_class","");
    const teachingClasses = get(this,"profileList.work.teaching_classes","");
    this.work.teaching_classes = map(teachingClasses).join(', ');
    this.work.duty = get(this,"profileList.work.duty","");

  }

}
</script>

<style lang="scss">

</style>