<template>
  <div id="app">
    <!-- As a link -->
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">World Cup 2018</a>
      </div>
    </nav>

    <div class="container">
      <div class="wc mt-3">
        <HelloWorld/>
      </div>
    </div>

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
