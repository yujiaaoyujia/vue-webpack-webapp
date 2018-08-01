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
  }
}
</script>

<style lang="stylus" scoped>

</style>
