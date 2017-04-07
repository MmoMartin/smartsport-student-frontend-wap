import React, {Component, PropTypes} from 'react';
import { Button, TabBar, WingBlank, Toast, Icon, Grid } from 'antd-mobile';
require('./Home.css');

export default class Head extends Component {

  render() {
    const {leftHandler, leftContent, middleHandler, middleContent, rightHandler,
      rightContent, hasBorder, headDisplay} = this.props;
    let headNavBar = 'headNavBar';
    hasBorder && (hasBorder === 1 ? headNavBar = 'headNavBar' : headNavBar = 'headNavBar1' );

    return (
      <div style={{display: headDisplay}}>
        <div className={headNavBar}>
          <div className='leftHeadNavBar' onClick={leftHandler}>
            <div className='leftIcon'>{leftContent}</div>
          </div>
          <div className='middleHeadNavBar' onClick={middleHandler}>
            {middleContent}
          </div>
          <div className='rightHeadNavBar' onClick={rightHandler}>
            {rightContent}
          </div>
        </div>
      </div>
    );
  }
}
