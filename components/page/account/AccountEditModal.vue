<template>
  <app-modal centered :width="606" :component-class="{ 'account-edit-modal': true }" v-if="visible">
    <!-- @close="$router.push('/')" -->
    <div slot="content">
      <h3>Chỉnh sửa thông tin</h3>
      <app-input disabled labelBold labelFixed type="text" :value="email" label="Email" />
      <div class="row">
        <div class="col-6">
          <app-input
            disabled
            labelBold
            labelFixed
            type="text"
            :value="phone_number"
            label="Số điện thoại"
          />
        </div>
        <div class="col-6">
          <app-input labelBold type="date" v-model="birthday" label="Ngày sinh" />
          {{birthday}}
        </div>
      </div>
      <app-input labelBold labelFixed type="text" v-model="address" label="Địa chỉ" />
      <div class="form-group">
        <label>Giới tính</label>
        <app-select-sex v-model="sex" :sex="sex" class="form-control max-w-170" />
      </div>

      <div class="text-center">
        <app-button size="lg" color="info" class="mr-3" square @click="$emit('click-close')">Hủy bỏ</app-button>
        <app-button size="lg" square @click="save()">Cập nhật thông tin</app-button>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getDateBirthDay, getDateUpdateProfile } from "../../../utils/moment";
export default {
  components: {},
  props: {
    visible: Boolean
  },
  data() {
    return {
      sex: "",
      email: "",
      phone_number: "",
      address: "",
      birthday: ""
    };
  },
  methods: {
    ...mapActions("account", ["accountPersonalEdit", "accountPersonalList"]),
    save() {
      console.log(this.sex);
      const data = {
        sex: this.sex,
        address: this.address,
        birthday: getDateUpdateProfile(this.birthday)
      };
      this.accountPersonalEdit(data).then(result => {
        console.log("huydv", result);
        if (result.success == true) {
          const userId = this.personalList.id;
          this.accountPersonalList(userId);
        }
      });
    }
  },

  computed: {
    ...mapState("account", ["personalList"])
    // sex() {
    //   return this.personalList ? this.personalList.sex : "";
    // },
    // email() {
    //   return this.personalList ? this.personalList.email : "";
    // },
    // phone() {
    //   return this.personalList ? this.personalList.phone : "";
    // },
    // address() {
    //   return this.personalList ? this.personalList.address : "";
    // },
    // birthday() {
    //   return this.personalList ? this.personalList.birthday : "";
    // }
  },

  created() {
    this.sex = this.personalList.sex;
    this.email = this.personalList.email || "";
    this.phone_number = this.personalList.phone_number || "";
    this.address = this.personalList.address || "";
    this.birthday = this.personalList.birthday;
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-edit-modal.scss";
</style>