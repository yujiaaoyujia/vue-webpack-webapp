<template>
  <article class="home">
    <p>页面构建<AnimatedInteger value="100"></AnimatedInteger>%</p>
    <router-link to="/Page">&gt; To Page</router-link>
  </article>
</template>

<script>
import AnimatedInteger from '../components/AnimatedInteger'

export default {
  name: 'Home',
  data() {
    return {

    }
  },

  computed: {

  },

  created() {

  },

  mounted() {

  },

  activated() {

  },

  methods: {

  },

  components: {
    AnimatedInteger
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/var.styl'

</style>
