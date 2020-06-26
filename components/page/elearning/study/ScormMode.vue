<template>
  <div class="es-scorm-mode">
    <iframe class="es-scorm-mode__iframe" :src="scormItemActive"></iframe>

    <nav
      class="es-scorm-mode__menu"
      :class="{ show: showMenu }"
      v-if="scormItems.length > 1"
    >
      <h3 class="es-scorm-mode__heading" @click="showMenu = !showMenu">
        <button class="es-scorm-mode__button">
          <IconViewAgenda class="icon fill-opacity-1" />
        </button>
        <span class="es-scorm-mode__title">Danh mục</span>
      </h3>

      <ul class="es-scorm-mode__menu-list">
        <li v-for="(item, index) in scormItems" :key="index">
          <a
            @click="setElearningStudyScormItemActive(item); activeIndex=index"
            :class="{ active: index == activeIndex }"
            >Bài học {{ index + 1 }}</a
          >
        </li>
        <!-- <li><a href="" class="active">Tên bài học 2</a></li>
        <li><a href="">Tên bài học 3</a></li>
        <li><a href="">Tên bài học 4</a></li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
import IconViewAgenda from "~/assets/svg/v2-icons/view_agenda_24px.svg?inline";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    IconViewAgenda
  },

  data() {
    return {
      showMenu: false,
      // activeLink: "",
      activeIndex: ""
    };
  },

  computed: {
    ...mapState("elearning/study/study", ["scormItems", "scormItemActive"])
  },

  methods: {
    ...mapMutations("elearning/study/study", [
      "setElearningStudyScormItemActive",
    ]),

    // setLink(_link, _idx) {
    //   this.activeLink = _link;
    //   this.activeIndex = _idx;
    // }
  },

  watch: {
    scormItems(_newVal) {
      console.log("[scormItems] watch", _newVal);
      if (_newVal && _newVal.length > 0) {
        // this.activeLink = this.scormItems[0];
        this.setElearningStudyScormItemActive(this.scormItems[0]);
        // this.activeLink = 'https://s3.cloud.cmctelecom.vn/dev-elearning-schoolly/scorm/20200614033505747_87732c048af8261c73eebc9f3c3152b84768ef0eed6b30bc539f8832ac1fc128/3-Nguyen%20Thi%20Thuy%20Tam-DINH%20DANG%20VAN%20BAN%20(Tin%20hoc%206)/SCORM.htm';
        // this.activeLink = 'https://s3.cloud.cmctelecom.vn/dev-elearning-schoolly/scorm/20200613105439191_8755785606fd58d3ec8d8906494569d8ebd77bf6fa50483c79fb0f52c8264e38/scorm_multi/Playing/Playing.html';
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_scorm-mode.scss";
</style>
