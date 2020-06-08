<template>
  <div class="col-md-12 message-chat__content">
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
            @change="changeUser"
            @visible-change="handleFriendsVisibleChange"
          >
            <div slot="option" slot-scope="{ option }" class="d-flex align-items-center">
              <!-- @click.prevent="changeUserChat(option)" -->
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

      <div class="aside-box__top" v-if="!isCreated">
        <div class="message-desc" v-if="!checkId">
          <div class="message-decs__image">
            <app-avatar
              :src="avatarSrc ? avatarSrc : 'https://picsum.photos/60/60'"
              class="comment-item__avatar"
            />
          </div>
          <div class="message-decs__title">
            <span>{{nameRoom}}</span>
            <p class="text-base">Đang hoạt động</p>
          </div>
        </div>
        <div class="message-tool" v-if="!checkId">
          <ul class="list-unstyle">
            <li>
              <a href="#">
                <IconPhone width="18px" height="18px" class="fill-primary" />
              </a>
            </li>
            <li>
              <a href="#">
                <IconVideo width="18px" height="18px" class="fill-primary" />
              </a>
            </li>
            <li>
              <!-- @click="visibleAddByPhone = true" -->
              <a href="#" @click="showInfo = !showInfo">
                <IconExclamationCircle width="18px" height="18px" class="fill-primary" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style="opacity: 0; height: 0; overflow: hidden">
        <!-- <client-only>
          <infinite-loading
            direction="top"
            :identifier="infiniteId"
            @infinite="messageInfiniteHandler"
          >
            <template slot="no-more">Không còn tin nhắn.</template>
          </infinite-loading>
        </client-only>-->
      </div>

      <div
        class="aside-box__content"
        id="content-message"
        :class="{'padding-show-info': showInfo}"
        v-if="!checkList"
      >
        <!-- <h4 style="margin-top:10px; text-align:center">Chức năng đang phát triển</h4> -->
        <client-only>
          <infinite-loading
            direction="top"
            @infinite="messageInfiniteHandler"
            :identifier="infiniteId"
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
            :class="item && item.user_id == userId ? 'item__0' : 'item__1'"
            v-for="(item, index) in filterMessageList"
            :key="index"
          >
            <!-- v-show="item.content || (item.img_url && item.img_url.low) || item.file_url" -->
            <div class="message-box__item__content">
              <div class="message-box__item__meta" v-if="index == 0">
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
                  </app-dropdown>
                </div>
                <div class="message-box__item__meta__desc">
                  <span>{{item.user && item.user.full_name}}</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>{{item.sent_at | moment("hh:mm A") }}</span>
                </div>
              </div>
              <div
                class="message-box__item__meta"
                v-else-if="index > 0 && index == filterMessageList.length -1 && filterMessageList[index].user_id != filterMessageList[index-1].user_id"
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
                  </app-dropdown>
                </div>
                <div class="message-box__item__meta__desc">
                  <span>{{item.user && item.user.full_name}}</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>{{item.sent_at | moment("hh:mm A") }}</span>
                </div>
              </div>
              <div class="message-box__item__meta" v-else-if="item.check">
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
                  </app-dropdown>
                </div>
                <div class="message-box__item__meta__desc">
                  <span>{{item.user && item.user.full_name}}</span>
                </div>
                <div class="message-box__item__meta__time">
                  <span>{{item.sent_at | moment("hh:mm A") }}</span>
                </div>
              </div>
              <template>
                <!-- v-if="item.content && item.img_url && item.img_url.low || item.content && item.file_url" -->
                <div class="message-box__item__desc">
                  <div class="message-box__item__desc__text">
                    <p>{{item.text}}</p>
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
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="aside-box__content" v-else></div>

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
              <template v-if="item.image">
                <button class="btn-remove" @click="removeImgSrc" title="Remove">
                  <IconClose class="fill-white" />
                </button>
                <img :src="item.src" />
              </template>
              <div v-else class="item-file">
                <button class="btn-remove" @click="removeImgSrc" title="Remove">
                  <IconClose class="fill-666" />
                </button>
                <div class="icon">
                  <IconFileAlt class="fill-primary" />
                </div>
                <span>{{item.src}}</span>
              </div>
            </div>
          </div>

          <div class="input-chat">
            <div class="app-files">
              <label for="files">
                <IconImage width="15" height="15" class="fill-white" />
              </label>

              <input type="file" id="files" name="files" multiple @change="handleUploadChange2" />
            </div>

            <app-input
              class="mb-0 w-100 bg-light chat-message"
              v-model="textChat"
              @keyup.enter.native="handleEmitMessage"
              placeholder="Nhập tin nhắn..."
            >
              <template #append-inner>
                <IconSmile width="16" height="16" class="fill-primary mr-3" />
              </template>
            </app-input>

            <button class="bg-primary button-send">
              <IconSend24px width="15" height="15" class="fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="animated faster fadeInRight"
      leave-active-class="animated faster fadeOutRight"
    >
      <TabInfo v-if="showInfo" />
    </transition>

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
import TabInfo from "~/components/page/chat/TabInfo";

