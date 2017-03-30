import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
require('./Contact.css');
const styles = require('./Contact.scss');
class Contact extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // 取消返回上一级
  goback() {
    this.context.router.push({ pathname: '/point' });
  }
  render() {
    return (
      <div style={{ backgroundColor: "#f2f2f2", width: "100%"}}>
        <div className="head_navbar" style={{paddingTop: "40px"}}>
          <NavBar mode='light'
            onLeftClick={this.goback.bind(this)}
          >联系我们</NavBar>
        </div>
        <div className={styles.contact_Body} style={{height: "7.2rem"}}></div>
        <div className={styles.tel} style={{borderBottom: "1px solid rgb(198, 193, 193)"}}>
          <p className={styles.name}>客服电话</p>
          <p className={styles.num}>020-38550695</p>
        </div>
        <div className={styles.tel}>
          <p className={styles.name}>E-mail</p>
          <p className={styles.num}>service@bbcloud.com</p>
        </div>
        <footer className={styles.contact_footer} style={{height: "1rem"}}>广州讯一佳信息科技有限公司 版权所有</footer>
      </div>
    );
  }
}
export default Contact;
