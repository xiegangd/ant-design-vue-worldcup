<template>
  <div>
    <div class="filter mb-3">
      <a-checkbox @change="onChange">显示红牌</a-checkbox>
      <a-checkbox @change="onChange">显示黄牌</a-checkbox>

      <a-radio-group defaultValue=0>
        <a-radio-button value=0>简体</a-radio-button>
        <a-radio-button value=1>繁体</a-radio-button>
        <a-radio-button value=2>英文</a-radio-button>
      </a-radio-group>
    </div>

    <a-table :columns="columns" :dataSource="data"/>

  </div>
</template>

<script>
  import axios from 'axios'

  const columns = [{
    title: '赛事',
    dataIndex: 'league[0]',
    key: 'league',
  }, {
    title: '时间',
    dataIndex: 'matchTime',
    key: 'matchTime',
  }, {
    title: '主队',
    dataIndex: 'home[0]',
    key: 'home',
  }, {
    title: '全场比分',
    dataIndex: 'score',
    key: 'score',
  }, {
    title: '客队',
    dataIndex: 'guest[0]',
    key: 'home',
  }, {
    title: '半场比分',
    dataIndex: 'halfScore',
    key: 'halfScore',
  }];

export default {
  name: 'HelloWorld',
  mounted () {
    this.fetch()
  },
  data () {
    return {
      data: [],
      columns,
    }
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    },
    fetch () {
      let slef = this;
      axios.get('/static/data.json')
        .then(function (response) {
          slef.data = response.data.results
        });
    }
  },
}
</script>
