<template>
  <div class="counter">
    <p>{{count}}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      count: 0
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
    increment() {
      this.count++
    }
  },

  components: {

  },
}
</script>

<style lang="stylus" scoped>
.counter {
  text-align: center
}

</style>
