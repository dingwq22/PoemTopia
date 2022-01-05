import React from 'react';
import { Table, Tag } from 'antd';

const columns = [

]
export default class AuditCharacter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  render() {
    const {data} = this.state
    return (
      <Table columns={columns} dataSource={data} />
    )
  }
}