import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, ListView, SwipeAction, RefreshControl, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as searchDevicesAct from '../../redux/modules/Devices/SearchDevicesAct';
const styles = require('./Profile.scss');
const wristwatchImg = require('img/wristwatch@2x.png');
const braceletImg = require('img/bracelet@2x.png');
const LeftImg = require('img/return@2x.png');
require('../main.css');
let targetDevice = {};

@connect(
  ({ searchDevicesRed }) => (searchDevicesRed),
  searchDevicesAct
)

export default class SearchDevice extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      refreshing: false,
    };
  }

  componentWillMount() {
    const { changeNavBar, changeHeadHandler } = this.props;
    changeNavBar({
      leftContent: <img src={LeftImg}/>,
      leftHandler: changeHeadHandler,
      middleContent: '我的设备',
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    const obj = {
      type: 'scanDevices',
    };
    this.postData(obj).then((data) => {
      let object = {
        params: data,
      };
      this.props.checkAvailableDevices(object);
    }).catch((err)=>{
      Toast.info(err, 1);
      this.setState({
        err
      });
    });
  };

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

  componentWillReceiveProps(nextProps) {
    let { filterDevices, bindStatus } = nextProps;
    if (this.props.filterDevices !== filterDevices) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filterDevices),
        refreshing: !this.state.refreshing,
      });
    }
    if (this.props.bindStatus !== bindStatus) {
      Toast.info('绑定成功', 1);
      this.context.router.push('/myDevices');
    }
    //   const obj = {
    //     type: 'connectDeviceWhenBinding',
    //     data: targetDevice
    //   };
    //   Toast.loading('绑定中...', 10000);
    //   this.postData(obj).then((data) => {
    //     Toast.hide();
    // Toast.info('绑定成功', 1);
    // this.context.router.push('/myDevices');
      // }).catch((err)=>{
      //   Toast.hide();
      //   Toast.info(err, 1);
      //   this.setState({
      //     err
      //   });
      // });
    // }
  }

  render() {
    const height = window.innerHeight - 320 - 100;

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} className={styles.seperator}/>
    );
    return (
      <div>
        <div className={styles.cleadFix}>
        </div>
          <ListView
            dataSource={this.state.dataSource}
            renderHeader={() => <span>下拉扫描设备</span>}
            renderFooter={() => {
              if (this.props.filterDevices.length !== 0) {
                <span>向左滑动可选择解绑设备</span>;
              }
            }}
            renderSeparator={separator}
            refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
            renderRow={(rowData) => <SwipeAction
            right={[
              {
                text: '绑定',
                onPress: () => {
                  let obj = {
                    params: {id: rowData.id, name: rowData.name},
                    // params: [{id: 'xxxxxxxx', name: 'xxxxxxx手环'}],
                  };
                  targetDevice = {id: rowData.id, name: rowData.name};
                  this.props.bindDevice(obj);
                },
                style: { backgroundColor: '#7dc78d', color: 'white' },
              },
            ]}>
            <div className={styles.ringItemDiv}>
              <img src={braceletImg} className={styles.ringItemImg}></img>
              <span className={styles.ringItemNum}>{rowData.name + '     ' + rowData.id}</span>
            </div>
            </SwipeAction>}
            style={{height: height < 100 ? 100 : height}} className={styles.listView}/>
      </div>
    );
  }
}
