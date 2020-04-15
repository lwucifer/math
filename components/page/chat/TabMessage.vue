<template>
  <div class="col-md-8 message-chat__content">
    <div class="aside-box">
      <div class="aside-box__top" v-if="isCreated">
        <div class="aside-box__top__create d-flex-center w-100">
          <span class="color-999 mr-2">Đến:</span>
          <app-select
            mode="tags"
            placeholder="Gửi cho ai?"
            style="flex: 1"
            :options="tagOptions"
            v-model="tag"
            @visible-change="handleFriendsVisibleChange"
          >
            <div
              slot="option"
              slot-scope="{ option }"
              class="d-flex align-items-center"
              @click.prevent="changeUserChat(option)"
            >
              <app-avatar
                :src="option.avatar && option.avatar.low ? option.avatar.low : null"
                size="sm"
                class="mr-3"
              ></app-avatar>
              {{ option.text }}
            </div>

            <client-only>
              <infinite-loading
                slot="options-append"
                spinner="spiral"
                :identifier="friendsInfiniteId"
                @infinite="friendsInfiniteHandler"
              />
            </client-only>
          </app-select>
        </div>
      </div>

      <div class="aside-box__top" v-if="messagesList.length > 0">
        <div class="message-desc">
          <div class="message-decs__image">
            <app-avatar :src="avatarSrc" size="sm" class="comment-item__avatar" />
          </div>
          <div class="message-decs__title">
            <span>{{nameGroup}}</span>
          </div>
        </div>
        <div class="message-tool">
          <ul class="list-unstyle">
            <li>
              <a href="#">
                <IconPhone width="15" height="15" />
              </a>
            </li>
            <li>
              <a href="#">
                <IconVideo width="15" height="15" />
              </a>
            </li>
            <li>
              <a @click="visibleAddByPhone = true">
                <IconAddUser width="15" height="15" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style="opacity: 0; height: 0; overflow: hidden">
        <client-only>
          <infinite-loading
            direction="top"
            :identifier="infiniteId"
            @infinite="messageInfiniteHandler"
          >
            <template slot="no-more">Không còn tin nhắn.</template>
          </infinite-loading>
        </client-only>
      </div>

      <div class="aside-box__content">
        <client-only>
          <infinite-loading
            direction="top"
            :identifier="infiniteId"
            @infinite="messageInfiniteHandler"
          >
            <template slot="no-more">Không còn tin nhắn.</template>
          </infinite-loading>
        </client-only>
        <div class="message-box__time">
          <!-- <div class="message-box__time__line"></div> -->
          <div class="message-box__time__content">
            <!-- <span>Thứ 5, Ngày 19/09/2019</span> -->
          </div>
        </div>
        <div class="message-box">
          <!-- message date -->
          <!-- END / message date -->
          <!-- message box item -->
          <div
            class="message-box__item"
            :class="item.user && item.user.id == userId ? 'item__0' : 'item__1'"
            v-show="item.content || item.img_url && item.img_url.low"
            v-for="(item, index) in messagesList ? messagesList : []"
            :key="index"
          >
            <div class="message-box__item__content">
              <div class="message-box__item__meta" v-if="index == messagesList.length -1">
                <div class="message-box__item__meta__image">
                  <app-dropdown
                    position="left"
                    v-model="dropdownShow"
                    :content-width="'10rem'"
                    class="link--dropdown"
                  >
                    <button slot="activator" type="button" class="link--dropdown__button">
                      <app-avatar
                        :src="item.user && item.user.avatar && item.user.avatar.low ? item.user.avatar.low : ''"
                        size="sm"
                        class="comment-item__avatar"
                      />
                    </button>
                    <!-- <div class="link--dropdown__content">
                      <ul>
                        <li class="link--dropdown__content__item">
                          <n-link to="/" class="link-dark">
                            <span>Gửi tin nhắn</span>
                          </n-link>
                        </li>
                        <li class="link--dropdown__content__item">
                          <n-link to="/" class="link-dark">
                            <span>Xem trang cá nhân</span>
                          </n-link>
                        </li>
                      </ul>
                    </div>-->
                  </app-dropdown>
                </div>
                <div class="message-box__item__meta__desc">
                  <span>{{item.user.fullname}}</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>{{item.created_at | moment("DD/MM/YYYY") }}</span>
                </div>
              </div>
              <div
                class="message-box__item__meta"
                v-else-if="index < messagesList.length - 1 && messagesList[index].user.id != messagesList[index+1].user.id"
              >
                <div class="message-box__item__meta__image">
                  <app-dropdown
                    position="left"
                    v-model="dropdownShow"
                    :content-width="'10rem'"
                    class="link--dropdown"
                  >
                    <button slot="activator" type="button" class="link--dropdown__button">
                      <app-avatar
                        :src="item.user && item.user.avatar && item.user.avatar.low ? item.user.avatar.low : ''"
                        size="sm"
                        class="comment-item__avatar"
                      />
                    </button>
                    <!-- <div class="link--dropdown__content">
                      <ul>
                        <li class="link--dropdown__content__item">
                          <n-link to="/" class="link-dark">
                            <span>Gửi tin nhắn</span>
                          </n-link>
                        </li>
                        <li class="link--dropdown__content__item">
                          <n-link to="/" class="link-dark">
                            <span>Xem trang cá nhân</span>
                          </n-link>
                        </li>
                      </ul>
                    </div>-->
                  </app-dropdown>
                </div>
                <div class="message-box__item__meta__desc">
                  <span>{{item.user.fullname}}</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>{{item.created_at | moment("hh:mm A") }}</span>
                </div>
              </div>
              <div class="message-box__item__desc" v-if="item.content">
                <div class="message-box__item__desc__text">
                  <p>{{item.content}}</p>
                </div>
                <!-- <div class="message" v-if="item.img_url">
                  <img
                    v-if="item.img_url && item.img_url.low"
                    :src="item.img_url && item.img_url.low ? item.img_url.low : ''"
                  />
                </div>-->
                <div class="message-box__item__desc__actions">
                  <button title="Trả lời" @click="reply()">
                    <IconReply />
                  </button>
                  <button title="Chuyển tiếp">
                    <IconUpload />
                  </button>
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
                          <a>Sửa tin nhắn</a>
                        </li>
                        <li class="link--dropdown__content__item">
                          <a @click="visibleDelete = true">Xóa tin</a>
                        </li>
                      </ul>
                    </div>
                  </app-dropdown>
                </div>
              </div>
              <div class="message-box__item__desc" v-if="item.img_url && item.img_url.low">
                <!-- <div class="message-box__item__desc__text">
                  <p>{{item.content}}</p>
                </div>-->
                <div class="message-box__item__desc__image">
                  <img
                    v-if="item.img_url && item.img_url.low"
                    :src="item.img_url && item.img_url.low ? item.img_url.low : ''"
                  />
                </div>
                <div class="message-box__item__desc__actions">
                  <button title="Trả lời" @click="reply()">
                    <IconReply />
                  </button>
                  <button title="Chuyển tiếp">
                    <IconUpload />
                  </button>
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
                          <a>Sửa tin nhắn</a>
                        </li>
                        <li class="link--dropdown__content__item">
                          <a @click="visibleDelete = true">Xóa tin</a>
                        </li>
                      </ul>
                    </div>
                  </app-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="aside-box__content"></div> -->

      <div class="aside-box__bottom">
        <div v-if="isReply" class="aside-box__bottom__reply">
          <p>
            Đang phản hồi
            <b>Minh</b>
          </p>
          <p class="color-999 mt-1 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <IconClose @click="isReply = false" class="btn-close" />
        </div>
        <div class="input-group">
          <div class="list-chat-img">
            <div class="item" v-for="(item, i) in listImgSrc" :key="i">
              <button class="btn-remove" @click="removeImgSrc" title="Remove">
                <IconClose class="fill-white" />
              </button>
              <img :src="item" />
            </div>
          </div>

          <div class="input-chat">
            <input
              class="input-control"
              v-model="textChat"
              v-on:keyup.enter="handleEmitMessage"
              placeholder="Nhấp để chat"
            />
            <div class="input-group_addon">
              <ul class="list-unstyle">
                <li>
                  <a href="#">
                    <IconSmile width="15" height="15" />
                  </a>
                </li>
                <li>
                  <div class="app-files">
                    <label for="files">
                      <IconImage width="15" height="15" />
                    </label>
                    <input type="file" id="files" name="files" multiple @change="handleUploadChange2"/>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal thêm bạn qua số điện thoại -->
    <ModalAddFriend @close="visibleAddByPhone = false" v-if="visibleAddByPhone" />

    <!-- Modal thêm bạn trong nhóm-->
    <ModalAddFriendByGroup @close="visibleAddByGroup = false" v-if="visibleAddByGroup" />

    <!-- Modal xóa tin nhắn -->
    <app-modal
      centered
      :width="250"
      :component-class="{ 'message-foward-tags-modal': true }"
      v-if="visibleDelete"
    >
      <div slot="content" class="text-center">
        <h5 class="mb-4">Bạn muốn gỡ tin nhắn?</h5>
        <div class="text-center mt-4">
          <app-button size="sm" color="info" class="mr-3" square @click="visibleDelete = false">Hủy</app-button>
          <app-button size="sm" square>Xóa</app-button>
        </div>
      </div>
    </app-modal>

    <!-- Modal chuyển tiếp -->
    <app-modal
      centered
      :width="606"
      :component-class="{ 'message-foward-tags-modal': true }"
      v-if="visible"
    >
      <div slot="content">
        <h5 class="mb-4">Chuyển tiếp đến</h5>
        <app-select
          mode="tags"
          placeholder="Gửi cho ai?"
          style="width: 100%"
          :options="tagOptions"
          v-model="tag"
          @visible-change="handleFriendsVisibleChange"
        >
          <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
            <app-avatar
              :src="option.avatar && option.avatar.low ? option.avatar.low : null"
              size="sm"
              class="mr-3"
            ></app-avatar>
            {{ option.text }}
          </div>

          <client-only>
            <infinite-loading
              slot="options-append"
              :identifier="friendsInfiniteId"
              @infinite="friendsInfiniteHandler"
            />
          </client-only>
        </app-select>
        <div class="text-right mt-4">
          <app-button size="sm" color="info" class="mr-3" square @click="visible = false">Hủy</app-button>
          <app-button size="sm" square @click="foward()">Gửi</app-button>
        </div>
      </div>
    </app-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { Editor, EditorContent } from "tiptap";
