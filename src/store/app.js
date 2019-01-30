import Cookies from 'js-cookie';

const state = {
    sidebar: {
        opened: !+Cookies.get('sidebarStatus')
    },
    isLoading: false,
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: [],
    envs: null,
};

const mutations = {
    TOGGLE_SIDEBAR: state => {
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1);
        } else {
            Cookies.set('sidebarStatus', 0);
        }
        state.sidebar.opened = !state.sidebar.opened;
    },
    ADD_VISITED_VIEWS: (state, path) => {
        if (state.visitedViews.some(v => v === path)) return;
        state.visitedViews.push(path)
    },
    DEL_VISITED_VIEWS: (state, path) => {
        let index = state.visitedViews.indexOf(path);
        ~index && state.visitedViews.splice(index, 1);
    },

    /**
     * 设置加载loading
     * @param state
     * @param flag
     */
    setFullLoading: (state, flag) => state.isLoading = flag,

    /**
     * 初始化系统配置
     * @param state
     * @param envs
     */
    initEnvs: (state, envs) => state.envs = envs,

    /**
     * 销毁数据
     * @param state
     */
    destroy: state => {
        state.sidebar = {
            opened: true
        };
        state.isLoading = false;
        state.theme = 'default';
        state.livenewsChannels = [];
        state.visitedViews = [];
        state.envs = null;
    }
};

const getters = {
    /**
     * 根据年级获取科目信息
     * @param index 年级索引:1-12,参数不对或者数据不存在则返回[]
     */
    gradeMap: (state, getters) => index => {
        return index && state.envs instanceof Object && state.envs['gradeMap'] && state.envs['gradeMap'][index] || []
    },
    /**
     * 获取系统变量中的指定配置,如果未指定key则返回整个系统变量
     * @param key 配置名称
     */
    envs: (state, getters) => key => {
        return key ? (state.envs instanceof Object && state.envs[key] || null) : state.envs
    },
    
};

const actions = {
    ToggleSideBar: ({commit}) => {
        commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({commit}, view) => {
        commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews: ({commit}, view) => {
        commit('DEL_VISITED_VIEWS', view)
    },
    onLoading: ({commit}, flag) => {
        commit("setFullLoading", flag);
    }
};

export {state, mutations, getters, actions}