import IconPhone from "~/assets/svg/v2-icons/phone_24px.svg?inline";
import IconVideo from "~/assets/svg/v2-icons/videocam_24px.svg?inline";
// import IconAddUser from "~/assets/svg/icons/add-user-green.svg?inline";
import IconSmile from "~/assets/svg/icons/smile.svg?inline";
import IconImage from "~/assets/svg/design-icons/image-v.svg?inline";
import IconUpload from "~/assets/svg/icons/upload.svg?inline";
import IconReply from "~/assets/svg/icons/reply.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import IconFileAlt from "~/assets/svg/design-icons/file-alt.svg?inline";
import IconExclamationCircle from "~/assets/svg/design-icons/exclamation-circle.svg?inline";
import IconSend24px from "~/assets/svg/v2-icons/send_24px.svg?inline";

import Message from "~/services/message/Message";
import * as actionTypes from "~/utils/action-types";
import * as constants from "~/utils/constants";
import { cloneDeep } from "lodash";

export default {
  components: {
    IconPhone,
    IconVideo,
    // IconAddUser,
    IconSmile,
    IconImage,
    IconReply,
    IconUpload,
    IconDots,
    IconClose,
    IconCamera,
    IconFileAlt,
    ModalAddFriend,
    ModalAddFriendByGroup,
    IconExclamationCircle,
    IconSend24px,
    TabInfo
  },

  props: {
    checkId: {
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
      checkList: false,
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
      urlFileUpload: "",
      urlFileNameUpload: "",
      messageId: "",
      name: "",
      roomIdPush: "",
      fileList: [],
      dataCheck: false,
      // avatarUser: {},
      // fullname: "",
      showInfo: false,
      messageQuery: {
        from_message_id: null,
        fetch_type: null
      },
      infiniteId: +new Date()
    };
  },

  computed: {
    ...mapState("social", [{ labelList: "labels" }]),
    ...mapState("message", ["groupListDetail", "friendList", "isCreated"]),
    ...mapState("chat", [
      "messageList",
      "memberList",
      "roomDetail",
      "stateIdPush",
      "messageRes",
      "messageOn"
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
        this.friendList &&
        this.friendList.listFriend &&
        this.friendList.listFriend.map(item => ({
          ...item,
          value: item.id,
          text: item.fullname,
          avatar: item.avatar
        }))
      );
    },
    nameRoom() {
      const data = this.roomDetail ? this.roomDetail.room_data : {};
      const dataTotal = this.roomDetail ? this.roomDetail.total_member : 0;
      if (data && data.type == constants.CHAT.PUBLIC_GROUP) {
        if (dataTotal > 3) {
          return data.name + ", " + (dataTotal - 3) + " người khác";
        } else {
          return data.name;
        }
      } else if (data && data.type == constants.CHAT.PRIVATE_GROUP) {
        const [dataFilterMember] =
          this.memberList &&
          this.memberList.filter(item => item.int_id.low != this.userId);
        return dataFilterMember ? dataFilterMember.full_name : "";
      }
      // console.log("this.memberList", this.memberList);
      // const dataMember =
      //   this.memberList && this.memberList.listMember
      //     ? this.memberList.listMember
      //     : [];
      // const dataTotal =
      //   this.memberList &&
      //   this.memberList.page &&
      //   this.memberList.page.total_elements
      //     ? this.memberList.page.total_elements
      //     : "";
      // if (this.groupListDetail.room && this.groupListDetail.room.type == 1) {
      //   const [dataFilterMember] = dataMember.filter(
      //     item => item.id != this.userId
      //   );
      //   return dataFilterMember && dataFilterMember.fullname
      //     ? dataFilterMember.fullname
      //     : "";
      // } else if (
      //   this.groupListDetail.room &&
      //   this.groupListDetail.room.type == 2
      // ) {
      //   const filterMemberUserId = dataMember.filter(
      //     item => item.id != this.userId
      //   );
      //   let dataNameGroup = "";
      //   if (filterMemberUserId.length < 4) {
      //     dataNameGroup = filterMemberUserId
      //       .reduce((acc, cor) => {
      //         acc.push(cor.fullname);
      //         return acc;
      //       }, [])
      //       .join(", ");
      //   } else {
      //     dataNameGroup =
      //       filterMemberUserId[0].fullname +
      //       ", " +
      //       filterMemberUserId[1].fullname +
      //       ", " +
      //       filterMemberUserId[2].fullname +
      //       " và " +
      //       (dataTotal - 4).toString() +
      //       " người khác";
      //   }
      //   return this.groupListDetail.room.room_name
      //     ? this.groupListDetail.room.room_name
      //     : dataNameGroup;
      // }
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
        return this.groupListDetail.room.room_avatar &&
          this.groupListDetail.room.room_avatar.low
          ? this.groupListDetail.room.room_avatar.low
          : "https://picsum.photos/40/40";
      }
    },
    filterMessageList() {
      const dataMap = this.messagesList.map(item => {
        const [tmpUser] =
          this.memberList &&
          this.memberList.filter(i => i.id == item.sender_id);
        return {
          ...item,
          user: tmpUser,
          user_id: tmpUser ? tmpUser.int_id.low : ""
        };
      });
      let filterData = [];
      dataMap.forEach((i, index) => {
        if (index == 0 || index == dataMap.length - 1) {
          filterData.push({
            ...i
          });
        } else {
          const dataCheckIndex =
            dataMap[index].user_id != dataMap[index - 1].user_id ? true : false;
          filterData.push({
            ...i,
            check: dataCheckIndex
          });
        }
      });
      console.log("filterData", filterData);
      return filterData;
    }
  },

  methods: {
    ...mapActions("message", [
      "messageSendImg",
      "accountPersonalList",
      "createGroup",
      "getGroupList",
      "getMessageList",
      "getGroupListDetail",
      "messageSendFile",
      "getListMessageType"
    ]),
    ...mapActions("chat", ["getRoomList"]),
    ...mapMutations("message", ["emitCloseFalse", "setIsCreated"]),
    ...mapMutations("chat", ["setMessageList", "setEmitMessage"]),
    async messageInfiniteHandler($state) {
      const room_id = this.$route.params.id;
      const query = this.messageQuery;
      if (room_id) {
        this.checkList = false;
        const getData = await this.$store.dispatch(
          `chat/${actionTypes.CHAT.MESSAGE_LIST_INFINITE}`,
          {
            params: this.messageQuery,
            id: room_id,
            end: "messages"
          }
        );
        console.log("getData Message", getData);
        if (getData && getData.length == 0 && this.messagesList.length == 0) {
          this.checkList = true;
        }
        // console.log("getData id", getData[getData.length - 1].id);
        if (getData && getData.length) {
          this.messageQuery.from_message_id = getData[0].id;
          this.messageQuery.fetch_type = "prior";
          const dataClone = cloneDeep(getData);
          // this.messagesList.push(...dataClone.reverse());
          if (this.messagesList.length >= 30) {
            this.messagesList = dataClone.reverse().concat(this.messagesList);
          } else {
            this.messagesList.push(...getData);
          }

          $state.loaded();
        } else {
          $state.complete();
        }
      } else {
        this.checkList = true;
        $state.complete();
      }
    },
    reply() {
      this.isReply = true;
    },

    foward() {},

    handleUploadChange2(fileList, event) {
      this.urlFileNameUpload = "";
      this.urlEmitMessage = "";
      this.urlFileUpload = "";
      let listFile = fileList.target.files;
      this.listImage = Array.from(listFile);
      // this.fileList = fileList;

      // this.listImage.forEach(element => {
      //   });
      this.fileList = listFile;
      if (this.listImage[0]) {
        const fileType = this.listImage[0]["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        this.dataCheck = validImageTypes.includes(fileType);
        getBase64(this.listImage[0], src => {
          // this.dataCheck = checkImage;
          this.listImgSrc = [
            {
              src: this.dataCheck ? src : this.listImage[0].name,
              image: this.dataCheck
            }
          ];
        });
      }
    },

    async uploadFile() {
      const body = new FormData();
      if (this.listImage[0]) {
        if (this.dataCheck) {
          body.append("msg_image", this.fileList[0]);
          body.append("room_id", this.$route.params.id);
          await this.messageSendImg(body).then(result => {
            console.log("[sendFile]", result);
            if (result.success == true) {
              this.urlEmitMessage =
                result.data &&
                result.data.full_img_url &&
                result.data.full_img_url.low
                  ? result.data.full_img_url.low
                  : "";
              this.messageId =
                result.data && result.data.message_id
                  ? result.data.message_id
                  : "";
            }
          });
        } else {
          body.append("file_upload", this.fileList[0]);
          body.append("room_id", this.$route.params.id);
          await this.messageSendFile(body).then(result => {
            console.log("[sendFile]", result);
            this.urlFileUpload =
              result.data && result.data.file_url ? result.data.file_url : "";
            this.urlFileNameUpload =
              result.data && result.data.file_name_upload
                ? result.data.file_name_upload
                : "";
            this.messageId =
              result.data && result.data.message_id
                ? result.data.message_id
                : "";
          });
        }
      }
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
      const dataEmit = {
        room_id: this.$route.params.id,
        text: this.textChat
      };
      this.setEmitMessage(dataEmit);
      this.getRoomList();
      this.textChat = "";
      const el = document.getElementById("content-message");
      if (el.scrollTop != el.scrollHeight) {
        el.scrollTop = el.scrollHeight;
      }
      // this.emitCloseFalse(false, this.isGroup);
      // await this.uploadFile();
      // if (this.tag.length == 0) {
      //   if (
      //     this.textChat != "" ||
      //     (this.urlEmitMessage && this.urlEmitMessage != "") ||
      //     (this.urlFileUpload && this.urlFileNameUpload)
      //   ) {
      //     const dataEmit = {
      //       room_id: this.$route.params.id,
      //       content: this.textChat,
      //       img_url: { low: this.urlEmitMessage },
      //       file_url: this.urlFileUpload,
      //       file_name_upload: this.urlFileNameUpload,
      //       message_id: this.messageId,
      //       avatar:
      //         this.avatarUser && this.avatarUser.low ? this.avatarUser.low : "",
      //       fullname: this.fullName ? this.fullName : ""
      //     };
      //     console.log("[socket] dataEmit", dataEmit);
      //     this.setEmitMessage(dataEmit);
      //     // if img or file call api group detail
      //     if (
      //       (this.urlEmitMessage && this.urlEmitMessage != "") ||
      //       (this.urlFileUpload && this.urlFileNameUpload)
      //     ) {
      //       this.getGroupListDetail({
      //         params: {
      //           room_id: this.$route.params.id
      //         }
      //       });
      //     }
      //   }
      //   this.textChat = "";
      // } else if (this.tag.length == 1) {
      //   this.setIsCreated(false);
      //   this.$router.push(`/messages/t/${this.roomIdPush}`);
      //   const dataEmit = {
      //     room_id: this.roomIdPush,
      //     content: this.textChat,
      //     img_url: { low: this.urlEmitMessage },
      //     file_url: this.urlFileUpload,
      //     file_name_upload: this.urlFileNameUpload,
      //     message_id: this.messageId,
      //     avatar:
      //       this.avatarUser && this.avatarUser.low ? this.avatarUser.low : "",
      //     fullname: this.fullName ? this.fullName : ""
      //   };
      //   console.log("[socket] dataEmit", dataEmit);
      //   this.setEmitMessage(dataEmit);
      //   this.getListMessageType({
      //     params: {
      //       room_type: 1,
      //       payloadCheck: "check"
      //     }
      //   });
      // } else if (this.tag.length > 1) {
      //   const data = {
      //     type: 2,
      //     members: this.tag.toString(),
      //     name: this.name ? this.name : ""
      //   };
      //   await this.createGroup(data).then(result => {
      //     if (result.success == true) {
      //       this.setIsCreated(false);
      //       this.getListMessageType({
      //         params: {
      //           room_type: 2,
      //           payloadCheck: "check"
      //         }
      //       });
      //       // this.getGroupList();
      //       this.$toasted.show("success");
      //       this.$router.push(`/messages/t/${result.data.id}`);
      //       const dataEmit = {
      //         room_id: result.data.id,
      //         content: this.textChat,
      //         img_url: { low: this.urlEmitMessage },
      //         file_url: this.urlFileUpload,
      //         file_name_upload: this.urlFileNameUpload,
      //         message_id: this.messageId,
      //         avatar:
      //           this.avatarUser && this.avatarUser.low
      //             ? this.avatarUser.low
      //             : "",
      //         fullname: this.fullName ? this.fullName : ""
      //       };
      //       console.log("[socket] dataEmit", dataEmit);
      //       this.setEmitMessage(dataEmit);
      //     } else {
      //       this.$toasted.error(result.message);
      //     }
      //   });
      // }
      // this.removeImgSrc();
    },
    changeUser() {
      console.log("[option]", this.tag.length);
      if (this.tag.length == 0) {
        this.roomIdPush = "";
        this.getMessageList({
          params: {
            room_id: this.$route.params.id
          }
        });
      } else if (this.tag.length == 1) {
        const data = {
          type: 1,
          members: this.tag[0].toString(),
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
            this.$toasted.error(result.message);
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
      this.listImgSrc = [];
    }
  },
  created() {
    this.messageListQuery.room_id = this.$route.params.id;
  },
  watch: {
    messageOn(_newVal) {
      if (_newVal) {
        this.getRoomList();
        console.log("[messageOn]", _newVal);
        // console.log("data", data);
        // this.messagesList.unshift(_newVal);
        this.messagesList.push(_newVal);
        // console.log("[this.messagesList]", this.messagesList);
        // img_url: { low: _newVal.img_url }
      }
    },
    // messageList(_newVal) {
    //   if (_newVal) {
    //     this.messagesList = [];
    //     this.messageListQuery.page = 1;
    //     this.messageListQuery.room_id = this.roomIdPush
    //       ? this.roomIdPush
    //       : this.$route.params.id;
    //     this.infiniteId += 1;
    //   }
    // },
    stateIdPush(_newVal) {
      console.log("[stateIdPush] _newVal", _newVal);
      if (_newVal) {
        // this.setMessageList([]);
        // this.infiniteId += 1;
        // this.messageQuery.from_message_id = null;
        // this.messageQuery.fetch_type = null;
      }
    },
    isCreated(_newVal) {
      console.log("_newVal", _newVal);
      if (_newVal == false && this.tag.length > 0) {
        this.getMessageList({
          params: {
            room_id: this.$route.params.id
          }
        });
      }
    },
    messageRes(_newVal) {
      console.log("_newVal", _newVal);
      if (_newVal) {
        // this.messagesList.unshift(_newVal);
        this.messagesList.push(_newVal);
      }
    }
  }
};
</script>