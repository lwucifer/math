<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <SchoolAccountSide :active="5"/>
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
                      placeholder=""/>
                  </div>
                </div>

                <div class="form-group d-flex d-flex align-items-center">
                  <div class="form-name">Chủ đề <span>*</span></div>

                  <div class="form-input">
                    <app-input
                      class="mb-0"
                      size="md" 
                      placeholder=""/>
                  </div>
                </div>

                <div class="form-group d-flex align-items-start">
                  <div class="form-name mt-3">Mô tả chi tiết <span>*</span></div>

                  <div class="form-input">
                    <textarea name="" id="" rows="10" placeholder="Nhập mô tả chi tiết"></textarea>
                  </div>
                </div>

                <div class="form-group d-flex mb-0">
                  <div class="form-name"></div>
                  <div class="form-input">
                    <div class="upload d-flex align-items-center">
                      <app-upload
                        :showIcon="false"
                        title="+ Attach file"
                        :inputText="false"/> 
                      
                      <span class="font-italic">Các định dạng file được chấp nhận: JPG, PNG, PDF, WORD, EXCEL. </span>
                    </div>

                    <app-button 
                      size="md" 
                      color="primary">Gửi câu hỏi</app-button>
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
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide"
export default {
  components: {
    SchoolAccountSide
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/pages/id/info/_support.scss";
</style>