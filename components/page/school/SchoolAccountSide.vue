<template>
  <div class="school-side">
    <div class="school-side__avatar">
      <app-avatar :src="avatarSrc" :size="125" />
      <app-upload class="cgi-upload-avt change-avatar" @change="handleUploadAvatar">
          <template>
            <div class="cgi-upload-avt-preview">
              <IconPhoto width="13" height="13" />
            </div>
          </template>
        </app-upload>
    </div>
    <p class="school-side__name mt-2">{{personalList.fullname}}</p>
    <div class="school-side__links">
      <n-link class="link-gray" to='/account/info/' :class="active == 1 ? 'active' : ''">
        <IconUser3 width="20" height="20"/>Thông tin tài khoản
      </n-link>
      <n-link class="link-gray" to='/account/info/withdrawals' :class="active == 2 ? 'active' : ''">
        <IconHistory />Lịch sửa rút tiền
      </n-link>
      <n-link class="link-gray" to='/account/info/revenues' :class="active == 3 ? 'active' : ''">
        <IconHistory />Thống kê doanh thu
      </n-link>
      <n-link class="link-gray" to='/account/info/transactions' :class="active == 4 ? 'active' : ''">
        <IconHistory />Lịch sử giao dịch
      </n-link>
      <n-link class="link-gray" to :class="active == 5 ? 'active' : ''">
        <IconBell />Thông báo
      </n-link>
      <n-link class="link-gray" to :class="active == 6 ? 'active' : ''">
        <IconBell />Cài đặt
      </n-link>
      <n-link class="link-gray" to :class="active == 7 ? 'active' : ''">
        <IconExclamation />Trợ giúp
      </n-link>
    </div>
  </div>
</template>

<script>
import IconExclamation from "~/assets/svg/icons/exclamation.svg?inline";
import IconUser3 from "~/assets/svg/icons/user3.svg?inline";
import IconHistory from "~/assets/svg/icons/history.svg?inline";
import IconBell from "~/assets/svg/icons/bell.svg?inline";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconFilter from "~/assets/svg/icons/filter.svg?inline";
import IconSearch from "~/assets/svg/icons/search2.svg?inline";
import IconDollarAlt from '~/assets/svg/design-icons/dollar-alt.svg?inline';
import { mapState, mapActions } from "vuex";
import { getBase64 } from "~/utils/common";

export default {
  components: {
    IconHistory,
    IconBell,
    IconUser3,
    IconExclamation,
    IconPhoto,
    IconSearch,
    IconFilter,
    IconDollarAlt
  },
  data(){
    return{
      avatar: [],
      avatarSrc: "https://picsum.photos/170/170",
    }
  },
  props: {
    school: {
      type: Object,
      required: true,
      default: () => {}
    },
    active: {
      type: [String, Number]
    }
  },
  computed:{
    ...mapState("account", ["personalList"]),
  },
  methods:{
    ...mapActions("account", [
      "accountPersonalEditAvatar",
      "accountPersonalList"
    ]),
    async handleUploadAvatar(fileList, event){
      this.avatar = Array.from(fileList)
      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      })
      const body = new FormData();
      body.append("avatar_images", fileList[0]);
      console.log("[avatar_images]", fileList[0]);
      this.accountPersonalEditAvatar(body).then(result=>{

      })
    }
  },
  created(){
    this.avatarSrc = this.personalList.avatar
      ? this.personalList.avatar.low
      : "https://picsum.photos/170/170";
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-account.scss";
</style>