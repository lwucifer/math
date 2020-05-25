<template>
  <div>
    <section class="bg-white mb-3">
      <account-cover />
      <tab-menu
        :list="menus"
        active="gallery"
        class="sa__menu"
        @selectedItem="changeTab"
      >
      </tab-menu>
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
      <tab-menu
        :list="menuPhoto"
        active="photo"
        class="sp__menu mb-4"
        @selectedItem="changeTab"
      ></tab-menu>
      <div class="sp__list">
        <div class="grid">
          <div
            class="grid-cell grid-25 sp__img-wrapper"
            v-for="(item, index) in imgs"
            :key="index"
          >
            <span class="square sp__img-item">
              <img :src="item" alt="">
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import AccountCover from '~/components/page/social/account/AccountCover.vue'
  import IconAdd from '~/assets/svg/v2-icons/add_24px.svg?inline'
  export default {
    components: {
      AccountCover,
      IconAdd
    },
    data() {
      return {
        menus: [
          {
            key: 'timeline',
            text: 'Dòng thời gian'
          },
          {
            key: 'intro',
            text: 'Giới thiệu'
          },
          {
            key: 'friends',
            text: 'Bạn bè'
          },
          {
            key: 'gallery',
            text: 'Ảnh'
          },
        ],
        menuPhoto: [
          {
            key: 'photo',
            text: 'Ảnh của bạn'
          },
          {
            key: 'tagged_photo',
            text: 'Ảnh được gắn thẻ'
          },
          {
            key: 'video',
            text: 'Video'
          }
        ],
        imgs: [
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
          'https://picsum.photos/133/133',
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