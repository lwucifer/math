<template>
  <div class="aside-box">
    <div class="tool-top">
      <n-link to="/" class="tool-top__link">
        <IconLeftArrow class="mr-3 fill-dark" width="5px" height="10px" />Tin nhắn
      </n-link>

      <div class="tool-top__feature">
        <app-dropdown
          position="left"
          v-model="dropdownEdit"
          :content-width="'10rem'"
          class="link--dropdown"
        >
          <button slot="activator" type="button" class="link--dropdown__button">
            <IconCog class="fill-base mr-3" />
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
          <IconEdit class="fill-base" />
        </button>
      </div>
    </div>

    <div class="search-nav">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-addon">
            <IconSearch width="15" height="15" class="fill-base" />
          </div>

          <input type="text" placeholder="Tìm kiếm người và nhóm" />

          <!-- <div class="input-group-addon">
            <a href="#">
              <IconCloseOutline class="fill-999" width="15" height="15" />
            </a>
          </div>-->
        </div>
      </div>
    </div>

    <div class="list-chat">
      <div class="tabs">
        <!-- <ul class="nav-tabs list-unstyle" v-if="!isContact">
          <li>
            <a @click="tabClick(1)" :class="tabChat == true ? 'active' : ''">Chat</a>
          </li>
          <li>
            <a @click="tabClick(2)" :class="tabChat == false ? 'active' : ''">Group</a>
          </li>
        </ul>-->

        <!-- <div class="tabs-content" v-if="isContact">
          <div class="align-item" v-for="(item, index) in friends" :key="index">
            <div class="left">
              <div class="align-item__image">
                <app-avatar :src="item.avatar" size="md" class="comment-item__avatar" />
              </div>

              <div class="align-item__meta">
                <h5 class="align-item__title">
                  <n-link slot="title" to>{{ item.name }}</n-link>
                </h5>
              </div>
            </div>

            <div class="right"></div>
          </div>
        </div>-->

        <div>
          <div class="tabs-content">
            <div class="btn-create-chat" v-if="checkChatList" @click="create()">
              <div class="btn-create-chat-icon">
                <IconPlus />
              </div>Tạo chat mới
            </div>

            <template v-else>
              <div
                class="align-item justify-content-between active"
                v-for="(item, index) in mapChatList ? mapChatList : []"
                :key="index"
                @click="pushUrl(item.id)"
              >
                <div class="left d-flex">
                  <div class="align-item__image">
                    <app-avatar
                      :src=" item && item.room_avatar_member ? item.room_avatar_member : 'https://picsum.photos/60/60'"
                      size="md"
                      class="comment-item__avatar"
                    />
                  </div>

                  <div class="align-item__meta">
                    <h5 class="align-item__title">
                      <n-link slot="title" to>{{ item.name ? item.name : '' }}</n-link>
                    </h5>
                    <div class="align-item__desc">
                      <p>{{ item.text }}</p>
                    </div>
                  </div>
                </div>

                <div class="right text-right">
                  <p>
                    <DotActive />
                  </p>
                  <p>25 giây</p>
                </div>
                <!-- <app-dropdown
                  position="right"
                  v-model="dropdownActions"
                  :content-width="'12rem'"
                  class="link--dropdown ml-auto pl-2"
                >
                  <button slot="activator" type="button" class="link--dropdown__button">
                    <IconDots class="fill-999" width="16" />
                  </button>
                  <div class="link--dropdown__content">
                    <ul>
                      <li @click.stop="handleNoti(item.allow_notication, item.room_id, item)">
                        <a v-if="item.allow_notication">Tắt thông báo</a>
                        <a v-else>Bật thông báo</a>
                      </li>
                      <li>
                        <a>Ẩn chat</a>
                      </li>
                      <li>
                        <a @click="visibleLeaveGroup = true">Chặn tin nhắn</a>
                      </li>
                    </ul>
                  </div>
                </app-dropdown>-->
              </div>
              <client-only>
                <infinite-loading @infinite="chatsInfiniteHandler">
                  <template slot="no-more">Không còn tin nhắn nào.</template>
                </infinite-loading>
              </client-only>
            </template>
          </div>

          <!-- <div class="tabs-content" v-show="tabChat == false">
            <div class="btn-create-chat" v-if="checkGroupList" @click="create()">
              <div class="btn-create-chat-icon">
                <IconPlus />
              </div>Tạo chat mới
            </div>
            <template v-else>
              <div
                class="align-item"
                v-for="(item, index) in mapGroupList ? mapGroupList : []"
                :key="index"
                @click="pushUrl(item.room_id)"
              >
                <div class="align-item__image">
                  <app-avatar
                    :src="item.room_avatar && item.room_avatar.low ? item.room_avatar.low : ''"
                    size="md"
                    class="comment-item__avatar"
                  />
                </div>
                <div class="align-item__meta">
                  <h5 class="align-item__title">
                    <n-link slot="title" to>{{ item.room_name }}</n-link>
                  </h5>
                  <div class="align-item__desc">
                    <p>{{ item.content }}</p>
                  </div>
                </div>
                <app-dropdown
                  position="right"
                  v-model="dropdownActions"
                  :content-width="'12rem'"
                  class="link--dropdown ml-auto pl-2"
                >
                  <button slot="activator" type="button" class="link--dropdown__button">
                    <IconDots class="fill-999" width="16" />
                  </button>
                  <div class="link--dropdown__content">
                    <ul>
                      <li @click.stop="handleNoti(item.allow_notication, item.room_id, item)">
                        <a v-if="item.allow_notication">Tắt thông báo</a>
                        <a v-else>Bật thông báo</a>
                      </li>
                      <li>
                        <a>Ẩn nhóm</a>
                      </li>
                      <li>
                        <a @click.prevent="leaveGroupModal(item)">Rời khỏi nhóm</a>
                      </li>
                    </ul>
                  </div>
                </app-dropdown>
              </div>
              <client-only>
                <infinite-loading @infinite="groupsInfiniteHandler">
                  <template slot="no-more">Không còn group.</template>
                </infinite-loading>
              </client-only>
            </template>
          </div>-->
        </div>
      </div>
    </div>

    <!-- <div class="aside-box__bottom">
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
    </div>-->

    <!-- Modal tạo nhóm chát -->
    <ModalAddGroup
      @close="visibleAddGroup = false"
      v-if="visibleAddGroup"
      :friends="friendList.listFriend ? friendList.listFriend : []"
    />

    <!-- Modal thêm bạn qua số điện thoại -->
    <ModalAddFriend @close="visibleAddByPhone = false" v-if="visibleAddByPhone" />

    <!-- Modal rồi nhớm -->
    <ModalLeaveGroup
      @close="visibleLeaveGroup = false"
      v-if="visibleLeaveGroup"
      @accept="handleLeaveGroup"
      :data="dataGroupLeave"
    />
  </div>
