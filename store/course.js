import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Summary from "../services/elearning/Summary";

const cources = [
  {
    id: "1",
    name: "Nền tảng tiếng Anh cho người mới bắt đầu",
    image: "https://picsum.photos/259/155",
    tag: "Ngoại ngữ",
    price: "219000",
    off: "70"
  },
  {
    id: "1",
    name: "Nền tảng tiếng Anh cho người mới bắt đầu",
    image: "https://picsum.photos/259/155",
    tag: "Ngoại ngữ",
    price: "219000",
    off: "70"
  },
  {
    id: "1",
    name: "Nền tảng tiếng Anh cho người mới bắt đầu",
    image: "https://picsum.photos/259/155",
    tag: "Ngoại ngữ",
    price: "219000",
    off: "70"
  },
  {
    id: "1",
    name: "Nền tảng tiếng Anh cho người mới bắt đầu",
    image: "https://picsum.photos/259/155",
    tag: "Ngoại ngữ",
    price: "219000",
    off: "70"
  },
  {
    id: "1",
    name: "Nền tảng tiếng Anh cho người mới bắt đầu",
    image: "https://picsum.photos/259/155",
    tag: "Ngoại ngữ",
    price: "219000",
    off: "70"
  },
  {
    id: "1",
    name: "Nền tảng tiếng Anh cho người mới bắt đầu",
    image: "https://picsum.photos/259/155",
    tag: "Ngoại ngữ",
    price: "219000",
    off: "70"
  }
];

/**
 * initial state
 */
const state = () => ({
  earningSummaryList: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_SUMMARY.LIST]({ commit }, payload) {
    commit(mutationTypes.ELEARNING_SUMMARY.SET_ELEARNING_SUMMARY_LIST, cources);
    // try {
    //   const result = await new Summary(this.$axios)[actionTypes.BASE.LIST](
    //     payload
    //   );
    //   console.log("[Summary] list", result);
    //   // set to mutation
    //   commit(mutationTypes.EARNING_SUMMARY.SET_EARNING_SUMMARY_LIST, result);
    // } catch (error) {
    //   console.log("[Summary] list.error", error);
    //   return error;
    // }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_SUMMARY.SET_ELEARNING_SUMMARY_LIST](
    state,
    _earningSummaryList
  ) {
    console.log("SET_EARNING_SUMMARY_LIST", _earningSummaryList);
    state.earningSummaryList = _earningSummaryList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
