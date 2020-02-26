import Vue from "vue";

import AppButton from "~/components/common/button/AppButton";
import AppDivider from "~/components/common/divider/AppDivider";
import AppContentBox from "~/components/common/contentBox/AppContentBox";
import AppAvatar from "~/components/common/avatar/AppAvatar";
import AppModal from "~/components/common/modal/AppModal";
import AppDropdown from "~/components/common/dropdown/AppDropdown";
import AppSelect from "~/components/common/select/AppSelect";
import AppSelectSex from "~/components/common/select/AppSelectSex";
import AppVideo from "~/components/common/video/AppVideo";
import AppSkeleton from "~/components/common/skeleton/AppSkeleton";
import AppDatePicker from "~/components/common/datepicker/AppDatePicker";
import AppSpin from "~/components/common/spin/AppSpin";
import AppTag from "~/components/common/tag/AppTag";
import AppStars from "~/components/common/stars/AppStars";
import AppInput from "~/components/common/input/AppInput";
import Pagination from "~/components/common/pagination/Pagination";
import AppVueSelect from "~/components/common/select/AppVueSelect";
import AppTable from "~/components/common/table/AppTable";
import AppCheckbox from "~/components/common/checkbox/AppCheckbox";
import AppRadioGroup from "~/components/common/radio/AppRadioGroup";
import AppRadio from "~/components/common/radio/AppRadio";
import AppUpload from "~/components/common/upload/AppUpload";
import AppAlert from "~/components/common/alert/AppAlert";
import _ from "lodash";

Object.defineProperty(Vue.prototype, "$_", { value: _ });

Vue.component("app-button", AppButton);
Vue.component("app-divider", AppDivider);
Vue.component("app-content-box", AppContentBox);
Vue.component("app-avatar", AppAvatar);
Vue.component("app-modal", AppModal);
Vue.component("app-dropdown", AppDropdown);
Vue.component("app-select", AppSelect);
Vue.component("app-select-sex", AppSelectSex);
Vue.component("app-video", AppVideo);
Vue.component("app-skeleton", AppSkeleton);
Vue.component("app-date-picker", AppDatePicker);
Vue.component("app-spin", AppSpin);
Vue.component("app-tag", AppTag);
Vue.component("app-stars", AppStars);
Vue.component("app-input", AppInput);
Vue.component("app-pagination", Pagination);
Vue.component("app-vue-select", AppVueSelect);
Vue.component("app-table", AppTable);
Vue.component("app-checkbox", AppCheckbox);
Vue.component("app-radio-group", AppRadioGroup);
Vue.component("app-radio", AppRadio);
Vue.component("app-upload", AppUpload);
Vue.component("app-alert", AppAlert);
