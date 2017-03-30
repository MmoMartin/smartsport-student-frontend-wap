import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
const styles = require('./Point.scss');
class Contact extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // 取消返回上一级
  goback() {
    this.context.router.push({ pathname: '/contact' });
  }
  render() {
    return (
      <div style={{ backgroundColor: "#f2f2f2", width: "100%"}}>
        <div className="head_navbar" style={{paddingTop: "40px"}}>
          <NavBar mode='light'
            onLeftClick={this.goback.bind(this)}
          >积分</NavBar>
        </div>
        <div className={styles.point_body}>
          <div className={styles.body_top}>
            <p className={styles.point_help}>使用帮助</p>
            <div className={styles.point_text}>
              <p className={styles.point}>445<span>个</span></p>
              <p>积分，有大用，多领一些囤起来！</p>
            </div>
          </div>
          <div className={styles.body_bottom}>
            <div className={styles.earn_spend} style={{float: "left", borderRight: "solid 1px #fff"}}>
              <div className={styles.earn}
                style={{width: "0.64rem", height: "0.64rem",
                        display: "inline-block", borderRadius: "50%", marginLeft: "1.1rem"}}/>
              <span>赚</span>
            </div>
            <div className={styles.earn_spend} style={{float: "right"}}>
              <div className={styles.spend}
                style={{width: "0.64rem", height: "0.64rem",
                        display: "inline-block", borderRadius: "50%", marginLeft: "1.1rem"}}/>
              <span>花</span>
            </div>
          </div>
        </div>
        <div className={styles.clearFix} style={{height: "0.9rem", background: "#fff"}}>
          <div className={styles.point_detail}>
            <p className={styles.name} style={{float: "left", margin: "0"}}>收支明细</p>
            <p className={styles.more} style={{float: "right", color: "#999", margin: "0"}}>更多</p>
          </div>
        </div>
        <div className={styles.clearFix} style={{height: "1.1rem", background: "#fff"}}>
          <div className={styles.point_info}>
            <p style={{float: "left", marginTop: "0.15rem"}}>消息
              <span style={{display: "block", color: "#999", fontSize: "0.24rem"}}>2017-03-15 00:24:54</span>
            </p>
            <p className={styles.new_num} style={{float: "right"}}>+5</p>
          </div>
        </div>

      </div>
    );
  }
}
export default Contact;
