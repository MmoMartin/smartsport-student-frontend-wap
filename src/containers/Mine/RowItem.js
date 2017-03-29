import React, {Component, PropTypes} from 'react';
export default class Home extends Component {
  render() {
    const {name, icon, style, className} = this.props;
    return (<div style={{textAlign: 'center', position: 'relative'}} className={className}>
      <img src={icon} className='mine-setting-icon'/>
      <span className='font-size18 display-block'>{name}</span>
    </div>);
  }
}