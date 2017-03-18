import React, {Component, PropTypes} from 'react';
import { Button, Flex, WingBlank, Toast, Icon, Grid } from 'antd-mobile';

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  failHandler(info) {
    Toast.hide();
    Toast.fail('加载失败！');
  }
  submitHandler(event) {
    event.preventDefault();
    Toast.hide();
    Toast.loading('加载中...');
  }
  render() {
    const icons = [
      'check-circle', 'check', 'check-circle-o',
      'cross-circle', 'cross', 'cross-circle-o',
      'up', 'down', 'left',
      'right', 'ellipsis',
      'koubei-o', 'koubei', 'loading',
    ];
    const data = icons.map(item => ({
      icon: (<Icon type={item} />),
      text: item,
    }));
    return (
      <div>
        <Grid data={data} columnNum={3} hasLine={false} />
        <WingBlank>
          <div className="btn-container">
            <div>
              <Button className="btn" type="primary" onClick={this.submitHandler.bind(this)}>primary 按钮</Button>
              <Button className="btn" disabled>disabled 按钮</Button>
              <Button className="btn" loading>loading 按钮</Button>
              <Button className="btn" icon="check-circle-o" onClick={this.failHandler.bind(this)}>带图标按钮</Button>

              <div style={{ height: '0.16rem' }} />
              {/* <Button className="btn" activeStyle={false}>无点击反馈</Button> */}
              {/* <Button className="btn" activeStyle={{ backgroundColor: 'red' }}>自定义点击反馈 style</Button> */}

              <p style={{ margin: '30px 0 18px 0', color: '#999' }}>inline / small</p>
              <Flex style={{ marginBottom: '0.16rem' }}>
                <Button type="primary" inline style={{ marginRight: '0.08rem' }}>inline</Button>
                <Button type="ghost" inline size="small" style={{ marginRight: '0.08rem' }}>inline small</Button>
                <Button type="primary" inline size="small">inline small</Button>
              </Flex>
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }
}
export default Home;