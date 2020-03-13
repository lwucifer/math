<template>
  <div class="aside-box">
    <div class="aside-box__top">
      <div class="tool-top mb-15">
        <button><IconDots/></button>
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
  </div>
</template>

<script>
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconCloseOutline from "~/assets/svg/icons/Close-outline.svg?inline";
import IconUsers from "~/assets/svg/icons/users.svg?inline";
import IconChat from "~/assets/svg/icons/chat-green.svg?inline";
import IconEdit from '~/assets/svg/design-icons/edit.svg?inline';
import IconDots from '~/assets/svg/icons/dots.svg?inline';

export default {
  components: {
    IconSearch,
    IconCloseOutline,
    IconUsers,
    IconChat,
    IconEdit,
    IconDots
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
      isContact: false
    };
  },
  methods: {
    create() {
      this.$emit("addMessage");
    }
  },
};
</script>