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

export default {
  name: 'Page',
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
    Counter,
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/var.styl'
.page {}
.page-count {
  margin-top: 20px
}

</style>
