<template>
  <div class="aside-box">
    <div class="aside-box__top">
      <div class="tool-top mb-15">
        <app-dropdown
            position="left"
            v-model="dropdownEdit"
            :content-width="'10rem'"
            class="link--dropdown"
          >
            <button slot="activator" type="button" class="link--dropdown__button">
              <IconDots />
            </button>
            <div class="link--dropdown__content">
              <ul>
                <li class="link--dropdown__content__item">
                  <a @click="visibleAddByPhone = true"> 
                    <IconUsersAlt class="mr-2"/>
                    Thêm bạn
                  </a>
                </li>
                <li class="link--dropdown__content__item">
                  <a @click="visibleAddGroup = true">
                    <IconUserPlus class="mr-2"/>
                    Tạo nhóm
                  </a>
                </li>
              </ul>
            </div>
          </app-dropdown>
        <button @click="create()"><IconEdit/></button>
      </div>
      <div class="search-nav">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">
              <IconSearch width="15" height="15" />
            </div>
            <input type="text" placeholder="03826589" />
            <div class="input-group-addon">
              <a href="#">
                <IconCloseOutline class="fill-999" width="15" height="15" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside-box__content">
      <div class="tabs">
        <ul class="nav-tabs list-unstyle" v-if="!isContact">
          <li>
            <a @click="tab = 1" :class="tab == 1 ? 'active' : ''">Chat</a>
          </li>
          <li>
            <a @click="tab = 2" :class="tab == 2 ? 'active' : ''">Group</a>
          </li>
        </ul>
        <div class="tabs-content" v-if="isContact">
          <div class="align-item" v-for="(item, index) in friends" :key="index">
            <div class="align-item__image">
              <app-avatar :src="item.avatar" size="md" class="comment-item__avatar" />
            </div>
            <div class="align-item__meta">
              <h4 class="align-item__title">
                <n-link slot="title" to>{{ item.name }}</n-link>
              </h4>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="tabs-content" v-if="tab == 1">
            <div class="align-item" v-for="(item, index) in contacts" :key="index">
              <div class="align-item__image">
                <app-avatar :src="item.image" size="md" class="comment-item__avatar" />
              </div>
              <div class="align-item__meta">
                <h4 class="align-item__title">
                  <n-link slot="title" to>{{ item.title }}</n-link>
                </h4>
                <div class="align-item__desc">
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="tabs-content" v-if="tab == 2">
            <div class="align-item" v-for="(item, index) in contacts" :key="index">
              <div class="align-item__image">
                <app-avatar :src="item.image" size="md" class="comment-item__avatar" />
              </div>
              <div class="align-item__meta">
                <h4 class="align-item__title">
                  <n-link slot="title" to>{{ item.title }}</n-link>
                </h4>
                <div class="align-item__desc">
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside-box__bottom">
      <ul class="group-button list-unstyle">
        <li>
          <a @click="isContact = true" :class="isContact ? 'active' : ''">
            <IconUsers width="22" height="23" :class="isContact ? 'fill-primary' : 'fill-999'" />
            <p>Contact</p>
          </a>
        </li>
        <li>
          <a @click="isContact = false" :class="isContact ? '' : 'active'">
            <IconChat width="25" height="23" :class="!isContact ? 'fill-primary' : 'fill-999'"/>
            <p>Chat</p>
          </a>
        </li>
      </ul>
    </div>


    <!-- Modal tạo nhóm chát -->
    <app-modal
      centered
      :width="420"
      :component-class="{ 'create-group-chat-modal': true }"
      v-if="visibleAddGroup"
    >
      <div slot="content">
        <h5>Tạo nhóm chat</h5>
        <div class="d-flex-center">
          <app-upload class="cgi-upload-avt change-avatar-group mr-3" @change="handleUploadChange">
            <template>
              <IconCamera width="20" height="20" />
            </template>
          </app-upload>
          <input type="text" class="input-name-group" placeholder="Tên nhóm chat" />
        </div>
        <app-search class="mb-0" />
        <div class="contact-list">
          <div class="item d-flex-center" v-for="(item, index) in friends" :key="index">
            <app-avatar :src="item.avatar" :size="30" class="mr-3" />
            <span>{{item.name}}</span>
            <app-checkbox class="ml-auto" />
          </div>
        </div>
        <div class="text-center mt-4">
          <app-button
            size="sm"
            color="info"
            class="mr-3"
            square
            @click="visibleAddGroup = false"
          >Hủy</app-button>
          <app-button size="sm" square>Tạo</app-button>
        </div>
      </div>
    </app-modal>

    <!-- Modal thêm bạn qua số điện thoại -->
    <app-modal
      centered
      :width="420"
      :component-class="{ 'message-foward-tags-modal': true }"
      v-if="visibleAddByPhone"
    >
      <div slot="content">
        <h5 class="mb-3">Thêm bạn bằng số điện thoại</h5>
        <app-input class="mb-0" />
        <div class="text-right mt-3">
          <app-button
            size="sm"
            color="info"
            class="mr-3"
            square
            @click="visibleAddByPhone = false"
          >Hủy</app-button>
          <app-button size="sm" square>Tìm</app-button>
        </div>
      </div>
    </app-modal>
  </div>
</template>

<script>
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconCloseOutline from "~/assets/svg/icons/Close-outline.svg?inline";
import IconUsers from "~/assets/svg/icons/users.svg?inline";
import IconChat from "~/assets/svg/icons/chat-green.svg?inline";
import IconEdit from '~/assets/svg/design-icons/edit.svg?inline';
import IconDots from '~/assets/svg/icons/dots.svg?inline';
import IconUsersAlt from '~/assets/svg/design-icons/users-alt.svg?inline';
import IconUserPlus from '~/assets/svg/design-icons/user-plus.svg?inline';
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

export default {
  components: {
    IconSearch,
    IconCloseOutline,
    IconUsers,
    IconChat,
    IconEdit,
    IconDots,
    IconUsersAlt,
    IconUserPlus,
    IconCamera
  },
  props: {
    contacts: {
      type: Array,
      default: () => [],
      required: true
    },
    friends: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  data() {
    return {
      tab: 1,
      isContact: false,
      visibleAddByPhone: false,
      visibleAddGroup: false,
    };
  },
  methods: {
    create() {
      this.$emit("addMessage");
    },

    async handleUploadChange(fileList, event) {
      this.avatar = Array.from(fileList);

      getBase64(this.avatar[0], src => {
        this.avatarSrc = src;
      });
      const body = new FormData();
      body.append("avatar_images", fileList[0]);
      console.log("[avatar_images]", fileList[0]);
      this.accountPersonalEditAvatar(body).then(result => {});
    },
  },
};
</script>