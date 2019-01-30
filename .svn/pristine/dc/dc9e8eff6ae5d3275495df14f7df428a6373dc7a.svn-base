let state = {
    index: '', // 默认首页
    all: null, // 所有菜单
    pathName: {} // 菜单名称对象
};
let mutations = {
    updateIndex: (state, index) => state.index = index,
    updateAll: (state, all) => state.all = all,
    updatePathName: (state, pathNameObj) => state.pathName = pathNameObj,

    destroy: state => {
        state.index = '';
        state.all = null;
        state.pathName = {}
    }
};
let actions = {};
let getters = {
    index: state => state.index
};

export {state, mutations, getters, actions}