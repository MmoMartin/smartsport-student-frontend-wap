import React, {Component, PropTypes} from 'react';
import {Item} from 'components';
import { Button, Flex, WhiteSpace, Icon } from 'antd-mobile';
const dropyellow = require('img/Dropyellow@3x.png');
const medal = require('img/medal@3x.png');
const trophy = require('img/Trophy@3x.png');
const LeftImg = require('img/return@2x.png');
export default class Home extends Component {
  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      leftContent: <img src={LeftImg}/>,
      leftHandler: changeHeadHandler,
      middleContent: '成绩排名',
    });
  }
  render() {
    return (<div className='score_img'>
      <Flex direction='column' align='stretch' className='margin-right-nones'>
        <Flex.Item>
          <Item name="50米" icon={trophy} tip='成绩排名尚未开通，敬请期待' style={{height: '1.2rem', lineHeight: 'inherit'}} dropyellow={dropyellow} isRightarrow={false}/>
        </Flex.Item>
        <WhiteSpace size="sm" />
        <Flex.Item>
          <Item name="100米" icon={medal} tip='成绩排名尚未开通，敬请期待' style={{height: '1.2rem', lineHeight: 'inherit'}} dropyellow={dropyellow} isRightarrow={false}/>
        </Flex.Item>
        <WhiteSpace size="sm" />
        <Flex.Item>
          <Item name="1500米" icon={trophy} tip='成绩排名尚未开通，敬请期待' style={{height: '1.2rem', lineHeight: 'inherit'}} dropyellow={dropyellow} isRightarrow={false}/>
        </Flex.Item>
    </Flex>
    </div>);
  }
}
