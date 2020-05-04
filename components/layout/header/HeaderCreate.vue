<template>
  <div class="header-create">
    <div class="header-create__content container">
      <app-button class="header-create__btn header-create__btn-back" outline square @click="back">
        <IconArrowLeft class="icon mr-2" />
        Quay lại
      </app-button>

      <div class="header-create__right">
        <app-button class="header-create__btn mr-4" square @click="fnSave" :disabled="!ok">Lưu</app-button>
        <app-button class="header-create__btn" color="secondary" square @click="fnDelete" v-if="edit">Xoá</app-button>
        <app-button class="header-create__btn" color="secondary" square @click="fnCancel" v-else>Hủy</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowLeft from '~/assets/svg/design-icons/arrow-left.svg?inline';

export default {
  components: {
    IconArrowLeft
  },
  
  props: {
    edit: Boolean,
    ok: Boolean,
  },

  methods: {
    fnSave() {
      this.$emit('clickSave');
    },
    fnDelete() {
      this.$emit('clickDelete');
    },
    fnCancel() {
      this.$emit('clickCancel');
    },
    back() {
      this.$router.back();
    },
  },
}
</script>

<style lang="scss" scoped>
.header-create {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: map-get($z-index, 'header');
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
}

.header-create__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.btn.header-create__btn {
    font-weight: 600;
    font-size: 1.4rem;

    svg {
        font-size: 1.6rem;
    }
}

.btn.header-create__btn-back {
    svg {
        fill: $color-primary;
    }
}
</style>