<!--
****--@file     systemConfig_list
****--@date     2018/1/2 11:42
****--@author   YC
****--@describe 系统设置
-->
<template>
    <div class="moudle-wrap modal clearfix">
        <season></season>
    </div>
</template>
<script>
  /*当前组件必要引入*/
  import season from './season/list'
  //当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {}
    },
    methods: {
      //初始化请求列表数据
      init () {

      }

    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      season
    }
  }

</script>
