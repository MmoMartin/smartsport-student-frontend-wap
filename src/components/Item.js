import React, {Component, PropTypes} from 'react';
const rightarrow = require('../img/rightarrow@3x.png');
export default class Home extends Component {
  render() {
    const {name, icon, style, newIcon, dropyellow, tip, isRightarrow = true, rightText } = this.props;
    return (<div style={style} className='mine-item'>
      {icon ? <img src={icon} className='mine-setting-icon left-icon-position'/> : ''}
      <div className='padding-left-06rem'>
        <p>{name}</p>
        {tip ? <p>成绩排名尚未开通，敬请期待</p> : ''}
      </div>
      <div className='rightarrow-icon-position'>
        {newIcon ? newIcon : ''}
        {rightText ? rightText : ''}
        <img src={dropyellow ? dropyellow : (isRightarrow ? rightarrow : '')} className='rightarrow-icon'/>
      </div>
    </div>);
  }
}