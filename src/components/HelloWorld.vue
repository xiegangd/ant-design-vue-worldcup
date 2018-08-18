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

    <a-table :columns="columns" :dataSource="data" size="middle" :pagination="pagination" :loading="loading">
      <template slot="matchTime" slot-scope="matchTime, match">
        <span :title="match.matchYear+'-'+match.matchDate+' ' + match.matchTime">{{ match.matchDate + " " + match.matchTime }}</span>
      </template>
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

      <template slot="operation" slot-scope="text, match">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" href="#">
            模拟 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a @click="op('homeScore', match.matchId)">主队进球 +1</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a @click="op('homeRed', match.matchId)">主队红牌 +1</a>
            </a-menu-item>
            <a-menu-item key="2">
              <a @click="op('homeYellow', match.matchId)">主队黄牌 +1</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <a @click="op('guestScore', match.matchId)">客队进球 +1</a>
            </a-menu-item>
            <a-menu-item key="4">
              <a @click="op('guestRed', match.matchId)">客队红牌 +1</a>
            </a-menu-item>
            <a-menu-item key="5">
              <a @click="op('guestYellow', match.matchId)">客队黄牌 +1</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
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
    scopedSlots: { customRender: 'matchTime' },
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
  }, {
    title: '本地模拟',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'right',
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
      loading: false,
    }
  },
  methods: {
    fetch () {
      let self = this;
      self.loading = true
      axios.get('/static/data.json')
        .then(function (response) {
          self.loading = false
          self.data = response.data.results
        });
    },
    op (type, matchId) {
      //定位行
      let foundIndex = this.data.findIndex(x => x.matchId == matchId)
      if (foundIndex != -1){
        let currentMatch = this.data[foundIndex];
        let currentMatchHome = currentMatch.home[this.lang]
        let currentMatchGuest = currentMatch.guest[this.lang]
        //更新数据
        let msg = ''
        switch (type) {
          case 'homeScore':
            currentMatch.homeScore ++;
            msg = `${currentMatchHome} (${currentMatch.homeScore} : ${currentMatch.guestScore}) ${currentMatchGuest}`
            this.$message.success(msg, 5);
            break;
          case 'homeRed':
            currentMatch.homeRed ++;
            break;
          case 'homeYellow':
            currentMatch.homeYellow ++;
            break;
          case 'guestScore':
            currentMatch.guestScore ++;
            msg = `${currentMatchHome} (${currentMatch.homeScore} : ${currentMatch.guestScore}) ${currentMatchGuest}`
            this.$message.success(msg, 5);
            break;
          case 'guestRed':
            currentMatch.guestRed ++;
            break;
          case 'guestYellow':
            currentMatch.guestYellow ++;
            break;
        }

      }else {
        this.$message.error('数据异常', 10);
      }
    }
  },
}
</script>
