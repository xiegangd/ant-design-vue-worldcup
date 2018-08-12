<template>
  <div id="app">
    <a-button type="primary">Button</a-button>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
