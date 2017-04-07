import React, {Component, PropTypes} from 'react';
const rightarrow = require('../img/rightarrow@3x.png');
export default class Home extends Component {
  render() {
    const {
      name, icon, style, newIcon, dropyellow, tip, isRightarrow = true, rightText, paddingLeft033, className
    } = this.props;
    const paddingLeft = paddingLeft033 ? 'padding-left-033' : 'padding-left-06rem';
    return (<div style={style} className={`mine-item ${className}`}>
      {icon ? <img src={icon} className='mine-setting-icon left-icon-position'/> : ''}
      <div className={paddingLeft}>
        <p className='cl-333'>{name}</p>
        {tip ? <p className='cl-666'>成绩排名尚未开通，敬请期待</p> : ''}
      </div>
      <div className='rightarrow-icon-position'>
        {newIcon ? newIcon : ''}
        {rightText ? <span className='cl-999 font-size024'>{rightText}</span> : ''}
        {dropyellow ? <img src={dropyellow} className='wh03'/> : ''}
        {isRightarrow ? <img src={rightarrow} className='rightarrow-icon'/> : ''}
      </div>
    </div>);
  }
}