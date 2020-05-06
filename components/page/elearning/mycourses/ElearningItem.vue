<template>
  <div class="wrap__elearning-item">
      <img  src="https://picsum.photos/266/156" class="img__elearning-item"/>
      <div class="px-3 py-3">
          <p class="name_elearning-item">Nên tảng tiếng Anh cho Người mới bắt đầu Người mới bắt đầu </p>
          <div class="d-flex align-items-center my-4">
            <app-avatar
                src="https://picsum.photos/20/20"
                :size="20"
            />
            <span class="ml-2">Lily Edwards</span>
        </div>
        <div class="proccess-bar-study-border">
                <div class="percent-proccess" v-bind:style="{width: 15 +'%'}"></div>
        </div>
        <div class="d-flex">
            <span>Đã hoàn thành <strong class="text-primary">15%</strong></span>
            <div class="ml-auto">
                <app-dropdown
                    class="post__menu-dropdown"
                    position="right"
                    open-on-click
                    v-model="menuDropdown"
                    :content-width="'15rem'"
                >
                    <button slot="activator" slot-scope="{ on }" v-on="on">
                        <IconDots class="icon fill-gray" />
                    </button>

                    <ul class="link--dropdown__ElearningItem">
                        <li>
                            <n-link to class="text-gray">
                                <IconShare24px class='icon' />
                                Chia sẻ
                            </n-link>
                        </li>
                        <li>
                            <n-link to>
                                <IconHeartAlt class='icon' />
                                Bỏ yêu thích
                            </n-link>
                        </li>
                        <li>
                            <n-link to>
                                <IconArchiveAlt class='icon' />
                                Bỏ lưu trữ
                            </n-link>
                        </li>
                    </ul>
                </app-dropdown>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconHeartAlt from '~/assets/svg/design-icons/heart-alt.svg?inline';
import IconShare24px from '~/assets/svg/v2-icons/share_24px.svg?inline';
import IconArchiveAlt from '~/assets/svg/design-icons/archive-alt.svg?inline';
export default {
    components:{
        IconDots,
        IconHeartAlt,
        IconShare24px,
        IconArchiveAlt
    },
    data(){
        return{
            menuDropdown:false
        }
    }
}
</script>

<style lang="scss">
.wrap__elearning-item{
    width: 100%;
    margin-bottom: 22px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    text-
    .img__elearning-item{
        width: 100%;
        height: 158.6px;
    }
    .proccess-bar-study-border{
            height: 5px;
            width: 100%;
            background: #EEEEEE;
            margin: 13px 0;
            .percent-proccess{
                background: #37A000;
                height: 5px;
        }
    }
    .name_elearning-item{
        height: 43px;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 20px;
        color: #222222;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .link--dropdown__ElearningItem{
        list-style: none;
        padding:18px;
        li{
            margin:14px 0px;
            a{
                text-decoration: none;
            }
        }
    }
}
</style>