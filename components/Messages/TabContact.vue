<template>
  <div class="aside-box">
    <div class="aside-box__top">
      <div class="search-nav">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">
              <IconSearch width="15" height="15" />
            </div>
            <input type="text" placeholder="03826589" />
            <div class="input-group-addon">
              <a href="#">
                <IconCloseOutline width="15" height="15" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside-box__content">
      <div class="tabs">
        <ul class="nav-tabs list-unstyle">
          <li>
            <a class="active" href="#">Chat</a>
          </li>
          <li>
            <a href="#">Group</a>
          </li>
        </ul>
        <div class="tabs-content">
          <!-- align-item -->
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
          <!-- End / align-item -->
        </div>
      </div>
    </div>
    <div class="aside-box__bottom">
      <ul class="group-button list-unstyle">
        <li>
          <a href="#">
            <IconUsers width="22" height="23" />
            <p>Contact</p>
          </a>
        </li>
        <li>
          <a class="active" href="#">
            <IconChat width="25" height="23" />
            <p>Chat</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconSearch from "~/assets/svg/icons/search.svg?inline"
import IconCloseOutline from "~/assets/svg/icons/Close-outline.svg?inline";
import IconUsers from "~/assets/svg/icons/users.svg?inline";
import IconChat from "~/assets/svg/icons/chat-green.svg?inline";

export default {
  components: {
    IconSearch,
    IconCloseOutline,
    IconUsers,
    IconChat,
  },
  props: {
    contacts: {
      type: Array,
      default: () => [],
      required: true
    },
  }
}
</script>