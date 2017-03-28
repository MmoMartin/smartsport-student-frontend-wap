import React, {Component, PropTypes} from 'react';
import { List } from 'antd-mobile';
const Item = List.Item;

export default class Profile extends Component {

  render() {
    return (
      <div>
        <List>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          onClick={() => {}}
        >设置</Item>
      </List>
      </div>
    );
  }
}
