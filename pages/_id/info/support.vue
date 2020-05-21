<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <SchoolAccountSide :active="7"/>
        </div>

        <div class="col-md-9">
          <div class="support-wrapper">
            <div class="support">
              <h3 class="support__title">Đặt câu hỏi</h3>

              <div class="support__form bg-white">
                <div class="form-group d-flex d-flex align-items-center">
                  <div class="form-name">Email <span>*</span></div>

                  <div class="form-input">
                    <app-input
                      class="mb-0" 
                      size="md" 
                      type="email"
                      placeholder="Nhập email"
                      v-model="email"
                      :validate="validateProps.email"
                      :error="$v.email.$invalid || validate.email"
                      :message="errorMessage.email"
                      @input="handleEmail"
                    />
                  </div>
                </div>

                <div class="form-group d-flex d-flex align-items-center">
                  <div class="form-name">Chủ đề <span>*</span></div>

                  <div class="form-input">
                    <app-input
                      class="mb-0" 
                      size="md" 
                      type="title"
                      placeholder="Nhập chủ đề"
                      v-model="title"
                      :validate="validateProps.title"
                      :error="$v.title.$invalid || validate.title"
                      :message="errorMessage.title"
                      @input="handleTitle"
                    />
                  </div>
                </div>

                <div class="form-group d-flex align-items-start">
                  <div class="form-name mt-3">Mô tả chi tiết <span>*</span></div>

                  <div class="form-input">
                    <textarea 
                      name="" 
                      id="" 
                      rows="10" 
                      placeholder="Nhập mô tả chi tiết"
                      v-model="content"
                      @input="handleContent"
                    ></textarea>
                    <app-error :error="errorMessage.content"></app-error>
                  </div>
                </div>

                <div class="form-group d-flex mb-0">
                  <div class="form-name"></div>
                  <div class="form-input">
                    <div class="upload d-flex align-items-center">
                      <app-upload
                        accept=".jpg, .png, .pdf, .word, .excel"
                        :showIcon="false"
                        title="+ Attach file"
                        :inputText="false"
                        @change="handleSelectFile"
                      /> 
                      
                      <span class="font-italic">Các định dạng file được chấp nhận: JPG, PNG, PDF, WORD, EXCEL. </span>
                    </div>

                    <app-button 
                      size="md" 
                      color="primary"
                      @click.prevent="handleSend"
                    >Gửi câu hỏi</app-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import { validateEmail } from "~/utils/validations";
import { toNumber, get, cloneDeep, trim } from "lodash";
export default {
  components: {
    SchoolAccountSide
  },

  data(){
    return {
      email: "",
      title: "",
      content: "",
      fileUpload: [],
      errorMessage: {
        email: "",
        title: "",
        content: ""
      },
      validateProps: { email: "", title: ""},
      validate: { email: true, title: true}
    }
  },

  validations: {
    email: { required },
    title: { required },
    content: { required }
  },

  methods: {
    handleEmail(_email) {
      this.validate.email = true;
      this.validateProps.email = "";
      if (!this.$v.email.required) {
        this.validateProps.email = 2;
        this.errorMessage.email = "Trường này là bắt buộc";
      } else if (validateEmail(_email)) {
        this.validateProps.email = 1;
        this.validate.email = false;
        this.errorMessage.email = "";
      } else if (!validateEmail(_email)) {
        this.validateProps.email = 2;
        this.errorMessage.email =
          "Email phải phập đúng định dạng";
      }
    },

    handleTitle(_title) {
      this.validate.title = true;
      this.validateProps.title = "";
      if (!this.$v.title.required) {
        this.validateProps.title = 2;
        this.errorMessage.title = "Trường này là bắt buộc";
      } else if (_title.length > 150) {
        this.validateProps.title = 2;
        this.errorMessage.title =
          "Chủ đề không được lớn hơn 150 ký tự";
      }else{
        this.validateProps.title = 1;
        this.validate.title = false;
        this.errorMessage.title = "";
      }
    },
    handleContent(content){
      console.log('content', content.target.value, content.target.value.length)
      let value = content.target.value;
      if (!this.$v.description.required) {
        this.errorMessage.description = "Trường này là bắt buộc";
      } else if (value.length > 1000) {
        this.errorMessage.description =
          "Chủ đề không được lớn hơn 1000 ký tự";
      }else{
        this.errorMessage.description = "";
      }
    },

    handleSelectFile(files){
      console.log('files', files[0])
      this.fileUpload = (files[0]);
      console.log('this.fileUpload', this.fileUpload)
    },

    handleSend(){
      const body = new FormData();
      body.append('file', this.fileUpload);
      body.append("email", this.email);
      body.append("title", this.title);
      body.append("content", this.content);
      console.log('send body', body);
      
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/pages/id/info/_support.scss";
.form-group .error{
  padding-left: 0px !important;
}
</style>