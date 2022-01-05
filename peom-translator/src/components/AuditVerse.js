import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
const AV = require('leancloud-storage');

const StatusMap = {
  unAudit: {
    color: ''
  },
  fail: {
    color: 'red'
  },
  pass: {
    color: 'green'
  }
}
const columns = [
  {
    title: 'Num.',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Keyword',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: 'Translation',
    dataIndex: 'translation',
    key: 'translation',
  },
  {
    title: 'Volunteer',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <Tag color={StatusMap[text].color}>{text}</Tag>
    ) //pass   fail  unAudit    
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'options',
    dataIndex: 'options',
    key: 'options',
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" ghost>通过</Button>
        <Button type="danger" ghost>不通过</Button>
      </Space>
    ),
  }
];
export default class AuditVerse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.queryVerse()
  }
  queryVerse() {
    const that = this;
    const query = new AV.Query('Volunteer_Verse');
    query.include("volunteer");
    query.find().then(array => {
        const list = array.map((i, index) => {
            return { ...i.attributes, username: i.attributes.volunteer.attributes.username, index: index+1 };
        })
        that.setState({
            data: list
        })
    })
}
  render() {
    const {data} = this.state
    return (
      <Table columns={columns} dataSource={data} />
    )
  }
}