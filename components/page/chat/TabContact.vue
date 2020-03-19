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
                  <IconUsersAlt class="mr-2" />Thêm bạn
                </a>
              </li>
              <li class="link--dropdown__content__item">
                <a @click="visibleAddGroup = true">
                  <IconUserPlus class="mr-2" />Tạo nhóm
                </a>
              </li>
            </ul>
          </div>
        </app-dropdown>
        <button @click="create()" title="Viết tin nhắn mới">
          <IconEdit />
        </button>
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
            <div
              class="align-item"
              v-for="(item, index) in chatsListTab ? chatsListTab : []"
              :key="index"
              @click="pushUrl(item.id)"
            >
              <div class="align-item__image">
                <app-avatar
                  :src="item.members[0].avatar && item.members[0].avatar.low ? item.members[0].avatar.low : ''"
                  size="md"
                  class="comment-item__avatar"
                />
              </div>
              <div class="align-item__meta">
                <h4 class="align-item__title">
                  <n-link
                    slot="title"
                    to
                  >{{ item.members[0] && item.members[0].fullname ? item.members[0].fullname : '' }}</n-link>
                </h4>
                <div class="align-item__desc">
                  <p>{{ item.desc }}</p>
                </div>
              </div>
              <app-dropdown
                position="right"
                v-model="dropdownActions"
                :content-width="'10rem'"
                class="link--dropdown ml-auto pl-2"
              >
                <button slot="activator" type="button" class="link--dropdown__button">
                  <IconDots class="fill-999" width="16" />
                </button>
                <div class="link--dropdown__content">
                  <ul>
                    <li>
                      <a>Tắt thông báo</a>
                    </li>
                    <li>
                      <a>Ẩn chat</a>
                    </li>
                    <li>
                      <a @click="visibleLeaveGroup = true">Chặn tin nhắn</a>
                    </li>
                  </ul>
                </div>
              </app-dropdown>
            </div>
            <client-only>
              <infinite-loading :identifier="infiniteIdChat" @infinite="chatsInfiniteHandler">
                <template slot="no-more">Không còn tin nhắn nào.</template>
              </infinite-loading>
            </client-only>
          </div>
          <div class="tabs-content" v-if="tab == 2">
            <div
              class="align-item"
              v-for="(item, index) in groupsListTab ? groupsListTab : []"
              :key="index"
            >
              <div class="align-item__image">
                <app-avatar :src="item.image" size="md" class="comment-item__avatar" />
              </div>
              <div class="align-item__meta">
                <h4 class="align-item__title">
                  <n-link slot="title" to>{{ item.room_name }}</n-link>
                </h4>
                <div class="align-item__desc">
                  <p>{{ item.desc }}</p>
                </div>
              </div>
              <app-dropdown
                position="right"
                v-model="dropdownActions"
                :content-width="'10rem'"
                class="link--dropdown ml-auto pl-2"
              >
                <button slot="activator" type="button" class="link--dropdown__button">
                  <IconDots class="fill-999" width="16" />
                </button>
                <div class="link--dropdown__content">
                  <ul>
                    <li>
                      <a>Tắt thông báo</a>
                    </li>
                    <li>
                      <a>Ẩn nhóm</a>
                    </li>
                    <li>
                      <a @click="visibleLeaveGroup = true">Rời khỏi nhóm</a>
                    </li>
                  </ul>
                </div>
              </app-dropdown>
            </div>
            <client-only>
              <infinite-loading :identifier="infiniteId" @infinite="groupsInfiniteHandler">
                <template slot="no-more">Không còn group.</template>
              </infinite-loading>
            </client-only>
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
            <IconChat width="25" height="23" :class="!isContact ? 'fill-primary' : 'fill-999'" />
            <p>Chat</p>
          </a>
        </li>
      </ul>
    </div>

    <!-- Modal tạo nhóm chát -->
    <ModalAddGroup @close="visibleAddGroup = false" v-if="visibleAddGroup" :friends="friendList" />

    <!-- Modal thêm bạn qua số điện thoại -->
    <ModalAddFriend @close="visibleAddByPhone = false" v-if="visibleAddByPhone" />

    <!-- Modal rồi nhớm -->
    <ModalLeaveGroup @close="visibleLeaveGroup = false" v-if="visibleLeaveGroup" />
  </div>
</template>

<script>
import ModalAddFriend from "~/components/page/chat/ModalAddFriend";
import ModalAddGroup from "~/components/page/chat/ModalAddGroup";
import ModalLeaveGroup from "~/components/page/chat/ModalLeaveGroup";
import { mapState, mapGetters, mapActions } from "vuex";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconCloseOutline from "~/assets/svg/icons/Close-outline.svg?inline";
import IconUsers from "~/assets/svg/icons/users.svg?inline";
import IconChat from "~/assets/svg/icons/chat-green.svg?inline";
import IconEdit from "~/assets/svg/design-icons/edit.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconUsersAlt from "~/assets/svg/design-icons/users-alt.svg?inline";
import IconUserPlus from "~/assets/svg/design-icons/user-plus.svg?inline";
import GroupService from "~/services/message/Group";
import * as actionTypes from "~/utils/action-types";

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
    ModalAddFriend,
    ModalAddGroup,
    ModalLeaveGroup
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
      visibleLeaveGroup: false,
      nameGroup: "",
      dropdownEdit: false,
      dropdownActions: false,
      groupListQuery: {
        page: 1
      },
      chatListQuery: {
        page: 1
      },
      groupsListTab: [],
      chatsListTab: [],
      infiniteId: +new Date(),
      infiniteIdChat: +new Date(),
      dataPushChat: [],
      dataPushGroup: []
    };
  },
  computed: {
    ...mapState("social", ["friendList"]),
    ...mapState("message", ["groupList"])
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

    async groupsInfiniteHandler($state) {
      const { data: getData = {} } = await new GroupService(this.$axios)[
        actionTypes.BASE.LIST
      ]({
        params: this.groupListQuery
      });

      if (getData.rooms && getData.rooms.length) {
        this.groupListQuery.page += 1;
        this.dataPushGroup.push(
          ...getData.rooms.filter(item => item.type == 2)
        );
        this.groupsListTab = this.dataPushGroup.map(item => item);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async chatsInfiniteHandler($state) {
      const { data: getData = {} } = await new GroupService(this.$axios)[
        actionTypes.BASE.LIST
      ]({
        params: this.chatListQuery
      });

      if (getData.rooms && getData.rooms.length) {
        this.chatListQuery.page += 1;
        this.dataPushChat.push(...getData.rooms.filter(item => item.type == 1));
        this.chatsListTab = this.dataPushChat.map(item => item);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    pushUrl(_id) {
      console.log("id", _id);
      const url = `/message/${_id}`;
      this.$router.push(url);
    }
  },
  watch: {
    tab(_newval) {
      if (_newval == 1) {
        this.infiniteIdChat += 1;
        this.chatListQuery.page = 1;
      } else {
        this.infiniteId += 1;
        this.groupListQuery.page = 1;
      }
    }
  }
};
</script>