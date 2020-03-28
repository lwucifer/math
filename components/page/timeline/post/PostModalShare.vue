<template>
  <app-modal>
    <div class="pms-header" slot="header">
      <h2 class="pms-header__title">Chia sẻ</h2>
      <app-select v-model="share" :options="shareOpts" size="sm">
         <IconAngleDown slot="placeholder-icon" class="icon" />
      </app-select>
    </div>

    <div slot="content" class="pms-content">content</div>

    <div slot="footer" class="pms-footer">footer</div>
  </app-modal>
</template>

<script>
import { SHARE_OPTS } from "~/utils/constants";

import IconAngleDown from "~/assets/svg/design-icons/angle-down.svg?inline";

export default {
  components: {
    IconAngleDown
  },

  data() {
    return {
      share: SHARE_OPTS.TIMELINE,
      shareOpts: [
        {
          value: SHARE_OPTS.TIMELINE,
          text: "Trên dòng thời gian của bạn"
        },
        {
          value: SHARE_OPTS.FRIEND,
          text: "Chia sẻ trên dòng thời gian của bạn bè"
        },
        {
          value: SHARE_OPTS.MESSAGE,
          text: "Chia sẻ trong tin nhắn riêng"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-modal-share.scss";
</style>
