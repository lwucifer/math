<template>
  <app-modal
    centered
    :width="606"
    :component-class="{ 'account-edit-modal': true }"
    @close="$router.push('/')"
    v-if="visible"
  >
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
  computed: {},
  data() {
    return { email: "" };
  },
  methods: {
    save() {
      console.log(this.sex);
    }
  },

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
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/account/_account-edit-modal.scss";
</style>