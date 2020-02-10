<template>
  <app-modal centered :width="606" :component-class="{ 'account-edit-modal': true }" v-if="visible">
    <!-- @close="$router.push('/')" -->
    <div slot="content">
      <h3>Chỉnh sửa thông tin</h3>
      <app-input labelFixed type="text" v-model="email" label="Email" />
      <div class="row">
        <div class="col-6">
          <app-input
            labelFixed
            type="text"
            v-model="phone"
            label="Số điện thoại"
          />
        </div>
        <div class="col-6">
          <label class="min-w-0">Ngày sinh</label>
          <app-date-picker v-model="birthday"/>
        </div>
      </div>
      <div class="form-group">
        <label>Địa chỉ</label>
        <input type="text" v-model="address" class="form-control" />
      </div>
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
import { getSysdateSimpleFormat } from "../../../utils/moment";
export default {
  components: {},
  props: {
    visible: Boolean,
    account: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapState("account", ["personalList"])
  },
  data() {
    return { email: "" };
  },
  methods: {
    ...mapActions("account", ["accountPersonalEdit"]),
    save() {
      console.log(this.sex);
      const data = {
        email: this.email,
        sex: this.sex,
        phone_number: this.phone_number,
        address: this.address,
        birthday: this.birthday
      };
      this.accountPersonalEdit(data).then(result => {
        if (result.success == true) {
          console.log("huydv");
        }
      });
    }
  },

<<<<<<< HEAD
  computed: {
    sex() {
      return this.account.sex;
    },
    email() {
      return this.account.email;
    },
    phone() {
      return this.account.phone;
    },
    address() {
      return this.account.address;
    },
    birthday() {
      return this.account.birthday;
    }
=======
  created() {
    this.sex = this.personalList.sex;
    this.email = this.personalList.email;
    this.phone_number = this.personalList.phone_number;
    this.address = this.personalList.address;
    this.birthday = getSysdateSimpleFormat(this.personalList.bithday);
>>>>>>> 316ac7112bae0cbd5fa25523aa27550d78be4df8
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-edit-modal.scss";
</style>