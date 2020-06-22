<template>
  <div class="wrap-notification-item" :class="dataNoti.is_read ? 'readed' : ''">
    <app-avatar :size="50" class="avatar-notifi" />
    <div class="wrap-content-item">
      <p class="content-item">
        {{ dataNoti.payload.text || "" }}
      </p>
      <span>{{ dataNoti.created_at | moment("from") }}</span>
    </div>
    <div class="group-button-item">
      <div
        class="d-flex justify-content-center"
        v-click-outside="handleClickOutMenu"
      >
        <button @click="menuBtn = !menuBtn">
          <IconMoreHoriz24px />
        </button>
        <ul class="menu-dropdown-content" v-if="menuBtn">
          <li @click="handleClickCheck" v-if="!dataNoti.is_read">
            <a> <IconCheck24px />Đánh dấu là đã đọc </a>
          </li>
          <li @click="handleClickCheck" v-else>
            <a> <IconCheck24px />Đánh dấu là chưa đọc </a>
          </li>
          <li>
            <a @click="handleDelete">
              <IconDeleteSweep24px />Xóa thông báo này
            </a>
          </li>
        </ul>
      </div>

      <button v-if="!dataNoti.is_read">
        <IconEllipse2 />
      </button>
    </div>
  </div>
</template>

<script>
import IconMoreHoriz24px from "~/assets/svg/v2-icons/more_horiz_24px.svg?inline";
import IconEllipse2 from "~/assets/svg/icons/ellipse2.svg?inline";
import IconCheck24px from "~/assets/svg/v2-icons/check_24px.svg?inline";
import IconDeleteSweep24px from "~/assets/svg/v2-icons/delete_sweep_24px.svg?inline";
import { mapState, mapActions, mapMutations } from "vuex";
import { FETCH_SIZE, SOCIAL, ELEARNING } from "~/utils/config"
export default {
  components: {
    IconMoreHoriz24px,
    IconEllipse2,
    IconCheck24px,
    IconDeleteSweep24px,
  },
  props: {
    dataNoti: {
      type: Object,
      default: {},
    },
    typeTab: {
      type: String,
      default: "elearning",
    },
    // isReaded:{
    //     type: Boolean,
    //     default: false
    // }
  },

  data() {
    return {
      menuBtn: false,
    };
  },

  computed: {
    ...mapState("elearning/study/notifications", [
      "countNotiElearning",
      "countNotiSocial",
    ]),
  },

  created() {
    console.log("dataNoti", this.dataNoti);
  },
  methods: {
    ...mapActions("elearning/study/notifications", [
      "getNotifications",
      "getCountNotifications",
      "checkIsReadNotifications",
      "deleteNotifications",
    ]),
    ...mapMutations("elearning/study/notifications", [
      "setCountNotiElearning",
      "setCountNotiSocial",
    ]),

    updateCountElearning() {
      this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: ELEARNING,
      });
      this.getCountNotifications({
        service_type: ELEARNING,
      });
      // if(this.dataNoti.is_read){
      //     const countElearning = parseInt(this.countNotiElearning) + 1
      //     this.setCountNotiElearning(countElearning)
      // }else{
      //     const countElearning = parseInt(this.countNotiElearning) -1
      //     this.setCountNotiElearning(countElearning)
      // }
    },
    updateCountSocial() {
      this.getNotifications({
        fetch_size: FETCH_SIZE,
        service_type: SOCIAL,
      });
      this.getCountNotifications({
        service_type: SOCIAL,
      });
      // if(this.dataNoti.is_read){
      //     const countSocial = parseInt(this.countNotiSocial) + 1
      //     this.setCountNotiSocial(countSocial)
      // }else{
      //     const countSocial = parseInt(this.countNotiSocial) -1
      //     this.setCountNotiSocial(countSocial)
      // }
    },
    handleDelete() {
      this.deleteNotifications({
        notification_id: this.dataNoti.id,
        service_type: this.typeTab == "elearning" ? ELEARNING : SOCIAL,
      });
    },
    handleClickCheck() {
      this.menuBtn = !this.menuBtn;
      // this.$emit('read',!this.isReaded);
      this.checkIsReadNotifications({
        notification_id: this.dataNoti.id,
        type: "ONLY_ONE",
        service_type: this.typeTab == "elearning" ? ELEARNING : SOCIAL,
      }).then((res) => {
        if (res.data.success) {
          console.log("res", res);
          if (this.typeTab == "elearning") {
            this.updateCountElearning();
          } else {
            this.updateCountSocial();
          }
        }
      });
    },
    handleClickOutMenu() {
      this.menuBtn = false;
    },
  },
};
</script>

<style lang="scss"></style>
