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
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];

export default {
  name: 'HelloWorld',
  data () {
    return {
      data,
      columns,
    }
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    },
  },
}
</script>