import { Placeholder } from "tiptap-extensions";

import { getBase64 } from "~/utils/common";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import FriendService from "~/services/social/friend";

import ModalAddFriend from "~/components/page/chat/ModalAddFriend";
import ModalAddFriendByGroup from "~/components/page/chat/ModalAddFriendByGroup";

import IconPhone from "~/assets/svg/icons/phone-green.svg?inline";
import IconVideo from "~/assets/svg/icons/video-green.svg?inline";
import IconAddUser from "~/assets/svg/icons/add-user-green.svg?inline";
import IconSmile from "~/assets/svg/icons/smile.svg?inline";
import IconImage from "~/assets/svg/icons/image.svg?inline";
import IconUpload from "~/assets/svg/icons/upload.svg?inline";
import IconReply from "~/assets/svg/icons/reply.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

import Message from "~/services/message/Message";
import * as actionTypes from "~/utils/action-types";

export default {
  components: {
    IconPhone,
    IconVideo,
    IconAddUser,
    IconSmile,
    IconImage,
    IconReply,
    IconUpload,
    IconDots,
    IconClose,
    IconCamera,
    ModalAddFriend,
    ModalAddFriendByGroup
  },

  props: {
    isCreated: {
      type: Boolean,
      default: false
    },
    isGroup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdownShow: false,
      dropdownEdit: false,
      textChat: "",
      isReply: false,
      tag: [],
      visible: false,
      visibleDelete: false,
      visibleAddByPhone: false,
      visibleAddGroup: false,
      visibleAddByGroup: false,
      friendsInfiniteId: +new Date(),
      infiniteId: +new Date(),
      friendsListQuery: {
        page: 1
      },
      messageListQuery: {
        page: 1,
        room_id: ""
      },
      friendsList: [],
      listImgSrc: [],
      // dataPushMessage: [],
      messagesList: [],
      friends: [
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        },
        {
          id: "1",
          name: "Nguyễn Hữu Nam",
          avatar: "https://picsum.photos/40/40"
        }
      ],
      imgSrc: "",
      listImage: [],
      urlEmitMessage: "",
      messageId: "",
      name: "",
      roomIdPush: ""
      // avatarUser: {},
      // fullname: ""
    };
  },

  computed: {
    ...mapState("social", [{ labelList: "labels" }, "friendList"]),
    ...mapState("message", [
      "messageList",
      "groupListDetail",
      "messageOn",
      "memberList"
    ]),
    ...mapState("account", ["personalList"]),
    ...mapGetters("auth", ["userId", "fullName", "avatarUser"]),
    selectedTags() {
      return this.tag.map(item => {
        const [resultItem = {}] = this.tagOptions.filter(i => i.value === item);
        return resultItem;
      });
    },

    selectedCheckin() {
      const [result = {}] = this.checkinOptions.filter(
        item => item.value === this.checkin
      );
      return result.text;
    },

    tagOptions() {
      return (
        this.friendList.listFriend &&
        this.friendList.listFriend.map(item => ({
          ...item,
          value: item.id,
          text: item.fullname,
          avatar: item.avatar
        }))
      );
    },
    nameGroup() {
      console.log("this.memberList", this.memberList);
      const dataMember =
        this.memberList && this.memberList.listMember
          ? this.memberList.listMember
          : [];
      const dataTotal =
        this.memberList &&
        this.memberList.page &&
        this.memberList.page.totalElements
          ? this.memberList.page.totalElements
          : "";
      if (this.groupListDetail.room && this.groupListDetail.room.type == 1) {
        const [dataFilterMember] = dataMember.filter(
          item => item.id != this.userId
        );
        return dataFilterMember && dataFilterMember.fullname
          ? dataFilterMember.fullname
          : "";
      } else if (
        this.groupListDetail.room &&
        this.groupListDetail.room.type == 2
      ) {
        const filterMemberUserId = dataMember.filter(
          item => item.id != this.userId
        );
        let dataNameGroup = "";
        if (filterMemberUserId.length < 4) {
          dataNameGroup = filterMemberUserId
            .reduce((acc, cor) => {
              acc.push(cor.fullname);
              return acc;
            }, [])
            .join(", ");
        } else {
          dataNameGroup =
            filterMemberUserId[0].fullname +
            ", " +
            filterMemberUserId[1].fullname +
            ", " +
            filterMemberUserId[2].fullname +
            " và " +
            (dataTotal - 4).toString() +
            " người khác";
        }
        return this.groupListDetail.room.room_name
          ? this.groupListDetail.room.room_name
          : dataNameGroup;
      }
    },
    avatarSrc() {
      const dataMember =
        this.memberList && this.memberList.listMember
          ? this.memberList.listMember
          : [];
      if (this.groupListDetail.room && this.groupListDetail.room.type == 1) {
        const [dataFilterMember] = dataMember.filter(
          item => item.id != this.userId
        );
        return dataFilterMember &&
          dataFilterMember.avatar &&
          dataFilterMember.avatar.low
          ? dataFilterMember.avatar.low
          : "";
      } else if (
        this.groupListDetail.room &&
        this.groupListDetail.room.type == 2
      ) {
        return;
        this.groupListDetail.room.room_avatar &&
        this.groupListDetail.room.room_avatar.low
          ? this.groupListDetail.room.room_avatar.low
          : "https://picsum.photos/40/40";
      }
    }
  },

  methods: {
    ...mapActions("message", [
      "messageSendImg",
      "accountPersonalList",
      "createGroup",
      "getGroupList",
      "getMessageList",
      "getGroupListDetail"
    ]),
    ...mapMutations("message", ["setEmitMessage", "emitCloseFalse"]),
    async messageInfiniteHandler($state) {
      // this.messageListQuery.room_id = this.$route.params.id;
      const { data: getData = {} } = await new Message(this.$axios)[
        actionTypes.BASE.LIST
      ]({
        params: this.messageListQuery
      });
      if (getData.messages && getData.messages.length) {
        this.messageListQuery.page += 1;
        this.messagesList.push(...getData.messages);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    reply() {
      this.isReply = true;
    },

    foward() {},

    async handleUploadChange2(fileList, event) {
      let listFile = fileList.target.files;
      this.listImage = Array.from(listFile);
      this.fileList = listFile;

      this.listImage.forEach(element => {
        getBase64(element, src => {
          this.listImgSrc.push(src);
        });
      });

      const body = new FormData();
      body.append("msg_image", listFile);
      body.append("room_id", this.$route.params.id);
      await this.messageSendImg(body).then(result => {
        console.log("[send img]", result);
        this.urlEmitMessage =
          result.data &&
          result.data.full_img_url &&
          result.data.full_img_url.low
            ? result.data.full_img_url.low
            : "";
        this.messageId =
          result.data && result.data.message_id ? result.data.message_id : "";
      });
    },

    async handleUploadChange(fileList, event) {
      this.listImage = Array.from(fileList);

      getBase64(this.listImage[0], src => {
        this.imgSrc = src;
      });

      this.fileList = fileList;
      const body = new FormData();
      body.append("msg_image", fileList[0]);
      body.append("room_id", this.$route.params.id);
      await this.messageSendImg(body).then(result => {
        console.log("[send img]", result);
        this.urlEmitMessage =
          result.data &&
          result.data.full_img_url &&
          result.data.full_img_url.low
            ? result.data.full_img_url.low
            : "";
        this.messageId =
          result.data && result.data.message_id ? result.data.message_id : "";
      });
    },

    // async sendImgChat(fileList) {
    //   console.log("[msg_image]", fileList);
    //   debugger;
    //   if (fileList.length > 0) {
    //   }
    // },

    async friendsInfiniteHandler($state) {
      const { data = {} } = await new FriendService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: this.friendsListQuery
      });

      if (data.listFriend && data.listFriend.length) {
        this.friendsListQuery.page += 1;
        this.friendsList = this.friendsList.concat(data.listFriend);
        $state.loaded();
      } else {
        $state.complete();
      }
    },

    handleFriendsVisibleChange(isVisible) {
      console.log("handleFriendsVisibleChange", isVisible);

      if (isVisible) {
        this.friendsInfiniteId += 1;
      } else {
        this.friendsList = [];
        this.friendsListQuery.page = 1;
      }
    },
    handleEmitMessage() {
      this.emitCloseFalse(false, this.isGroup);
      if (this.tag.length == 0) {
        if (
          this.textChat != "" ||
          (this.urlEmitMessage && this.urlEmitMessage.low != "")
        ) {
          const dataEmit = {
            room_id: this.$route.params.id,
            content: this.textChat,
            img_url: { low: this.urlEmitMessage },
            message_id: this.messageId,
            avatar: this.avatarUser.low ? this.avatarUser.low : "",
            fullname: this.fullName ? this.fullName : ""
          };
          console.log("[socket] dataEmit", dataEmit);
          this.setEmitMessage(dataEmit);
          this.getGroupListDetail({
            params: {
              room_id: this.$route.params.id
            }
          });
        }
        this.textChat = "";
      } else if (this.tag.length == 1) {
        this.$router.push(`/messages/t/${this.roomIdPush}`);
        const dataEmit = {
          room_id: this.roomIdPush,
          content: this.textChat,
          img_url: { low: this.urlEmitMessage },
          message_id: this.messageId,
          avatar: this.avatarUser.low ? this.avatarUser.low : "",
          fullname: this.fullName ? this.fullName : ""
        };
        console.log("[socket] dataEmit", dataEmit);
        this.setEmitMessage(dataEmit);
      } else if (this.tag.length > 1) {
        const data = {
          type: 2,
          members: this.tag.toString(),
          name: this.name ? this.name : ""
        };
        this.createGroup(data).then(result => {
          if (result.success == true) {
            this.getGroupList();
            this.$toasted.show("success");
            this.$router.push(`/messages/t/${result.data.id}`);
            const dataEmit = {
              room_id: result.data.id,
              content: this.textChat,
              img_url: { low: this.urlEmitMessage },
              message_id: this.messageId,
              avatar: this.avatarUser.low ? this.avatarUser.low : "",
              fullname: this.fullName ? this.fullName : ""
            };
            console.log("[socket] dataEmit", dataEmit);
            this.setEmitMessage(dataEmit);
          } else {
            this.$toasted.error(result.message);
          }
        });
      }
      this.removeImgSrc();
    },
    changeUserChat(option) {
      console.log("[option]", option, this.tag.length);
      if (this.tag.length == 0) {
        const data = {
          type: 1,
          members: option.id.toString(),
          name: this.name ? this.name : ""
        };
        this.createGroup(data).then(result => {
          if (result.success == true) {
            console.log("[result]", result.data.id);
            this.roomIdPush = result.data.id;
            this.getMessageList({
              params: {
                room_id: result.data.id
              }
            });
            // this.$router.push(`/messages/t/${result.data.id}`);
          } else {
            // this.$toasted.error(result.message);
          }
        });
      } else {
        this.messagesList = [];
      }
    },
    removeImgSrc() {
      this.imgSrc = "";
      this.fileList = [];
      this.urlEmitMessage = "";
      this.message_id = "";
    }
  },
  created() {
    this.messageListQuery.room_id = this.$route.params.id;
  },
  watch: {
    messageOn(_newVal) {
      if (_newVal) {
        console.log("[messageOn]", _newVal);
        const data = {
          ..._newVal,
          user: {
            avatar: { low: _newVal.avatar },
            fullname: _newVal.fullname,
            id: _newVal.user_id
          }
        };
        console.log("data", data);
        this.messagesList.unshift(data);
        console.log("[this.messagesList]", this.messagesList);
        // img_url: { low: _newVal.img_url }
      }
    },
    messageList(_newVal) {
      if (_newVal) {
        this.messagesList = [];
        this.messageListQuery.page = 1;
        this.messageListQuery.room_id = this.roomIdPush
          ? this.roomIdPush
          : this.$route.params.id;
        this.infiniteId += 1;
      }
    }
  }
};
</script>