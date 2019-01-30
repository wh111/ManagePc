<template>
    <div class='tabs-view-container'>
      <span> 首页</span> <span v-if="father">> {{father}}</span> <span v-if="child">>  {{child}}</span>
      <!--<router-link class="tabs-view" v-for="(path,index) in Array.from(visitedViews)" :to="path" :key="index">-->
      <!--<el-tag :closable="true" size="small" :type="isActive(path)?'success':'primary'"-->
      <!--@close='closeViewTabs(path,$event,index)'>-->
      <!--{{ pathName[path] }}-->
      <!--</el-tag>-->
      <!--</router-link>-->
    </div>
</template>

<script>
    export default {
        props: ['father', 'child'],
        data() {
            return {
                pathName: {}
            }
        },
        computed: {
            visitedViews() {
                return this.$store.state.app.visitedViews.slice(-6)
            }
        },
        methods: {
            /**
             * 删除标签
             * @param {Object} path  tag存储对象 {key:value}
             * @param {Event} $event  事件
             * @param {Number} idx    当前循环的索引
             */
            closeViewTabs(path, $event, idx) {
                $event.preventDefault()

                this.$store.dispatch('app/delVisitedViews', path)

                let len = this.$store.state.app.visitedViews.length;
                if (len > 0) {
                    let path = '';
                    if (idx === len - 1) {
                        path = this.$store.state.app.visitedViews[idx + 1];
                    } else {
                        path = this.$store.state.app.visitedViews[idx - 1];
                    }
                    this.$router.push(path);
                    this.isActive(path);
                }
            },
            generateRoute() {
                let len = this.$route.matched.length;
                if (len && this.$route.matched[len - 1].name) {
                    return this.$route.matched[len - 1].path
                }
                this.$route.matched[0].path = '/';
                return this.$route.matched[0].path
            },
            addViewTabs() {
                this.$store.dispatch('app/addVisitedViews', this.generateRoute())
            },
            isActive(path) {
                return path === this.$route.path
            }
        },
        created() {
            this.pathName = this.$store.state.menu.pathName;
        },
        watch: {
            $route() {
                this.addViewTabs()
            }
        }
    }
</script>

<style lang="scss">
    .tabs-view-container {
        width: 100%;
        display: inline-block;
        vertical-align: top;
      height: 30px;
      line-height: 30px;
        .tabs-view {
            margin-right: 10px;
        }
    }
</style>
