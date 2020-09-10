<template>
  <article class="home">
    <p>页面构建<AnimatedInteger value="100"></AnimatedInteger>%</p>
    <router-link to="/Page">&gt; To Page</router-link>
  </article>
</template>

<script>
import jdy from '../assets/js/jdy'
import AnimatedInteger from '../components/AnimatedInteger'

export default {
  name: 'Home',
  components: {
    AnimatedInteger,
  },

  created() {
    this.getJson()
  },

  methods: {
    getJson() {
      jdy.post('GetJson', {}, {
        success: (res) => {
          if (res.success) {
            jdy.msg((res.data || {}).test)
          } else {
            jdy.msg(res.message)
          }
        },
        error: () => {
          // jdy.msg('获取JSON失败，请检查网络设置。')
        },
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/var.styl'

</style>