</template>

<script>
import ModalAddFriend from "~/components/page/chat/ModalAddFriend";
import ModalAddGroup from "~/components/page/chat/ModalAddGroup";
import ModalLeaveGroup from "~/components/page/chat/ModalLeaveGroup";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import IconSearch from "~/assets/svg/icons/search.svg?inline";
import IconCloseOutline from "~/assets/svg/icons/Close-outline.svg?inline";
import IconUsers from "~/assets/svg/icons/users.svg?inline";
import IconChat from "~/assets/svg/icons/chat-green.svg?inline";
import IconEdit from "~/assets/svg/design-icons/edit.svg?inline";
import IconCog from "~/assets/svg/icons/cog.svg?inline";
import IconUsersAlt from "~/assets/svg/design-icons/users-alt.svg?inline";
import IconUserPlus from "~/assets/svg/design-icons/user-plus.svg?inline";
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
import IconLeftArrow from "~/assets/svg/icons/left-arrow.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import DotActive from "~/assets/svg/v2-icons/elipse.svg?inline";

import GroupService from "~/services/message/Group";
import MessageType from "~/services/message/MessageType";
import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import { get, isEmpty } from "lodash";

export default {
  components: {
    IconSearch,
    IconCloseOutline,
    IconUsers,
    IconChat,
    IconEdit,
    IconCog,
    IconUsersAlt,
    IconUserPlus,
    ModalAddFriend,
    ModalAddGroup,
    ModalLeaveGroup,
    IconPlus,
    IconLeftArrow,
    IconDots,
    DotActive
  },
  props: {
    // contacts: {
    //   type: Array,
    //   default: () => [],
    //   required: true
    // },
    // friends: {
    //   type: Array,
    //   default: () => [],
    //   required: true
    // }
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
        page: 1,
        room_type: 2
      },
      chatListQuery: {
        page: 1,
        room_type: 1
      },
      groupsListTab: [],
      chatsListTab: [],
      infiniteId: +new Date(),
      infiniteIdChat: +new Date() + 100,
      // dataPushChat: [],
      // dataPushGroup: [],
      dataGroupLeave: {},
      checkChatList: false,
      checkGroupList: false,
      roomQuery: {}
    };
  },
  computed: {
    ...mapState("message", [
      "groupList",
      "listMessageType",
      "tabChat",
      "friendList",
      "groups",
      "chats"
    ]),
    ...mapState("chat", ["roomList"]),
    ...mapGetters("auth", ["userId"]),
    // mapGroupList() {
    //   const dataMapGroup =
    //     this.groups &&
    //     this.groups.listMessage &&
    //     this.groups.listMessage.map(item => {
    //       return {
    //         ...item.message,
    //         ...item.room,
    //         ...item.sender,
    //         message_id: item.message && item.message.id ? item.message.id : "",
    //         room_id: item.room && item.room.id ? item.room.id : ""
    //       };
    //     });
    //   // debugger;
    //   const dataGroup = dataMapGroup.map(item => {
    //     const [dataNoti] =
    //       item &&
    //       item.members &&
    //       item.members.filter(item => item.user_id == this.userId);
    //     // console.log("dataNoti", dataNoti);
    //     const dataRoomName =
    //       (
    //         item.members[0].fullname +
    //         ", " +
    //         item.members[1].fullname
    //       ).substring(0, 15) + "...";
    //     // console.log("[dataRoomName]", dataRoomName);
    //     return {
    //       ...item,
    //       room_name: item.room_name ? item.room_name : dataRoomName,
    //       allow_notication:
    //         dataNoti && dataNoti.allow_notication
    //           ? dataNoti.allow_notication
    //           : 0
    //     };
    //   });
    //   return dataGroup;
    // },
    mapChatList() {
      // const dataMap =
      //   this.roomList &&
      //   this.roomList.list_room &&
      //   this.roomList.list_room.map(item => {
      //     return {
      //       ...item.message,
      //       ...item.room,
      //       ...item.sender,
      //       message_id: item.message && item.message.id ? item.message.id : "",
      //       room_id: item.room && item.room.id ? item.room.id : ""
      //     };
      //   });
      // const data = dataMap.map(item => {
      //   const [dataName] =
      //     item &&
      //     item.members &&
      //     item.members.filter(item => item.user_id != this.userId);
      //   const [dataNoti] = item.members.filter(
      //     item => item.user_id == this.userId
      //   );
      //   return {
      //     ...item,
      //     name_sender: item.id == this.userId ? "Bạn" : item.fullname,
      //     room_name_member: dataName.fullname ? dataName.fullname : "",
      //     room_avatar_member: dataName.avatar.low ? dataName.avatar.low : "",
      //     allow_notication:
      //       dataNoti && dataNoti.allow_notication
      //         ? dataNoti.allow_notication
      //         : 0
      //   };
      // });
      const data =
        this.roomList &&
        this.roomList.list_room.map(item => {
          return {
            ...item,
            ...item.room
          };
        });
      const dataRoom = data.map(item => {
        if (item.type == "PRIVATE") {
          return {
            ...item,
            name: item && item.sender ? item.sender.first_name : ""
          };
        } else {
          return {
            ...item,
            name: item && item.sender ? item.sender.first_name : ""
          };
        }
      });
      return dataRoom;
    }
  },
  methods: {
    ...mapActions("message", [
      "getGroupList",
      "groupLeave",
      "groupNotification",
      "getListMessageType"
    ]),
    ...mapMutations("message", ["setTabChat"]),

    leaveGroupModal(_item) {
      this.visibleLeaveGroup = true;
      this.dataGroupLeave = _item;
    },
    handleLeaveGroup() {
      const data = { room_id: this.dataGroupLeave.id };
      this.groupLeave(data).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          this.visibleLeaveGroup = false;
          this.groupListQuery.page = 1;
          this.getGroupList({ params: this.groupListQuery });
        } else {
          this.$toasted.error(result.message);
        }
      });
    },
    handleNoti(noti, roomId, item) {
      const data = {
        room_id: roomId,
        notification: noti == 1 ? 0 : 1,
        user_id: this.userId
      };
      this.groupNotification(data).then(result => {
        if (result.success == true) {
          this.$toasted.show("success");
          if (item.type == 2) {
          } else {
            this.chatsListTab = [];
            this.chatListQuery.page = 1;
            this.infiniteIdChat += 1;
          }
        } else {
          this.$toasted.error(result.message);
        }
      });
    },
    tabClick(e) {
      this.tab = e;
      this.$emit("clickTab");
      const tabChat = e == 1 ? true : false;
      this.setTabChat(tabChat);
    },

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
      const getData = await this.$store.dispatch(
        `message/${actionTypes.MESSAGE_GROUP.LIST_MESSAGE_TYPE}`,
        {
          params: {
            page: get(this, "groups.page.number", 0) + 1,
            room_type: 2
          }
        }
      );
      console.log("getData", getData);

      if (getData.success && !isEmpty(getData.data)) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    async chatsInfiniteHandler($state) {
      const getData = await this.$store.dispatch(
        `chat/${actionTypes.CHAT.ROOM_LIST}`,
        {
          params: this.roomQuery
        }
      );
      console.log("getData", getData);
      // check no room
      if (this.roomList.listMessage == 0) {
        this.checkChatList = true;
      }
      if (getData && getData.list_room && getData.list_room.length > 0) {
        this.roomQuery.lastest_message_id =
          getData.list_room[getData.list_room.length - 1].lastest_message.id;
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    pushUrl(_id) {
      console.log("id", _id);
      const url = `/messages/t/${_id}`;
      this.$router.push(url);
    }
  },
  watch: {
    // tabChat(_newval) {
    //   if (_newval == true) {
    //     this.chatsListTab = [];
    //     this.chatListQuery.page = 1;
    //     // this.infiniteIdChat += 1;
    //   } else {
    //     this.groupsListTab = [];
    //     this.groupListQuery.page = 1;
    //     this.infiniteId += 1;
    //   }
    // },
    listMessageType(_newval) {
      if (_newval) {
        this.chatsListTab = [];
        this.chatListQuery.page = 1;
        this.groupsListTab = [];
        this.groupListQuery.page = 1;
        this.infiniteIdChat += 1;
        this.infiniteId += 1;
      }
    }
  }
};
</script>