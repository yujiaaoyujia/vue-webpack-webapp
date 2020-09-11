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
      count: 0,
    }
  },

  methods: {
    increment() {
      this.count++
    },
  },
}
</script>

<style lang="stylus" scoped>
.counter {
  text-align: center
}

</style>
