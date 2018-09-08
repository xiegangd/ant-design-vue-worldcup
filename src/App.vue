<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">World Cup 2018</a>
      </div>
    </nav>

    <div class="container">
      <HelloWorld/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>
