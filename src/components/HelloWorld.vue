<template>
  <div class="mb-4">
    <div class="filter mb-3">
      <a-checkbox v-model="showRed">显示红牌</a-checkbox>
      <a-checkbox v-model="showYellow">显示黄牌</a-checkbox>

      <a-radio-group defaultValue=0 v-model="lang">
        <a-radio-button value=0>简体</a-radio-button>
        <a-radio-button value=1>繁体</a-radio-button>
        <a-radio-button value=2>英文</a-radio-button>
      </a-radio-group>
    </div>

    <a-table :columns="columns" :dataSource="data" size="middle" :pagination="pagination">
      <template slot="league" slot-scope="league">{{ league[lang] }}</template>
      <template slot="home" slot-scope="home, match">
        <a-badge :count="match.homeYellow" v-show="showYellow" :numberStyle="{'border-radius':0,backgroundColor: 'yellow', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
        <a-badge :count="match.homeRed" v-show="showRed" :numberStyle="{'border-radius':0,backgroundColor: 'red', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
        {{ home[lang] }}
      </template>
      <template slot="guest" slot-scope="guest, match">
        {{ guest[lang] }}
        <a-badge :count="match.guestRed" v-show="showRed" :numberStyle="{'border-radius':0,backgroundColor: 'red', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
        <a-badge :count="match.guestYellow" v-show="showYellow" :numberStyle="{'border-radius':0,backgroundColor: 'yellow', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
      </template>
      <span slot="score" slot-scope="text, record, index">{{ record.homeScore }} - {{ record.guestScore}}</span>
      <span slot="homeScore" slot-scope="text, record, index">{{ record.homeHalfScore }} - {{ record.guestHalfScore}}</span>
    </a-table>

  </div>
</template>

<script>
  import axios from 'axios'

  const columns = [{
    title: '赛事',
    dataIndex: 'league',
    scopedSlots: { customRender: 'league' },
    align: 'left',
  }, {
    title: '时间',
    dataIndex: 'matchTime',
    align: 'center',
  }, {
    title: '主队',
    dataIndex: 'home',
    scopedSlots: { customRender: 'home' },
    align: 'center',
  }, {
    title: '全场比分',
    dataIndex: 'score',
    scopedSlots: { customRender: 'score' },
    align: 'center',
  }, {
    title: '客队',
    dataIndex: 'guest',
    scopedSlots: { customRender: 'guest' },
    align: 'center',
  }, {
    title: '半场比分',
    dataIndex: 'homeScore',
    scopedSlots: { customRender: 'homeScore' },
    align: 'center',
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
      lang: 0,
      showRed: true,
      showYellow: true,
      pagination: false,
    }
  },
  methods: {
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
