import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Cart from "../services/Cart";

/**
 * initial state
 */
const state = () => ({
  carts: []
});

/**
 * initial getters
 */
const getters = {
  cartCheckout: state => {
    const items = state.carts.map(it => {
      return {
        elearning_id: it.elearning_id,
        price: it.price
      };
    });
    const totalCost = items.reduce((a, c) => a + c.price, 0);
    return {
      cost: totalCost,
      method: "",
      note: "note",
      orders: items
    };
  }
};

const actions = {
  async [actionTypes.CART.LIST]({ commit }, params) {
    try {
      const options = { params };
      const result = await new Cart(this.$axios)[actionTypes.BASE.LIST](
        options
      );

      console.log("[CART.LIST] list", result);
      commit(mutationTypes.CART.SET_CART_LIST, result.data.content);
      return result;
    } catch (error) {
      console.log("[CART.LIST] list.error", error);
      return error;
    }
  },

  async [actionTypes.CART.ADD]({ commit }, payload) {
    try {
      const result = await new Cart(this.$axios)[actionTypes.BASE.ADD](payload);
      console.log("[CART.ADD]", result);
      return result;
    } catch (error) {
      console.log("[CART.ADD] error", error);
      return error;
    }
  },

  async [actionTypes.CART.DELETE]({ commit }, payload) {
    try {
      const result = await new Cart(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      console.log("[CART.DELETE]", result);
      return result;
    } catch (error) {
      console.log("[CART.DELETE] error", error);
      return error;
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.CART.SET_CART_LIST](state, _cartList) {
    console.log("SET_CART_LIST", _cartList);
    state.carts = _cartList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
