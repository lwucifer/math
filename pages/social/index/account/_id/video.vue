<template>
  <div>
    <section class="bg-white mb-3">
      <account-cover />
      <account-menu active="gallery" />
    </section>
    <section class="social-photo">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <p>
          <span class="h4">Ảnh</span>
          <span class="text-dark">(500)</span>
        </p>
        <div>
          <app-button size="sm" color="transparent" class="px-0 btn--add-video">
            <IconAdd class="icon--btn icon--btn--pre"/><span class="font-weight-semi-bold">Thêm ảnh / video</span>
          </app-button>
        </div>
      </div>
      <account-photo-menu
        class="mb-4"
        active="video"
      />
      <div class="sp__list">
        <div class="grid">
          <div
            class="grid-cell grid-50 sp__img-wrapper"
            v-for="(item, index) in imgs"
            :key="index"
          >
            <div
              class="rectangle rectangle-100 sp__video-item"
              :style="{
                backgroundImage: `url('${item}')`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
              }"
            >
              <div class="sp__video-overlay">
                <span><IconPlay /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import AccountCover from '~/components/page/social/account/AccountCover.vue'
  import AccountMenu from '~/components/page/social/account/AccountMenu.vue'
  import AccountPhotoMenu from '~/components/page/social/account/AccountPhotoMenu.vue'
  import IconAdd from '~/assets/svg/v2-icons/add_24px.svg?inline'
  import IconPlay from '~/assets/svg/v2-icons/play_circle_filled_24px.svg?inline'
  export default {
    components: {
      AccountCover,
      AccountMenu,
      AccountPhotoMenu,
      IconAdd,
      IconPlay
    },
    data() {
      return {
        imgs: [
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/153/133',
          'https://picsum.photos/169/250',
        ]
      }
    },
    methods: {
      changeTab(item) {
        this.$emit('changeCnt', item)
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/components/social/_social-photo.scss";
</style>