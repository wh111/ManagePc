import Cookies from 'js-cookie'

let state = {
    info: null, // 用户基本信息
    role: [] // 用户权限
};
let mutations = {
    updateInfo: (state, info = null) => state.info = info,
    updateRole: (state, role) => state.role = role,
    destroy: state => {
        state.info = null;
        state.role = [];
    }
};
let actions = {};
let getters = {
    info: (state, getters) => key => {
        return key && state.info instanceof Object && state.info[key] || state.info
    },
    role: state => state.role
};

export {state, mutations, getters, actions}
