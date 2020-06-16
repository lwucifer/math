<template>
  <sub-block-section title="Thông tin cá nhân">
    <template v-slot:content>
      <div class="form--normal">
        <div class="row">
          <div class="col-md-3">
            <label for class="form--normal__title">Ảnh đại diện</label>
          </div>
          <div class="col-md-9">
            <div class="app-input app-input--size-md">
              <upload-avatar :av-src="filterAvatarSrc"></upload-avatar>
            </div>
            <app-button
              nuxt
              style="position: absolute; right: 0.5rem; bottom: 2rem;"
              size="sm"
              :to="token ? '/' + token.id + '/info/change_pwd' : '/'"
            >
              <span class>Thay đổi mật khẩu</span>
            </app-button>
          </div>
          <div class="col-md-3">
            <label for class="form--normal__title">Họ và tên</label>
          </div>
          <div class="col-md-9">
            <app-input v-model="name" disabled />
          </div>
          <div class="col-md-3">
            <label for class="form--normal__title">Số điện thoại</label>
          </div>
          <div class="col-md-9">
            <app-input v-model="phone" disabled />
          </div>
          <div class="col-md-3">
            <label for class="form--normal__title">Email</label>
          </div>
          <div class="col-md-9">
            <app-input v-model="email" disabled />
          </div>
          <div class="col-md-3">
            <label for class="form--normal__title">Giới tính</label>
          </div>
          <div class="col-md-2">
            <app-input v-model="sex" class="sex_Profile" disabled />
          </div>
          <div class="col-md-2">
            <label for class="form--normal__title">Ngày sinh</label>
          </div>
          <div class="col-md-2">
            <app-input v-model="birthday" class="birthday_Profile" disabled />
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-9">
            <app-button
              square
              class="btnAccountLink_account-info"
              v-if="!filterLinkList"
              v-on:click="visible.addLink=true"
            >
              <slot name="icon">
                <IconPlusProtect class="icon icon--btn icon--btn--pre" />
              </slot>
              <span>Liên kết trường học</span>
            </app-button>
          </div>
          <div class="col-md-3" v-if="isTeacherRole">
            <label for class="form--normal__title">Tiểu sử</label>
          </div>
          <div class="col-md-9" v-if="isTeacherRole">
            <div v-if="story == null || story == ''">
              <app-button
                color="transparent"
                flat
                square
                style="box-shadow: none;"
                class="p-0"
                @click="addStory"
              >
                <slot name="icon">
                  <IconPlus
                    class="icon--btn icon--btn--pre fill-opacity-1"
                    style="height: 1.6rem; width: 1.6rem;"
                  />
                </slot>
                <span class="text-primary">Thêm tiểu sử</span>
              </app-button>
            </div>
            <div v-else>
              <div>
                <div class="box-content-fixed-height mb-4" v-if="!editingStory">
                  <div
                    class="overflow-y-scroll"
                    v-html="story"
                    style="max-height: 16rem; overflow-y: auto; margin-right: -5px;"
                  ></div>
                </div>
                <div class="d-flex" v-if="!editingStory">
                  <button class="btn-transparent btn--success mr-4" @click="editStory">
                    <IconEdit class />
                    <span>Chỉnh sửa</span>
                  </button>
                  <button class="btn-transparent btn--danger" @click="handleDeleteStory">
                    <IconTrashAlt class />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            </div>
            <account-story-form
              v-if="editingStory"
              :story="story"
              :edit="checkEdit"
              @cancel="cancel"
              @submit="submitStory"
            ></account-story-form>
          </div>
        </div>
      </div>
      <!--<div class="d-flex mt-4">-->
      <!--<app-button class="ml-auto" square>Lưu thay đổi</app-button>-->
      <!--</div>-->

      <AccountChangePasswordModal :visible="showChangePass" @click-close="showChangePass = false" />
      <account-link-modal
        :visible="visible.addLink"
        @cancel="closeLinkModal"
        @handleRefresh="handleRefresh"
        @ok="submitAddLink"
        @close="closeLinkModal"
      />
      <app-modal-notify
        v-if="visible.notify"
        :title="modalMes.notify"
        :type="modalStatus"
        @close="() => { visible.notify = false }"
        @ok="() => { visible.notify = false }"
      />
    </template>
  </sub-block-section>
</template>

<script>
import SchoolAccountSide from "~/components/page/school/SchoolAccountSide";
import AccountInfoStudent from "~/components/page/account/Info/AccountInfoStudent";
import UploadAvatar from "~/components/page/account/Info/UploadAvatar";
import AccountChangePasswordModal from "~/components/page/account/AccountChangePasswordModal";
import AccountLinkModal from "~/components/page/account/Info/AccountLinkModal";
import AccountStoryForm from "~/components/page/account/forms/AddAccountStory";
import * as actionTypes from "~/utils/action-types";
import { mapState, mapActions, mapGetters } from "vuex";
import IconPhoto from "~/assets/svg/icons/photo.svg?inline";
import IconPlusProtect from "~/assets/svg/v2-icons/alert/add_24px.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import IconEdit from "~/assets/svg/v2-icons/border_color_24px.svg?inline";
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import { get } from "lodash";
import { getDateBirthDay, getDateFormat } from "~/utils/moment";
import { getDeviceId } from "~/utils/auth";
import { RESPONSE_SUCCESS, TIMEOUT } from "~/utils/config";
import { removeTagHtml } from "~/utils/common";

