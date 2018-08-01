<template>
  <article class="home">
    页面构建
    <AnimatedInteger value="100"></AnimatedInteger>%
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

.test {
  display: flex
  flex: 1
  width: 1rem
  height: 1rem
  // background: url('../../static/img/logo.png') center center no-repeat
  background: linear-gradient(90deg, #2eb9ff 0%, #1584ff 100%)
  background-size: contain
}
.test2 {
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 2
  width: 1rem
  height: 1rem
  background: url('../../static/img/world_cup.jpg') center center no-repeat
  background-size: contain
}
.example {
  display: grid
  transition: all .5s
  user-select: none
  background: linear-gradient(to bottom, white, black)
  color: $red
}
</style>
