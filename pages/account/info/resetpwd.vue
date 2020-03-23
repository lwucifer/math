<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
            <SchoolAccountSide :active="1" />
          </div>
          <div class="col-md-9">
              <div>
                  <app-input 
                  labelBold 
                  labelFixed 
                  label="Mật khẩu cũ" 
                  type="password"
                  :validate="validateProps.password"
                  :message="errorMessage.password"
                  v-model="password"
                  @input="handlePassword"
                  />
                  <app-input 
                  labelBold 
                  labelFixed 
                  label="Mật khẩu mới" 
                  type="password"
                  :validate="validateProps.new_password"
                  :message="errorMessage.new_password"
                  v-model="new_password"
                  @input="handleNewPassword"
                  v-on:change="checkPassword"
                  />
                  <app-input labelBold labelFixed :value="name" label="Nhập lại mật khẩu" type="password"/>
              </div>
              <app-button color="red" square>
                   <span class="ml-3">Thay đổi mật khẩu</span>
              </app-button>
          </div>
      </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import { validatePassword } from "~/utils/validations";
import {
  required,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
export default {
    components:{
        SchoolAccountSide
    },
    data(){
        return{
            password:"",
            new_password:"",
            re_new_password:"",
            errorMessage: {
                new_password: "",
                password: "",
                re_new_password: ""
                },
            validateProps: { password: "", new_password: "", re_new_password: "" },
            validate: { password: true },
            errorRespon: false,
            }
    },
    validations: {
        password: { required },
        new_password:{required}
    },
    methods:{
        handlePassword(_password) {
            this.errorRespon = false;
            this.validate.password = true;
            this.validateProps.password = "";
            if (!this.$v.password.required) {
                this.validateProps.password = 2;
                this.errorMessage.password = "Trường này là bắt buộc";
            } else if (validatePassword(_password)) {
                this.validateProps.password = 1;
                this.validate.password = false;
            } else if (!validatePassword(_password)) {
                this.validateProps.password = 2;
                this.errorMessage.password =
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái in hoa, thường và 1 chữ số";
            }
        },
        handleNewPassword(_new_password){
            this.errorRespon = false;
            this.validate.new_password = true;
            this.validateProps.new_password = "";
            if (!this.$v.new_password.required) {
                this.validateProps.new_password = 2;
                this.errorMessage.new_password = "Trường này là bắt buộc";
            } else if (validatePassword(_new_password)) {
                this.validateProps.new_password = 1;
                this.validate.new_password = false;
            } else if (!validatePassword(_new_password)) {
                this.validateProps.new_password = 2;
                this.errorMessage.new_password =
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái in hoa, thường và 1 chữ số";
            }
        },
        checkPassword(_new_password){
            if(this.password==this.new_password){
                console.log('ok')
            }else{
                this.errorMessage.new_password = "Mật khẩu không khớp";
            }
        }
    }
}
</script>

<style>

</style>