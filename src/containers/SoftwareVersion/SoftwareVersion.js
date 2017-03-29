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
    preVersion: ''
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() {
    const {appVersion: {version} = {}} = this.props;
    getData({type: 'getAppVersion'}).then(data=>{
      this.setState({preVersion: data});
      if (version && (version !== data)) {
        this.setState({
          hasNew: true
        });
      }
    });
  }
  componentWillReceiveProps(nextPros) {
    if (nextPros.appVersion !== this.props.appVersion) {
      const {appVersion: {version} = {}} = nextPros;
      getData({type: 'getAppVersion'}).then(data=>{
        this.setState({preVersion: data});
        if (version && (version !== data)) {
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
    const {hasNew} = this.state;
    const {appVersion} = this.props;
    if (hasNew) {
      const sendData = JSON.stringify({type: "updateApp", data: appVersion.address});
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
    const { hasNew } = this.state;
    const img = require('../../img/logo@3x.png');
    const newIcon = hasNew ? <span className='newIcon cl-white'>New</span> : '';
    return (<div>
      <div style={{textAlign: 'center', height: 300, padding: 50}}><img src={img}/><div>智慧体育</div></div>
      <Flex direction='column' align='stretch' className='margin-right-nones'>
        <Flex.Item onClick={this.gotoMine.bind(this)}>
          <Item name="当前版本信息" rightText={'V' + this.state.preVersion} isRightarrow={false} style={{paddingLeft: 10}}/>
        </Flex.Item>
        <Flex.Item onClick={this.onUpdateAppVersion.bind(this)}>
          <Item name="检查更新" style={{borderBottom: 'none', paddingLeft: 10}} newIcon={newIcon}/>
        </Flex.Item>
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