<template>
  <div>
      <div class="d-flex mb-4">
        <h3>Môn học</h3>
        <div class="ml-auto d-flex">
            <div class="swiper-pagination eh-subject-pagination"></div>
        </div>
      </div>
      <AppCarouseSchool
        :options="{ slidesPerView: 6, spaceBetween: 22, preventClicksPropagation: false,pagination:true }"
        > 
         <template slot="default" slot-scope="{ classes }">
             <div v-for="(item,index) in votedSubjects.content" :key="index" :class="classes">
                <div class="subject-item">
                    <component :is="checkSubjectIcon(item.code)" />
                    <p class="mt-2">{{item.name}}</p>
                </div>
            </div>
         </template>
      </AppCarouseSchool>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { SUBJECT_CODE } from "~/utils/constants";
import AppCarouseSchool from "~/components/page/school/AppCarouseSchool";

const IconDefaultSubject = () =>
  import("~/assets/svg/icons/default-subject.svg?inline");
const IconSubjectMath = () =>
  import("~/assets/svg/icons/subject-math.svg?inline");
const IconSubjectPhysical = () =>
  import("~/assets/svg/icons/subject-physical.svg?inline");
const IconSubjectChemistry = () =>
  import("~/assets/svg/icons/subject-chemistry.svg?inline");
const IconSubjectForeignLanguage = () =>
  import("~/assets/svg/icons/subject-foreign-language.svg?inline");
const IconSubjectLiterature = () =>
  import("~/assets/svg/icons/subject-literature.svg?inline");
const IconSubjectBiology = () =>
  import("~/assets/svg/icons/subject-biology.svg?inline");
const IconSubjectGeography = () =>
  import("~/assets/svg/icons/subject-geography.svg?inline");
const IconSubjectHistory = () =>
  import("~/assets/svg/icons/subject-history.svg?inline");
const IconSubjectInformatics = () =>
  import("~/assets/svg/icons/subject-informatics.svg?inline");
const IconSubjectTechnology = () =>
  import("~/assets/svg/icons/subject-technology.svg?inline");
const IconSubjectFineArt = () =>
  import("~/assets/svg/icons/subject-fine-art.svg?inline");
const IconSubjectCivicEducation = () =>
  import("~/assets/svg/icons/subject-civic-education.svg?inline");
const IconSubjectMusic = () =>
  import("~/assets/svg/icons/subject-music.svg?inline");
const IconSubjectScience = () =>
  import("~/assets/svg/icons/subject-science.svg?inline");
import IconChevronLeft24px from '~/assets/svg/v2-icons/chevron_left_24px.svg?inline';
import IconChevronRight24px from '~/assets/svg/v2-icons/chevron_right_24px.svg?inline';
export default {
    components:{
        IconChevronLeft24px,
        IconChevronRight24px,
        AppCarouseSchool
    },
  
  computed:{
      ...mapState("elearning/public/public-voted-subjects", ["votedSubjects"]),
  },
  created(){
      this.fetchSubject();
  },
  methods:{
      async fetchSubject(){
          const res = await this.$store.dispatch(
        `elearning/public/public-voted-subjects/${actionTypes.ELEARNING_PUBLIC_VOTED_SUBJECTS.LIST}`
      );
      },
      checkSubjectIcon(code) {
      switch (code) {
        case SUBJECT_CODE.MATHS:
          return IconSubjectMath;
          break;
        case SUBJECT_CODE.PHYSICS:
          return IconSubjectPhysical;
          break;
        case SUBJECT_CODE.CHEMISTRY:
          return IconSubjectChemistry;
          break;
        case SUBJECT_CODE.FOREIGN_LANGUAGE:
          return IconSubjectForeignLanguage;
          break;
        case SUBJECT_CODE.LITERATURE:
          return IconSubjectLiterature;
          break;
        case SUBJECT_CODE.BIOLOGY:
          return IconSubjectBiology;
          break;
        case SUBJECT_CODE.GEOGPRAPHY:
          return IconSubjectGeography;
          break;
        case SUBJECT_CODE.HISTORY:
          return IconSubjectHistory;
          break;
        case SUBJECT_CODE.INFORMATICS:
          return IconSubjectInformatics;
          break;
        case SUBJECT_CODE.TECHNOLOGY:
          return IconSubjectTechnology;
          break;
        case SUBJECT_CODE.FINE_ART:
          return IconSubjectFineArt;
          break;
        case SUBJECT_CODE.CIVIC_EDUCATION:
          return IconSubjectCivicEducation;
          break;
        case SUBJECT_CODE.MORAL:
          return IconSubjectCivicEducation;
          break;
        case SUBJECT_CODE.MUSIC:
          return IconSubjectMusic;
          break;
        case SUBJECT_CODE.SCIENCE:
          return IconSubjectScience;
          break;
        default:
          return IconDefaultSubject;
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.subject-item{
    border: 1px solid #E0E0E0;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 161px;
    height: 145px;
    flex-direction: column;
}

</style>