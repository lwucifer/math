<template>
  <div class="wrap-friend-item-social">
      <app-avatar
        v-lazy="'https://picsum.photos/55/55'"
        size="55"
        class="mr-3"
      />
      <div class="d-flex flex-column">
          <h6>Nguyễn Hoàng Liên Sơn</h6>
          <span class="mb-3" v-if="!birthday">61 Bạn chung</span>
          <div class="mb-2 text-primary" v-if="birthday && friend">
                <IconCake24px class="icon mr-2"/>
                <span>Hôm nay</span>
            </div>
          <div v-if="friend">
              <v-popover>
                  <app-button size="sm" color="white" class="btn-friend-item">Bạn bè</app-button>
                  <template slot="popover">
                      <div class="account-friend-menu-dropdown">
                          <button class="item">
                              <IconSubscriptions24px class="mr-3"/>
                              <span>Bỏ theo dõi</span>
                          </button>
                          <button class="item mt-4">
                              <IconCancelRequest class="mr-3"/>
                              <span>Hủy kết bạn</span>
                          </button>
                      </div>
                  </template>
              </v-popover>
              
          </div>
          <div v-else>
              <app-button size="sm" class="mr-2">
                  <IconDone24px class="mr-2 icon"/>
                  Đồng ý
              </app-button>
              <app-button size="sm" color="white">
                  <IconClose24px class="mr-2 icon"/>
                  Hủy
              </app-button>
          </div>
      </div>
  </div>
</template>

<script>
import IconSubscriptions24px from '~/assets/svg/v2-icons/subscriptions_24px.svg?inline';
import IconCancelRequest from '~/assets/svg/v2-icons/cancel-request.svg?inline';
import IconDone24px from '~/assets/svg/v2-icons/done_24px.svg?inline';
import IconClose24px from '~/assets/svg/v2-icons/close_24px.svg?inline';
import IconCake24px from '~/assets/svg/v2-icons/cake_24px.svg?inline';
export default {
    components:{
        IconSubscriptions24px,
        IconCancelRequest,
        IconDone24px,
        IconClose24px,
        IconCake24px
    },
    props:{
        friend:{
            type: Boolean,
            default: false
        },
        birthday:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            birthday:true
        }
    }
}
</script>

<style lang="scss">

</style>