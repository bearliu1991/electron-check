import Http from '@/assets/js/public'
import Path from '@/assets/js/path'

const state = {
  updateData : null
}

const mutations = {
  GET_UPDATA (state, data) {
    state.updateData = data
  },
}

const getters = {

}

const actions = {
  getUpdateDate ({ commit }) {
    Http.httpGet(Path.UPDATE)
      .then((res) => {
        commit('GET_UPDATA', res.data)
      })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
