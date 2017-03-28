import React, {Component, PropTypes} from 'react';
import { Button, TabBar, WingBlank, Toast, Icon, Grid } from 'antd-mobile';
require('./Home.css');

export default class Head extends Component {

  render() {
    return (
      <div>
        <div className='headNavBar'>
          <div className='leftHeadNavBar' onClick={this.props.leftHandler}>
            <div className='leftIcon'>{this.props.leftContent}</div>
          </div>
          <div className='middleHeadNavBar' onClick={this.props.middleHandler}>
            {this.props.middleContent}
          </div>
          <div className='rightHeadNavBar' onClick={this.props.rightHandler}>
            {this.props.rightContent}
          </div>
        </div>
      </div>
    );
  }

}
