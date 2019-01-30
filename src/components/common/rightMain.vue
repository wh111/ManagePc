<template>
    <div class="rightConten">
        <router-view></router-view>
    </div>
</template>
<style lang="scss">
    .rightConten {
        position: absolute;
        bottom: 25px;
        top: 30px;
        left: 25px;
        right: 30px;
        overflow: auto;
    }
</style>
