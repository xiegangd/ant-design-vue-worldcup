<template>
  <div>
    <a-checkbox @change="onChange">显示红牌</a-checkbox>
    <a-checkbox @change="onChange">显示黄牌</a-checkbox>

    <a-radio-group defaultValue=0>
      <a-radio-button value=0>简体</a-radio-button>
      <a-radio-button value=1>繁体</a-radio-button>
      <a-radio-button value=2>英文</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    },
  },
}
</script>
