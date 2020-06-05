<template>
  <div class="wrap-notification-item">
      <app-avatar
        :size=50
        class="avatar-notifi"
      />
      <div class="wrap-content-item">
          <p class="content-item" >
              <strong>Ngọc Trinh</strong>
              đã bày tỏ cảm xúc đến bài viết mà bạn được gắn thẻ: “Du lịch Dubai với Trinh” 
          </p>
          <span>15 phút trước</span>
      </div>
      <div class="group-button-item">
          <v-popover
            popoverClass="tooltip-notification"
          >
            <button style="margin-left:1.7rem">
                <IconMoreHoriz24px />
            </button>
              <template slot="popover">
                  <ul class="menu-dropdown-content">
                    <li>
                        <a>
                            <IconCheck24px/>Đánh dấu là đã đọc
                        </a>
                    </li>
                    <li>
                        <a>
                            <IconDeleteSweep24px/>Xóa thông báo này
                        </a>
                    </li>
                </ul>
              </template>
          </v-popover>
          
          <button @click.prevent="marked = !marked">
              <IconEllipse2 class="fill-gray" v-if="marked"/>
              <IconEllipse2 v-else/>
          </button>
      </div>
  </div>
</template>

<script>
import IconMoreHoriz24px from '~/assets/svg/v2-icons/more_horiz_24px.svg?inline';
import IconEllipse2 from '~/assets/svg/icons/ellipse2.svg?inline';
import IconCheck24px from '~/assets/svg/v2-icons/check_24px.svg?inline';
import IconDeleteSweep24px from '~/assets/svg/v2-icons/delete_sweep_24px.svg?inline';
export default {
    components:{
        IconMoreHoriz24px,
        IconEllipse2,
        IconCheck24px,
        IconDeleteSweep24px
    },
    data(){
        return{
            marked:true
        }
    }
}
</script>

<style lang="scss">
.wrap-notification-item{
    display: flex;
    flex-direction: row;
    padding: 12px 8px ;
    margin: 10px;
    &:hover{
        background: #F2F2F2;
    }
    .avatar-notifi{
        margin-right: 1.2rem;
    }
    .wrap-content-item{
        flex: 7;
        .content-item{
            @include set-line((
                'lineClamp': 2,
                'lineHeight': (20/15),
                'fixedHeight': true
            ));
        }
    }
    .group-button-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .menu-dropdown-content{
        /*
            position: absolute;
            background: #FFFFFF;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            bottom: -3rem;
            right: 1rem;
            width: 207px;
            list-style: none;
            border:1px solid red;
            z-index: 20;
        */
            li{
                a{
                    display: flex;
                    align-items: center;
                    padding:1rem 1.5rem;
                    color: #656565;
                    svg{
                        margin-right: 1.5rem;
                    }
                }
            }
    }
}
.tooltip-notification{
    z-index: 130;
    left: -8rem !important;
    text-align: center;
    .menu-dropdown-content{
            background: #FFFFFF;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            width: 207px;
            list-style: none;
            li{
                a{
                    display: flex;
                    align-items: center;
                    padding:1rem 1.5rem;
                    color: #656565;
                    svg{
                        margin-right: 1.5rem;
                    }
                    &:hover{
                        color: $color-primary;
                        svg path{ fill: $color-primary;}
                    }
                }
            }
    }
}
</style>