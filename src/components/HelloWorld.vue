<template>
    <div class="my-3">
        <div class="filter mb-3">
            <a-checkbox v-model="showRed">显示红牌</a-checkbox>
            <a-checkbox v-model="showYellow">显示黄牌</a-checkbox>

            <a-radio-group defaultValue=0 v-model="lang">
                <a-radio-button value=0>简体</a-radio-button>
                <a-radio-button value=1>繁體</a-radio-button>
                <a-radio-button value=2>English</a-radio-button>
            </a-radio-group>
        </div>

        <div>
            <a-table :columns="columns" :dataSource="data" :pagination="false" size="middle" :loading="loading">
                <span slot="matchTime" slot-scope="matchTime, record">{{ record.matchDate + " " + matchTime }}</span>
                <span slot="league" slot-scope="league">{{ league[lang] }}</span>
                <span slot="home" slot-scope="home, record">
                    <a-badge v-show="showYellow" class="mr-1" :count="record.homeYellow" :numberStyle="{borderRadius:0, backgroundColor: 'yellow', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
                    <a-badge v-show="showRed" :count="record.homeRed" :numberStyle="{borderRadius:0, backgroundColor: 'red', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
                    {{ home[lang] }}
                </span>
                <span slot="guest" slot-scope="guest, record">
                    {{ guest[lang] }}
                    <a-badge v-show="showRed" :count="record.guestRed" :numberStyle="{borderRadius:0, backgroundColor: 'red', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
                    <a-badge v-show="showYellow" class="ml-1" :count="record.guestYellow" :numberStyle="{borderRadius:0, backgroundColor: 'yellow', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}" />
                </span>
                <span slot="score" slot-scope="text, record">{{ record.homeScore }} - {{ record.guestScore }}</span>
                <span slot="halfScore" slot-scope="text, record">{{ record.homeHalfScore }} - {{ record.guestHalfScore }}</span>
                <span slot="operation" slot-scope="text, record">
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link">
                          模拟 <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                          <a-menu-item key="0">
                            <a @click="operation('homeScore', record.matchId)">主队进球 +1</a>
                          </a-menu-item>
                          <a-menu-item key="1">
                            <a @click="operation('homeRed', record.matchId)">主队红牌 +1</a>
                          </a-menu-item>
                          <a-menu-item key="2">
                            <a @click="operation('homeYellow', record.matchId)">主队黄牌 +1</a>
                          </a-menu-item>

                          <a-menu-divider />

                          <a-menu-item key="3">
                            <a @click="operation('guestScore', record.matchId)">客队进球 +1</a>
                          </a-menu-item>
                          <a-menu-item key="4">
                            <a @click="operation('guestRed', record.matchId)">客队红牌 +1</a>
                          </a-menu-item>
                          <a-menu-item key="5">
                            <a @click="operation('guestYellow', record.matchId)">客队黄牌 +1</a>
                          </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </span>
            </a-table>
        </div>
    </div>
</template>

<script>
    import reqwest from 'reqwest';

    const columns = [{
        title: '赛事',
        dataIndex: 'league',
        scopedSlots: { customRender: 'league' },
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
        dataIndex: 'halfScore',
        scopedSlots: { customRender: 'halfScore' },
        align: 'center',
    }, {
        title: '本地模拟',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        align: 'right',
    }];

    export default {
        name: 'HelloWorld',
        data() {
            return {
                data: [],
                columns,
                lang: 0,
                showRed: true,
                showYellow: true,
                loading: false,
            }
        },
        mounted() {
            this.fetch();
        },
        methods: {
            fetch () {
                this.loading = true
                reqwest({
                    url: '/worldcup_2018.json',
                    method: 'get',
                    type: 'json',
                }).then((data) => {
                    this.loading = false
                    this.data = data.results;
                });
            },
            operation (type, matchId) {
                // this.$message.success(matchId, 10);
                // 定位数据
                let foundIndex = this.data.findIndex(x => x.matchId === matchId)
                if(foundIndex !== -1) {
                    let currentMatch = this.data[foundIndex];

                    let msg = ''
                    switch (type) {
                        case 'homeScore':
                            currentMatch.homeScore ++
                            msg = <span><b class="text-danger">{ currentMatch.home[this.lang] } {currentMatch.homeScore}</b> : {currentMatch.guestScore} {currentMatch.guest[this.lang]}</span>;
                            this.$message.success(msg, 10);
                            break;
                        case 'homeRed':
                            currentMatch.homeRed ++
                            break;
                        case 'homeYellow':
                            currentMatch.homeYellow ++
                            break;
                        case 'guestScore':
                            currentMatch.guestScore ++
                            msg = <span>{ currentMatch.home[this.lang] } {currentMatch.homeScore} : <b class="text-danger">{currentMatch.guestScore} {currentMatch.guest[this.lang]}</b></span>;
                            this.$message.success(msg, 10);
                            break;
                        case 'guestRed':
                            currentMatch.guestRed ++
                            break;
                        case 'guestYellow':
                            currentMatch.guestYellow ++
                            break;
                    }


                }

            },
        }
    }
</script>
