import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const api = 'https://recruting-test-api.herokuapp.com/api/v1';

export default new Vuex.Store({
  state: {
    fetchData: [],
    deleteId: '',
    search: {
      searchKey: '',
    },
  },
  mutations: {
    addData: (state, data) => {
      state.fetchData = data;
    },
    deleteCurrentBrand: (state, id) => {
      // eslint-disable-next-line no-underscore-dangle
      const index = state.fetchData.findIndex((brand) => brand._id === id);
      state.fetchData.splice(index, 1);
    },
    addDataArray: (state, brand) => {
      state.fetchData.push(brand);
    },
  },
  actions: {
    GET_ARRAY_DATA({ commit }) {
      return axios.get(`${api}/brands`).then((res) => {
        commit('addData', res.data);
      });
    },
    POST_CREATE_BRAND({ commit }, params) {
      return axios.post(`${api}/brands`, params).then(
        () => {
          commit('addDataArray', params);
        },
      );
    },
    DELETE_BRAND({ commit }, id) {
      return axios.delete(`${api}/brand/${id}`).then(
        () => {
          commit('deleteCurrentBrand', id);
        },
      );
    },
    // eslint-disable-next-line no-unused-vars
    PUT_UPDATE_BRAND({ commit }, item) {
      // eslint-disable-next-line no-underscore-dangle
      return axios.put(`${api}/brand/${item._id}`, { title: item.title, main: item.main });
    },
  },
  getters: {
    listData(state) {
      return state.fetchData;
    },
    DeleteId(state) {
      return state.deleteId;
    },
    SearchKey(state) {
      return state.search;
    },
  },
  modules: {
  },
});
