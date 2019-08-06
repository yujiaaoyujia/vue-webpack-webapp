<template>
  <article class="home">
    <p>页面构建<AnimatedInteger value="100"></AnimatedInteger>%</p>
    <router-link to="/Page">&gt; To Page</router-link>
  </article>
</template>

<script>
import jdy from '../assets/js/jdy'
import AnimatedInteger from '../components/AnimatedInteger'
// 异步组件
// const HomeAdd = () => import(/* webpackChunkName: "HomeAdd" */ '../components/HomeAdd')

export default {
  name: 'Home',
  data() {
    return {

    }
  },

  computed: {

  },

  created() {
    this.getJson()
  },

  mounted() {

  },

  activated() {

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
        }
      })
    },
  },

  components: {
    AnimatedInteger
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/var.styl'

</style>
