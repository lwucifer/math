<template>
  <div class="container">
      <div class="row">
          <div class="col-md-3">
            <SchoolAccountSide :active="5" />
          </div>
          <div class="col-md-9 cc-panel">
              <block-section title="Elearning">
                <template v-slot:content>
                    <div class="wrap-notify-account-info">
                        <div class="header-content">
                            <h4 >Danh sách thông báo</h4>
                            <div class="ml-auto d-flex">
                                <n-link 
                                    class="d-flex align-items-center text-primary text-decoration-none"
                                    to
                                >
                                    <IconCheck24px class="fill-primary mr-3"/>
                                    Đánh dấu tất cả là đã đọc
                                </n-link >
                                <n-link  
                                    class="d-flex align-items-center ml-4 text-decoration-none text-gray"
                                    to
                                >
                                    <IconSettings24px class="mr-3"/>
                                    Cài đặt thông báo
                                </n-link >
                            </div>
                        </div>
                        <div class="content-notification">
                            <notification-item
                                :isReaded="isReaded"
                                @read="handleReadNotifi"
                                v-for="(item, index) in 9"
                                :key="index"
                            />
                            <app-pagination
                                :pagination="pagination"
                                @pagechange="onPageChange"
                                class="mt-5"
                            />
                        </div>
                    </div>
                </template>  
              </block-section>
          </div>
      </div>
  </div>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import IconCheck24px from '~/assets/svg/v2-icons/check_24px.svg?inline';
import IconSettings24px from '~/assets/svg/v2-icons/settings_24px.svg?inline';
export default {
    layout: 'account-info',
    
    components:{
        SchoolAccountSide,
        IconCheck24px,
        IconSettings24px
    },
    data() {
        return {
            isReaded:true,
            pagination:{
                total_pages: 2,
                size: 10,
                total_elements: 20,
                first: 1,
                last: 0,
                number: 1
            }
        }
    },
    computed:{
    
    },
    methods:{
        handleReadNotifi(val){
            this.isReaded = val;
        },
        onPageChange(e) {
            this.$emit("pagechange", e);
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
.wrap-notify-account-info{
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    .header-content{
        display: flex;
        padding: 2rem;
        border:1px solid #E0E0E0;
    }
    .content-notification{
        padding: 15px 5px;
    }
}
</style>