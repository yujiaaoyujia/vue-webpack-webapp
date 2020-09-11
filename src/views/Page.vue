<template>
  <article class="page">
    <p>Page</p>
    <input type="text" placeholder="input" >

    <section class="page-count">
      <Counter></Counter>
    </section>
  </article>
</template>

<script>
import Counter from '../components/Counter'

// 异步组件
// const FooComponent = () => import(/* webpackChunkName: "FooComponent" */ '../components/FooComponent')

// 组件/实例的选项的顺序
// https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F%E6%8E%A8%E8%8D%90

export default {
  name: 'Page',
  components: {
    Counter,
  },
  directives: {},
  filters: {},

  extends: {},
  mixins: [],

  model: {},
  props: {},

  data() {
    return {

    }
  },
  computed: {

  },

  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},

  // beforeRouteEnter(to, from, next) {
  //   next(($this) => {

  //   })
  // },

  // beforeRouteUpdate(to, from, next) {
  //   next()
  // },

  // beforeRouteLeave(to, from, next) {
  //   next()
  // },

  methods: {

  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/var.styl'

.page-count {
  margin-top: 20px
}

</style>