export default {
  components: {
    IconPhoto,
    IconPlus,
    IconPlusProtect,
    IconEdit,
    IconTrashAlt,
    SchoolAccountSide,
    AccountInfoStudent,
    AccountChangePasswordModal,
    AccountLinkModal,
    UploadAvatar,
    AccountStoryForm
  },
  data() {
    return {
      isAuthenticated: true,
      name: "",
      phone: "",
      email: "",
      sex: "",
      birthday: "",
      showChangePass: false,
      accountLink: {
        list: ""
      },
      editingStory: false,
      avatar: [],
      avatarSrc: "",
      story: null,
      profileInfo: "",
      visible: {
        notify: false,
        addLink: false
      },
      modalMes: {
        notify: ""
      },
      modalStatus: "success",
      payload: {
        code: "",
        g_recaptcha_response: ""
      },
      success: false,
      checkEdit: false
    };
  },
  watch: {
    profileList: {
      handler: function() {
        this.name = get(this, "profileList.fullname", "");
        this.phone = get(this, "profileList.phone", "");
        this.email = get(this, "profileList.email", "");
        this.address = get(this, "profileList.address", "");
        this.sex = get(this, "profileList.sex", "")
          ? get(this, "profileList.sex", "") === "MALE"
            ? "Nam"
            : "Nữ"
          : "";
        this.birthday = getDateBirthDay(get(this, "profileList.birthday", ""));
        this.accountLink.list = get(this, "linkList.data", {});
        this.profileInfo = get(this, "profileList", {});
        this.story = get(this, "profileList.intro", null);
      }
    }
  },
  methods: {
    ...mapActions("account", [
      "accountPersonalEditAvatar",
      "accountPersonalList",
      "accountBiographyAdd"
    ]),
    ...mapActions("auth", ["logout"]),

    async fetchProfile() {
      await Promise.all([
        this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`)
        // this.$store.dispatch(`account/${actionTypes.ACCOUNT_LINK.LIST}`)
      ]);
    },
    closeNotify() {
      this.notify.showNotify = false;
    },
    closeLinkModal() {
      this.visible.addLink = false;
    },
    async handleRefresh() {
      this.fetchProfile();
    },
    async submitAddLink(code) {
      this.payload.g_recaptcha_response = await this.$recaptcha.execute();
      this.payload.code = code;
      const payload = this.payload;
      const res = await this.$store.dispatch(
        `account/${actionTypes.ACCOUNT_LINK.ADD}`,
        payload
      );
      if (get(res, "success", false)) {
        this.modalStatus = "success";
        this.modalMes.notify = "Liên kết thành công! Vui lòng đăng nhập lại";
        this.$nextTick(() => {
          this.resetCode();
          this.visible.addLink = false;
          this.visible.notify = true;
        });

        setTimeout(() => {
          // logout here
          const device_id = getDeviceId();
          this.logout({ device_id }).then(result => {
            console.log("[handleLogout] result", result, device_id);
            if (result.success == RESPONSE_SUCCESS) {
              this.$router.push("/auth/signin");
            }
          });
        }, TIMEOUT.NOTIFY);
      } else {
        this.modalStatus = "error";
        this.modalMes.notify = "Liên kết không thành công!";
        this.$nextTick(() => {
          this.resetCode();
          this.visible.addLink = false;
          this.visible.notify = true;
        });
      }
      this.handleRefresh();
    },
    resetCode() {
      this.payload.code = "";
      this.payload.g_recaptcha_response = "";
    },
    addStory() {
      this.editingStory = true;
    },
    editStory() {
      this.editingStory = true;
    },
    submitStory(_data) {
      const data = {
        biography: _data
      };
      this.accountBiographyAdd(data).then(result => {
        if (result.success) {
          this.editingStory = false;
          this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`);
        }
      });
    },
    cancel() {
      this.editingStory = false;
    },
    handleDeleteStory() {
      const data = {
        biography: ""
      };
      this.accountBiographyAdd(data).then(result => {
        if (result.success) {
          this.editingStory = false;
          this.$store.dispatch(`account/${actionTypes.ACCOUNT_PROFILE.LIST}`);
        }
      });
    }
  },
  computed: {
    ...mapState("account", ["personalList"]),
    ...mapState("account", {
      profileList: "profileList"
    }),
    ...mapState("account", {
      linkList: "linkList"
    }),

    ...mapState("auth", ["token"]),
    ...mapGetters("auth", ["isTeacherRole", "isStudentRole"]),
    filterAvatarSrc() {
      return this.personalList && this.personalList.avatar
        ? this.personalList.avatar.low
        : "https://picsum.photos/170/170";
    },
    filterLinkList() {
      return this.linkList.data && this.linkList.data.linked == true
        ? true
        : false;
    }
  },
  created() {
    this.fetchProfile();
    // this.avatarSrc =
    //   this.personalList && this.personalList.avatar
    //     ? this.personalList.avatar.low
    //     : "https://picsum.photos/170/170";
  }
};
</script>

<style lang="scss">
</style>
