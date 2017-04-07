import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as MineAct from 'redux/modules/Mine/MineAct';
import { Button, Flex, WingBlank, Toast, Icon, Grid, ImagePicker, Modal } from 'antd-mobile';
import {getData, postData, listenData} from 'xunyijia-components/src/utils/rnBridge';
import {Item} from 'components';
import RowItem from './RowItem';
const healthreport = require('../../img/healthreport@3x.png');
const headportrait = require('../../img/headportrait@3x.png');
const contactus = require('img/contactus@3x.png');
const Integral = require('../../img/Integral@3x.png');
const maillist = require('../../img/maillist@3x.png');
const setup = require('../../img/setup@3x.png');
const knowledgebase = require('../../img/knowledgebase-2@3x.png');
const scoreranking = require('../../img/scoreranking-2@3x.png');
const Sportsprogram = require('../../img/activitymanagement-2@3x.png');
import config from '../../constants/config';
const alert = Modal.alert;
import { STUDENT_LICENCE_POLICY } from 'constants/urls';
require('./mine.css');

@connect(({MineRed}) => MineRed, MineAct)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(MineAct.getUserInfo()));
      return Promise.all(promises);
    }
  }
])
export default class Home extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      headDisplay: 'none',
    });
  }
  gotoActivityManagement(event) {
    this.context.router.push({
      pathname: '/activityManagement',
    });
  }
  gotoKnowledgeBase() {
    this.context.router.push({
      pathname: '/knowledgeBase',
    });
  }
  gotoScoreRanking() {
    this.context.router.push({
      pathname: '/scoreRanking',
    });
  }
  onClickImagePicker() {
    getData({type: 'upHeadPortrait'}).then((data) => {
      this.props.changeHeadPortrait(data);
    });
  }

  // 跳转到设置页面
  gotoChangePages(page) {
    this.context.router.push(page);
  }

  render() {
    const imgBase64 = localStorage.getItem(config.headPortrait);
    const { userInfo } = this.props;
    return (<div>
      <div style={{textAlign: 'center', paddingBottom: 20, background: '#fff'}}>
        <div style={{display: "inline-block", padding: '0.2rem'}} onClick={this.onClickImagePicker.bind(this)}>
          <div className='outer-circle border-radius50'>
            <div className='inner-circle wh100 border-radius50'>
              {imgBase64 && <img src={imgBase64} className='wh100 border-radius50'/>}
            </div>
          </div>
        </div>
        <span className='font-size18 display-block'>{userInfo ? userInfo.name : '昂小米'}</span>
        <div style={{textAlign: 'center', paddingBottom: 20, background: '#fff'}}>
        </div>
      </div>
      <Flex direction='row' className='margin-right-nones' style={{height: "1.7rem", background: "#f5f5f5"}}>
        <Flex.Item className='padding-bottom10 bg-color-ccc' onClick={this.gotoActivityManagement.bind(this)}>
          <RowItem name="活动管理" icon={Sportsprogram} style={{height: 100}}/>
        </Flex.Item>
        <Flex.Item className='padding-bottom10 bg-color-ccc' onClick={this.gotoKnowledgeBase.bind(this)}>
          <RowItem name="知识库" icon={knowledgebase} style={{height: 100}}/>
        </Flex.Item>
        <Flex.Item className='padding-bottom10 bg-color-ccc' onClick={this.gotoScoreRanking.bind(this)}>
          <RowItem name="成绩排名" icon={scoreranking} style={{height: 100}}/>
        </Flex.Item>
      </Flex>
      <Flex direction='column' align='stretch' className='margin-right-nones'>
        <Flex.Item onClick={this.gotoChangePages.bind(this, '/point')}><Item name="积分" icon={Integral}/></Flex.Item>
        <Flex.Item><Item name="通讯录" icon={maillist}/></Flex.Item>
        <Flex.Item onClick={this.gotoChangePages.bind(this, '/healthReport')}>
          <Item name="健康报告" icon={healthreport}/>
        </Flex.Item>
        <Flex.Item onClick={this.gotoChangePages.bind(this, '/contact')}>
          <Item name="联系我们" icon={contactus}/>
        </Flex.Item>
        <Flex.Item onClick={this.gotoChangePages.bind(this, '/settings')}>
          <Item name="设置" icon={setup} style={{borderBottom: 'none'}}/>
        </Flex.Item>
      </Flex>
    </div>);
  }
}
