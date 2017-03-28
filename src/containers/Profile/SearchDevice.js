import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, List, ListView, SwipeAction, RefreshControl, Toast } from 'antd-mobile';
const styles = require('./Profile.scss');
const wristwatchImg = require('img/wristwatch@2x.png');
const braceletImg = require('img/bracelet@2x.png');
require('../main.css');

export default class SearchDevice extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 2',
      'row 1']),
      refreshing: false,
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    const obj = {
      type: 'scanDevices',
    };
    this.postData(obj).then((data) => {
      console.log('data return ------- ', data);
      Toast.info(data, 2, null, false);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 2',
        'row 1']),
        refreshing: false,
      });
    }).catch((err)=>{
      console.log('err ==== ', err);
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
        Toast.info(rtData, 5);
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
      }, 15000);
      document.addEventListener('message', fn);
      window.postMessage(postData);
    });
  }

  render() {
    const height = window.innerHeight - 320 - 100;

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} className={styles.seperator}/>
    );
    return (
      <div>
        <NavBar leftContent="返回" mode="light" onLeftClick={() => console.log('onLeftClick')}
          style={{marginTop: 40, backgroundColor: 'yellow'}}
        >搜索设备</NavBar>
        <div className={styles.cleadFix}>
        </div>
          <ListView
            dataSource={this.state.dataSource}
            renderHeader={() => <span>下来扫描设备</span>}
            renderFooter={() => <span>向左滑动可选择断开或绑定设备</span>}
            renderSeparator={separator}
            refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
            renderRow={(rowData) => <SwipeAction
            right={[
              {
                text: '断开',
                onPress: () => console.log('断开'),
                style: { backgroundColor: '#ddd', color: 'white' },
              },
              {
                text: '解绑',
                onPress: () => console.log('解绑'),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}>
            <div className={styles.ringItemDiv}>
              <img src={braceletImg} className={styles.ringItemImg}></img>
              <span className={styles.ringItemNum}>智能手环    100000000001</span>
            </div>
            </SwipeAction>}
            style={{height: height < 100 ? 100 : height}} className={styles.listView}/>
      </div>
    );
  }
}
