<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    }
  },
}
</script>

<style lang="stylus" scoped>
#app {
  height: 100%
}
</style>
