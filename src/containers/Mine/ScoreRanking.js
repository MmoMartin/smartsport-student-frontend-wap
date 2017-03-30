import React, {Component, PropTypes} from 'react';
import {Item} from 'components';
import { Button, Flex, WhiteSpace } from 'antd-mobile';
const dropyellow = require('img/Dropyellow@3x.png');
const medal = require('img/medal@3x.png');
const trophy = require('img/Trophy@3x.png');
export default class Home extends Component {
  render() {
    return (<div>
      <Flex direction='column' align='stretch' className='margin-right-nones'>
        <Flex.Item>
          <Item name="50米" icon={trophy} tip='成绩排名尚未开通，敬请期待' style={{height: 'inherit', lineHeight: 'inherit'}} dropyellow={dropyellow}/>
        </Flex.Item>
        <WhiteSpace size="sm" />
        <Flex.Item>
          <Item name="100米" icon={medal} tip='成绩排名尚未开通，敬请期待' style={{height: 'inherit', lineHeight: 'inherit'}} dropyellow={dropyellow}/>
        </Flex.Item>
        <WhiteSpace size="sm" />
        <Flex.Item>
          <Item name="1500米" icon={trophy} tip='成绩排名尚未开通，敬请期待' style={{height: 'inherit', lineHeight: 'inherit'}} dropyellow={dropyellow}/>
        </Flex.Item>
    </Flex>
    </div>);
  }
}