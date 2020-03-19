<template>
  <div class="col-md-4 message-chat__info">
    <div class="message-info">
      <div class="message-info__acc">
        <div class="message-info__acc__image">
          <app-avatar src="https://picsum.photos/40/40" size="md" class="comment-item__avatar" />
        </div>
        <div class="message-info__acc__title">
          <span>
            <a href="#">Đặng Duy Long</a>
          </span>
        </div>
      </div>
      <div class="message-info__box">
        <h5 class="message-info__box__title">File chia sẻ</h5>
        <div class="message-info__box__content attachment">
          <ul class="list-unstyle" v-for="(item, index) in fileshare" :key="index">
            <li>
              <a :href="item.link">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="message-info__box">
        <h5 class="message-info__box__title">Ảnh chia sẻ</h5>
        <div class="message-info__box__content images-attachment">
          <ul class="list-unstyle">
            <li v-for="(item, index) in imageshare" :key="index">
              <n-link to>
                <img :src="item.image" />
              </n-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="message-info__box" v-if="isGroup">
        <h5 class="message-info__box__title">Thành viên</h5>
        <div class="message-info__box__content">
          <button class="d-flex-center mt-3 mb-3" @click="visibleAddMember = true">
            <IconPlus height="20" width="20" class="mr-3" />Thêm người
          </button>
          <ul class="members">
            <li v-for="(item, index) in memberListTab" :key="index" class="d-flex-center mb-3">
              <app-avatar
                :src="item.avatar && item.avatar.low ? item.avatar.low : ''"
                :size="30"
                class="mr-3"
              />
              <span>{{item.fullname}}</span>
            </li>
            <client-only>
              <infinite-loading :identifier="infiniteId" @infinite="membersInfiniteHandler">
                <template slot="no-more">Không còn thành viên.</template>
              </infinite-loading>
            </client-only>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal add member -->
    <ModalAddMember @close="visibleAddMember = false" v-if="visibleAddMember" />
  </div>
</template>

<script>
// import ModalAddMember from "~/components/page/chat/ModalAddMember";
import ModalAddMember from "~/components/page/chat/ModalAddMemberByGroup";
import * as actionTypes from "~/utils/action-types";
import IconPlus from "~/assets/svg/icons/plus.svg?inline";
import { mapState, mapGetters, mapActions } from "vuex";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import GroupMember from "~/services/message/GroupMember";

export default {
  components: {
    IconPlus,
    ModalAddMember,
    IconDots
  },

  props: {
    fileshare: {
      type: Array,
      default: () => [],
      required: true
    },
    members: {
      type: Array,
      default: () => [],
      required: true
    },
    imageshare: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  data() {
    return {
      isGroup: true,
      visibleAddMember: false,
      dropdownActions: false,
      memberListTab: [],
      infiniteId: +new Date(),
      memberListQuery: {
        page: 1,
        room_id: ""
      }
    };
  },
  created() {},
  computed: {
    ...mapState("message", ["memberList"])
  },
  methods: {
    async membersInfiniteHandler($state) {
      this.memberListQuery.room_id = this.$route.params.id;
      const { data: getData = {} } = await new GroupMember(this.$axios)[
        actionTypes.BASE.LIST
      ]({
        params: this.memberListQuery
      });
      if (getData.listMember && getData.listMember.length) {
        this.memberListQuery.page += 1;
        this.memberListTab.push(...getData.listMember);
        // this.groupsListTab = this.dataPushGroup.map(item => item);
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
};
</script>