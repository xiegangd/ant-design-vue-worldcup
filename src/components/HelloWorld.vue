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

    <a-table :columns="columns" :dataSource="data">
      <span slot="score" slot-scope="text, record, index">{{ record.homeScore }} - {{ record.guestScore}}</span>
      <span slot="homeScore" slot-scope="text, record, index">{{ record.homeHalfScore }} - {{ record.guestHalfScore}}</span>
    </a-table>

  </div>
</template>

<script>
  import axios from 'axios'

  const columns = [{
    title: '赛事',
    dataIndex: 'league[0]',
  }, {
    title: '时间',
    dataIndex: 'matchTime',
  }, {
    title: '主队',
    dataIndex: 'home[0]',
  }, {
    title: '全场比分',
    dataIndex: 'score',
    scopedSlots: { customRender: 'score' },
  }, {
    title: '客队',
    dataIndex: 'guest[0]',
  }, {
    title: '半场比分',
    dataIndex: 'homeScore',
    scopedSlots: { customRender: 'homeScore' },
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
