<template>
  <div id="app">
    <transition :name="transition">
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
      transition: 'fade'
    }
  },

  watch: {
    // 根据索引值 判断前进后退状态
    $route(to, from) {
      const toDepth = to.meta.depth
      const fromDepth = from.meta.depth
      if (!toDepth || !fromDepth) {
        this.transition = 'fade'
      } else if (toDepth > fromDepth) {
        this.transition = 'slide-left'
      } else if (toDepth < fromDepth) {
        this.transition = 'slide-right'
      } else {
        this.transition = 'fade'
      }
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
