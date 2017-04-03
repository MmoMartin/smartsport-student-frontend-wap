import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as SoftwareVersionAct from 'redux/modules/SoftwareVersion/SoftwareVersionAct';
import { Button, Flex, WingBlank, Toast, Icon, Grid, ImagePicker } from 'antd-mobile';
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
require('./mine.css');

@connect(({SoftwareVersionRed}) => SoftwareVersionRed, SoftwareVersionAct)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      // promises.push(dispatch(SoftwareVersionAct.getStudentInfo()));
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
      leftContent: null,
      leftHandler: ()=>{},
      middleContent: '我的',
    });
  }
  
  state = {
    files: [{url: this.props.tudentInfo ? this.props.tudentInfo.name : Sportsprogram}],
  };
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
  onChange = (files, type) => {
    console.log('files', files);
    const index = files.length - 1;
    this.setState({
      files: [files[index]],
    });
  }

  // 跳转到设置页面
  gotoChangePages(page) {
    this.context.router.push(page);
  }

  render() {
    const { files } = this.state;
    const { studentInfo } = this.props;
    return (<div>
      <div style={{textAlign: 'center', paddingBottom: 20}}>
        <ImagePicker
          className='ImagePicker'
          files={files}
          onChange={this.onChange}
          selectable={true}
        />
        <span className='font-size18 display-block'>{studentInfo ? studentInfo.name : '昂小米'}</span>
      </div>
      <Flex direction='row' className='margin-right-nones'>
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
        <Flex.Item onClick={this.gotoChangePages.bind(this, '/healthReport')}><Item name="健康报告" icon={healthreport}/></Flex.Item>
        <Flex.Item onClick={this.gotoChangePages.bind(this, '/contact')}><Item name="联系我们" icon={contactus}/></Flex.Item>
        <Flex.Item onClick={this.gotoChangePages.bind(this, '/settings')}><Item name="设置" icon={setup} style={{borderBottom: 'none'}}/></Flex.Item>
      </Flex>
    </div>);
  }
}