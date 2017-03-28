import React, {Component, PropTypes} from 'react';
import { NavBar, Icon, List, ListView, SwipeAction, RefreshControl } from 'antd-mobile';
const styles = require('./Profile.scss');
const wristwatchImg = require('img/wristwatch@2x.png');
const braceletImg = require('img/bracelet@2x.png');
require('../main.css');

export default class MyDevices extends Component {
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
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 2',
        'row 1']),
        refreshing: false,
      });
    }, 1000);
  };

  render() {
    const height = window.innerHeight - 320 - 100;

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} className={styles.seperator}/>
    );
    return (
      <div>
        <NavBar leftContent="返回" mode="light" onLeftClick={() => console.log('onLeftClick')}
          style={{marginTop: 40}}
        >我的设备</NavBar>
        <div className={styles.cleadFix}>
          <div className={styles.wathchDiv}>
            <img src={wristwatchImg} className={styles.watchImg}></img>
          </div>
          <div className={styles.ringAndStatusDiv}>
              <div className={styles.ringDiv}>智能手环</div>
              <div className={styles.statusDiv}>未连接</div>
          </div>
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
