import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Toast, Icon, Grid, ImagePicker, Modal } from 'antd-mobile';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {Item} from 'components';
import * as SoftwareVersionAct from 'redux/modules/SoftwareVersion/SoftwareVersionAct';
import {getData, postData, listenData} from 'xunyijia-components/src/utils/rnBridge';
const maillist = require('../../img/maillist@3x.png');
const setup = require('../../img/setup@3x.png');
const alert = Modal.alert;
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
      promises.push(dispatch(SoftwareVersionAct.getNewSwVersion()));
      return Promise.all(promises);
    }
  }
])
export default class Home extends Component {
  state = {
    hasNew: false,
    progress: null,
    modal: false,
    preVersion: '',
    isIos: true
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      leftContent: <Icon type='left' color='#00CC66'/>,
      leftHandler: changeHeadHandler,
      middleContent: '软件版本',
    });
  }
  componentDidMount() {
    const {appVersion} = this.props;
    getData({type: 'getAppVersion'}).then(data=>{
      const gData = JSON.parse(data);
      const {nowVersion, isIos} = gData;
      this.setState({preVersion: nowVersion, isIos: isIos});
      if (appVersion[0].version && (appVersion[0].version !== nowVersion)) {
        this.setState({
          hasNew: true
        });
      }
    });
  }
  componentWillReceiveProps(nextPros) {
    if (nextPros.appVersion !== this.props.appVersion) {
      const {appVersion} = nextPros;
      getData({type: 'getAppVersion'}).then(data=>{
        const gData = JSON.parse(data);
        const {nowVersion, isIos} = gData;
        this.setState({preVersion: nowVersion, isIos: isIos});
        if (appVersion[0].version && (appVersion[0].version !== nowVersion)) {
          this.setState({
            hasNew: true
          });
        }
      });
    }
  }
  gotoMine(text) {
    this.context.router.push({
      pathname: '/mine',
    });
  }
  handleOk(event) {
    const {hasNew, isIos} = this.state;
    const {appVersion} = this.props;
    if (hasNew) {
      const sendData = {type: "updateApp", data: appVersion[0].address};
      const listen = listenData(sendData);
      // postData({type: 'updateApp', data: appVersion.address});
      listen.begin((data)=>{
        this.setState({modal: true, progress: data});
        if (data === 100) {
          this.setState({modal: false});
          listen.end();
        }
      });
      Toast.info('正在下载！', 1);
    }
  }
  onUpdateAppVersion() {
    const { hasNew } = this.state;
    const okText = !hasNew ? '确定' : '立即更新';
    alert('更新', !hasNew ? '已是最新版本' : '是否立即更新', [
      { text: '取消', onPress: () => {} },
      { text: okText, onPress: () => this.handleOk.call(this), style: { fontWeight: 'bold' } },
    ]);
  }
  render() {
    const { hasNew, isIos } = this.state;
    const img = require('../../img/logo@3x.png');
    const newIcon = hasNew ? <span className='newIcon cl-white h029 lh029 w057 font-size017'>New</span> : '';
    return (<div>
      <div style={{textAlign: 'center'}} className='padding04'><img src={img}/><div className='padding02'>智慧体育</div></div>
      <Flex direction='column' align='stretch' className='margin-right-nones'>
        <Flex.Item>
          <Item name="当前版本信息"
            rightText={'V' + this.state.preVersion}
            isRightarrow={false} paddingLeft033={true}
            className='font-size03'
            style={isIos ? {borderBottom: 'none'} : {}}
          />
        </Flex.Item>
        {isIos ? '' : <Flex.Item onClick={this.onUpdateAppVersion.bind(this)}>
          <Item name="检查更新" className='font-size03' style={{borderBottom: 'none'}} newIcon={newIcon} paddingLeft033={true}/>
        </Flex.Item>}
      </Flex>
      <Modal
        transparent
        maskClosable={false}
        visible={this.state.modal}
      >
        已经下载：{this.state.progress}%
      </Modal>
    </div>);
  }
}