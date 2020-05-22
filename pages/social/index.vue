<template>
  <div class="page-social container">
    <div class="row">
      <div class="col page-social__col-menu">
        <div
          v-sticky
          sticky-offset="{ top: 101 }"
          :sticy-z-index="9"
          class="timeline-aside-wrapper"
        >
          <SocialMenu />
        </div>
      </div>

      <div class="col page-social__col-content">
        <nuxt-child />
      </div>

      <div class="col-md-3">
        <div
          v-sticky
          sticky-offset="{ top: 101 }"
          :sticy-z-index="9"
          class="timeline-aside-wrapper"
        >
          <AsideBox :title="`Tin nhắn`" link="/messages" linkText="Xem toàn bộ >>">
            <app-content-box
              v-for="message in messagesConverted"
              v-bind="message"
              class="mb-4"
              nuxt
              size="sm"
              :key="message.id"
              :to="`/messages/t/${message.id}`"
            />
          </AsideBox>

          <AsideBox title="Khóa học Online nổi bật">
            <div class="timeline-aside-tabs">
              <a href :class="{ active: coursesTab === 0 }" @click.prevent="coursesTab = 0">Miễn phí</a>
              <a href :class="{ active: coursesTab === 1 }" @click.prevent="coursesTab = 1">Trả phí</a>
            </div>

            <div class="time-aside-tabs-content">
              <div v-show="coursesTab === 0" class="timeline-aside-tab-pane">
                <app-content-box
                  v-for="item in freeCourses"
                  :key="item.id"
                  class="align-items-center"
                  size="sm"
                  :image="get(item, 'avatar.low', null)"
                >
                  <n-link slot="image" :to="`/elearning/${item.id}`">
                    <img :src="item.image" :alt="item.name" />
                  </n-link>

                  <n-link slot="title" :to="`/elearning/${item.id}`">{{ item.name }}</n-link>

                  <n-link slot="desc" to>{{ get(item, 'teacher.name', null) }}</n-link>
                </app-content-box>
              </div>

              <div v-show="coursesTab === 1" class="timeline-aside-tab-pane">
                <app-content-box
                  v-for="item in privateCourses"
                  :key="item.id"
                  class="align-items-center"
                  size="sm"
                  :image="get(item, 'avatar.low', null)"
                >
                  <n-link slot="image" :to="`/elearning/${item.id}`">
                    <img :src="item.image" :alt="item.name" />
                  </n-link>

                  <n-link slot="title" :to="`/elearning/${item.id}`">{{ item.name }}</n-link>

                  <n-link slot="desc" to>{{ get(item, 'teacher.name', null) }}</n-link>
                </app-content-box>
              </div>

              <div class="text-center mt-4">
                <app-button class="timeline-aside-btn" nuxt to="/elearning">Xem Tất Cả</app-button>
              </div>
            </div>
          </AsideBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import LimitMessagesSerice from "~/services/message/LimitMessages";
import SearchService from "~/services/elearning/public/Search";
import SocialMenu from "~/components/page/social/SocialMenu";
import AsideBox from "~/components/layout/asideBox/AsideBox";

export default {
  middleware: "authenticated",

  components: {
    SocialMenu,
    AsideBox
  },

  async asyncData({ $axios, error }) {
    try {
      const getMessages = () =>
        new LimitMessagesSerice($axios)[actionTypes.BASE.LIST]();
      const getFreeCourse = () =>
        new SearchService($axios)[actionTypes.BASE.ADD]({
          free: true,
          limit: 5
        });
      const getPrivateCourse = () =>
        new SearchService($axios)[actionTypes.BASE.ADD]({
          free: false,
          limit: 5
        });

      const [
        // { data: feeds = {} },
        { data: messages = [] },
        { data: freeCourses = [] },
        { data: privateCourses = [] }
      ] = await Promise.all([
        getMessages(),
        getFreeCourse(),
        getPrivateCourse()
      ]);

      return {
        // feeds: feeds || [],
        messages: messages || [],
        freeCourses: freeCourses.content || [],
        privateCourses: privateCourses.content || []
      };
    } catch (e) {
      error({ statusCode: e.status, message: e.message });
    }
  },

  data() {
    return {
      // Course tabs
      coursesTab: 0,
      coursesTabsList: [
        {
          text: "Miễn phí",
          value: 0
        },
        {
          text: "Trả phí",
          value: 1
        }
      ]
    };
  },

  computed: {
    messagesConverted() {
      return this.messages && this.messages.length
        ? this.messages.map(item => {
            return {
              id: item.room.id,
              title: item.room.members
                .filter(member => member.user_id !== this.userId)
                .map(member => member.fullname)
                .join(", "),
              desc: item.message.content,
              image: get(item, "room.room_avatar.low", null)
            };
          })
        : [];
    }
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/pages/social/_timeline.scss";
</style>