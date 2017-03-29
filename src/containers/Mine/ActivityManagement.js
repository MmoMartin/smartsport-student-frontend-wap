import React, {Component, PropTypes} from 'react';
import { Button, Flex, WhiteSpace } from 'antd-mobile';
const activitymanagement1 = require('img/pic-1@3x.png');
const activitymanagement2 = require('img/pic-2@3x.png');
const activitymanagement3 = require('img/pic-3@3x.png');
export default class Home extends Component {
  render() {
    return (<div>
      <Flex direction='column' align='stretch' className='margin-right-nones'>
        <Flex.Item>
          <div className='position-relative'>
            <div className='middle cl-white text-center w100'>
              <div className='font-size24'>篮球比赛</div>
              <div className='font-size20'>敬请期待</div>
            </div>
            <img src={activitymanagement1} className='wh100'/>
          </div>
        </Flex.Item>
        <WhiteSpace size="sm" />
        <Flex.Item>
          <div className='position-relative'>
            <div className='middle cl-white text-center w100'>
              <div className='font-size24'>200米接力赛</div>
              <div className='font-size20'>敬请期待</div>
            </div>
            <img src={activitymanagement2} className='wh100'/>
          </div>
        </Flex.Item>
        <WhiteSpace size="sm" />
        <Flex.Item>
          <div className='position-relative text-center w100'>
            <div className='middle cl-white'>
              <div className='font-size24'>400米比赛</div>
              <div className='font-size20'>敬请期待</div>
            </div>
            <img src={activitymanagement3} className='wh100'/>
          </div>
        </Flex.Item>
    </Flex>
    </div>);
  }
}