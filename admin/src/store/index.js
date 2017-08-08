import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        siteInfo: {
            siteInfo: {},
            list: [],
            curr: {},
            user: {}
        }
    },

    actions: {
        GET_IMAGE_HEIGHT: ({ commit, state }, { url }) => {
            return api.getImageHeight(url).then(data => data.height || 100)
        },

        FETCH: ({ commit, state }, { model, query }) => {
            return api.fetchList(model, query)
        },

        FETCH_BY_ID: ({ commit, state }, { model, id, query }) => {
            return api.fetchByID(model, id, query)
        },
        FETCH_LIST: ({ commit, state }, { model, query }) => {
            return api.fetchList(model, query).then(obj => {
                commit('SET_LIST', { obj })
            })
        }
    },
    mutations: {},
    getters: {}
})

export default store