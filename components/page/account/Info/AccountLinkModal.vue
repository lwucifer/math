<template>
  <app-modal centered :width="350" v-if="visible">
      <div slot="content" class="py-4 px-3 text-center">
          <div v-if="success">
              <div class="mt-2 mb-2 iconTick__LinkModal">
                <IconTick />
              </div>
              <p class="mb-3">Gửi yêu cầu thành công</p>
              <app-button square @click="$emit('click-close')">Đóng</app-button>
          </div>
          <div v-else>
              <h5 class="text-primary">Liên kết trường học</h5>
              <p class="my-3 text-gray">Vui lòng nhập mã liên kết</p>
              <app-input v-model="payload.code" placeholder="Nhập mã"/>
              <p class="text-secondary my-2 font-weight-light">Nếu bạn chưa có mã liên kết, vui lòng liên hệ với nhà trường</p>
              <div>
                  <app-button square color="secondary" @click="$emit('click-close')">Hủy</app-button>
                  <app-button square class="ml-3" @click.prevent="submitLink">Xác nhận</app-button>
              </div>
          </div>
      </div>
  </app-modal>
</template>

<script>
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import IconTick from "~/assets/svg/design-icons/check-circle.svg?inline";
export default {
    components:{
        IconTick
    },
    data(){
        return({
            payload:{
                code:"",
                g_recaptcha_response:""
            },
            success:false
        })
    },
    props:{
        visible: Boolean,
    },
    methods:{
        async submitLink(){
            this.payload.g_recaptcha_response = await this.$recaptcha.execute();
            const payload = this.payload
            const res = await this.$store.dispatch(
                `account/${actionTypes.ACCOUNT_LINK.ADD}`,
                payload
            );
            if(get(res, "success", false)){
                this.$toasted.success("success")
                this.$emit('click-close')
                this.$emit('handleRefresh')
                this.success = true
                return;
            }
            this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
            this.$emit('handleRefresh')
        }
    }
}
</script>

<style lang="scss">
.iconTick__LinkModal svg {
    width: 34px;
    height: 34px;
    path{fill: #32AF85;}
}
</style>