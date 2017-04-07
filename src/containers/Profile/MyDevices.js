import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, List, ListView, SwipeAction, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as myDevicesAct from '../../redux/modules/Devices/MyDevicesAct';
const styles = require('./Profile.scss');
const wristwatchImg = require('img/wristwatch@2x.png');
const braceletImg = require('img/bracelet@2x.png');
const { Item } = List;
require('../main.css');

@connect(
  ({myDevicesRed}) => (myDevicesRed),
  myDevicesAct
)

@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(myDevicesAct.ownDevicesList()));
      return Promise.all(promises);
    }
  }
])

export default class MyDevices extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows([this.props.ownDevices || '']),
    };
  }

  deviceManager(rowData, props) {
    if (this.props.connectStatus === 1) {
      this.disConnectDevice(rowData, props);
    } else {
      this.connectDevice(rowData, props);
    }
  }

  connectDevice(rowData, props) {
    const obj = {
      type: 'connectDevice',
      data: rowData
    };
    Toast.loading('连接中...', 10000);
    this.postData(obj).then((data) => {
      if (data.info === '连接成功') {
        Toast.info('连接成功', 2);
        const params = {
          connectName: '已连接',
          connectStatus: 1,
          connectColor: '#ddd',
        };
        props.chagneConnectStatus(params);
        if (data.runData !== []) {
          const objValue = {
            params: data.runData,
          };
          props.syncRunData(objValue);
        }
        if (data.HRMData !== [] ) {
          const objValue = {
            params: data.runData,
          };
          props.syncHRMData(objValue);
        }
        if (data.bloodData !== [] ) {
          const objValue = {
            params: data.bloodData,
          };
          props.syncBloodData(objValue);
        }
        const testObj = {
          type: 'testData',
          data: props
        };
        this.postData(testObj).then((returnData) => {

        }).catch((err)=>{
          this.setState({
            err
          });
        });
      } else {
        Toast.info(data.info, 2);
      }
    }).catch((err)=>{
      // Toast.info(err, 1);
      this.setState({
        err
      });
    });
  }

  syncProcess() {
    const obj = {
      type: 'syncProcess',
    };
    this.postData(obj).then((data) => {
      Toast.info(data, 1);
    }).catch((err)=>{
      Toast.info(err, 1);
      this.setState({
        err
      });
    });
  }

  syncData() {
    const obj = {
      type: 'syncData',
    };

    Toast.loading('同步数据...', 10000);
    this.postData(obj).then((data) => {
      Toast.hide();
      Toast.info('同步数据完成', 1);
    }).catch((err)=>{
      Toast.hide();
      Toast.info(err, 1);
      this.setState({
        err
      });
    });
  }

  disConnectDevice(rowData, props) {
    const obj = {
      type: 'disConnectDevice',
      data: rowData
    };
    Toast.loading('断开中...', 10000);
    this.postData(obj).then((data) => {
      // if (data.info === '断开成功') {
      Toast.info('断开成功', 1);
      const params = {
        connectName: '未连接',
        connectStatus: 0,
        connectColor: '#7dc78d',
      };
      props.chagneConnectStatus(params);
      // }
    }).catch((err)=>{
      Toast.info(err, 1);
      this.setState({
        err
      });
    });
  }

  componentDidMount() {
    if (this.props.ownDevices.length !== 0) {
      this.connectListener(this.props);
      this.disConnectListener(this.props);
    }
  }

  connectListener(props) {
    const obj = {
      type: 'connectListener',
      data: props.ownDevices[0]
    };
    this.postData(obj).then((data) => {
      Toast.info('已连接', 1);
      const params = {
        connectName: '已连接',
        connectStatus: 1,
        connectColor: '#ddd',
      };
      props.chagneConnectStatus(params);
    }).catch((err)=>{
      Toast.info(err, 1);
      this.setState({
        err
      });
    });
  }

  disConnectListener(props) {
    const obj = {
      type: 'disConnectListener',
      data: props.ownDevices[0]
    };
    this.postData(obj).then((data) => {
      Toast.info('已断开', 1);
      const params = {
        connectName: '未连接',
        connectStatus: 0,
        connectColor: '#7dc78d',
      };
      props.chagneConnectStatus(params);
    }).catch((err)=>{
      Toast.info(err, 1);
      this.setState({
        err
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { ownDevices, message, unbindStatus } = nextProps;
    if (ownDevices !== this.props.ownDevices) {
      if (!ownDevices) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([]),
        });
      } else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([ownDevices]),
        });
      }
      if (unbindStatus !== this.props.unbindStatus) {
        Toast.info('解绑成功', 1);
      }
    }
  }

  goBack() {
    this.context.router.push('/');
  }

  postData(data) {
    const type = data.type;
    const postData = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      let timeout;
      const fn = (event) => {
        const rtData = event.data;
        const rtObj = JSON.parse(rtData);
        const rtType = rtObj.type;

        if (type === rtType) {
          document.removeEventListener('message', fn);
          timeout && clearTimeout(timeout);
          resolve(rtObj.data);
        }
      };
      timeout = setTimeout(()=>{
        document.removeEventListener('message', fn);
        reject('超时！');
      }, 50000);
      document.addEventListener('message', fn);
      window.postMessage(postData);
    });
  }

  gotoSearchDevices() {
    this.context.router.push('/searchDevices');
  }

  renderRowData(rowData) {
    if (rowData.name) {
      return (
        <SwipeAction
        right={[
          {
            text: this.props.connectStatus === 0 ? '连接' : '断开',
            onPress: () => {
              this.deviceManager(rowData, this.props);
            },
            style: { backgroundColor: this.props.connectStatus === 0 ? '#7dc78d' : '#ddd', color: 'white' },
          },
          {
            text: '解绑',
            onPress: () => this.props.unbindDevice(),
            style: { backgroundColor: '#F4333C', color: 'white' },
          },
        ]}>
        <div className={styles.ringItemDiv}>
          <img src={braceletImg} className={styles.ringItemImg}></img>
          <span className={styles.ringItemNum}>{rowData.name + '     ' + rowData.id}</span>
        </div>
        </SwipeAction>
      );
    } else {
      return (
        <Item onClick={this.gotoSearchDevices.bind(this)}>
          开始搜索设备
        </Item>
      );
    }
  }

  renderHeader() {
    if (this.props.ownDevices.name) {
      return <span>已绑定设备</span>;
    } else {
      return <span>未绑定设备</span>;
    }
  }

  renderFooter() {
    if (this.props.ownDevices.name) {
      return (
        <span>向左滑动可选择绑定设备</span>
      );
    } else {
      return <span></span>;
    }
  }

  render() {
    const height = window.innerHeight - 320 - 100;
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} className={styles.seperator}/>
    );
    return (
      <div>
        <div className={styles.cleadFix}>
          <div className={styles.wathchDiv}>
            <img src={wristwatchImg} className={styles.watchImg}></img>
          </div>
          <div className={styles.ringAndStatusDiv}>
              <div className={styles.ringDiv}>智能手环</div>
              <div className={styles.statusDiv}>{this.props.connectName}</div>
          </div>
        </div>
          <ListView
            dataSource={this.state.dataSource}
            renderHeader={() =>
              this.renderHeader()
            }
            renderFooter={() =>
              this.renderFooter()
            }
            renderSeparator={separator}
            renderRow={(rowData) => this.renderRowData(rowData)}
            style={{height: height < 100 ? 100 : height}} className={styles.listView}/>
      </div>
    );
  }
}
