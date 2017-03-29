import React, {Component, PropTypes} from 'react';
import { Button, Flex, WhiteSpace } from 'antd-mobile';
const knowledgebase1 = require('img/knowledgebase-pic-1@3x.png');
const knowledgebase2 = require('img/knowledgebase-pic-2@3x.png');
const knowledgebasePlay = require('img/knowledgebase-play@3x.png');
export default class Home extends Component {
  render() {
    return (<div>
      <Flex direction='column' align='stretch' className='margin-right-nones'>
        <Flex.Item>
          <div className='bfff text-center padding-tb10'>
            <div className='display-inline-block w50 cl-20df6a'>全部</div>
            <div className='display-inline-block w50'>运动分类</div>
          </div>
        </Flex.Item>
        <WhiteSpace size="lg" className='bg-cl-d9d9d9'/>
        <Flex.Item className='bfff'>
          <div className='padding20'>
            <div className='position-relative'>
              <img src={knowledgebase1} className='wh100'/>
              <img src={knowledgebasePlay} className='middle w15'/>
              <div className='position-top-left cl-white w-auto padding-tb2-lr20 bff9500'>田径</div>
              <div className='position-bottom-right cl-white w-auto padding-tb2-lr20 b0003'>敬请期待</div>
            </div>
            <div>
              <p>田径是国内比较流行的一种比赛项目。田径的训练有很多相关的训练方法。</p>
              <p className='font-size24'>不同年龄阶段的训练方法有所不同，根据身体的肺活量、年龄等而定。为不同年龄阶段的学生制定一套适合的方案，是相关人员的一种义务。</p>
            </div>
          </div>
        </Flex.Item>
        <WhiteSpace size="lg" className='bg-cl-d9d9d9'/>
        <Flex.Item className='bfff'>
          <div className='padding20'>
            <div className='position-relative'>
              <img src={knowledgebasePlay} className='middle w15'/>
              <img src={knowledgebase2} className='wh100'/>
              <div className='position-top-left cl-white w-auto padding-tb2-lr20 b0db3e9'>篮球</div>
              <div className='position-bottom-right cl-white w-auto padding-tb2-lr20 b0003'>敬请期待</div>
            </div>
            <div>
              <p>篮球是一种具有技战术能力、智慧、策略、耐力与创造力的运动。</p>
            </div>
          </div>
        </Flex.Item>
    </Flex>
    </div>);
  }
}