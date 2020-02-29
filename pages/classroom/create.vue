<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <create-aside
          :active="actived"
          @selectMenu="changeContent"
        />
      </div>
      <div class="col-md-9">
        <div class="elearning-manager-content">
          <keep-alive>
            <component
              :is="currentContent"
            >
            </component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CreateAside from "~/components/page/classroom/create/CreateAside"
  import {mapState} from "vuex";
  import * as actionTypes from "~/utils/action-types";

  const CreateClassroom = () => import("~/components/page/classroom/create/CreateClassroom")

  export default {
    layout: 'create',
    components: {
      CreateAside,
      CreateClassroom
    },

    data() {
      return {
        actived: 'classroom'
      }
    },
    computed: {
      currentContent: function() {
        const MATCHED_CONTENT = {
          classroom: 'CreateClassroom'
        }
        return MATCHED_CONTENT[this.actived]
      }
    },

    methods: {
      changeContent(data) {
        this.actived = data
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/elearning/manager/_elearning-manager-content.scss";
</style>