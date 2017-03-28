import React, {Component, PropTypes} from 'react';
import StageItem from './StageItem';
const styles = require('./MovementPlan.scss');

export default class Stage extends Component {
  render() {
    // const stageItems = [
    //   {
    //     title: '阶段一',
    //     color: '',
    //     time: '03月20日',
    //     type: '100米',
    //     status: '已完成',
    //   },
    //   {
    //     title: '阶段二',
    //     color: '',
    //     time: '03月20日',
    //     type: '100米',
    //     status: '已完成',
    //   },
    //   {
    //     title: '阶段三',
    //     color: '',
    //     time: '03月20日',
    //     type: '100米',
    //     status: '已完成',
    //   },
    //   {
    //     title: '阶段四',
    //     color: '',
    //     time: '03月20日',
    //     type: '100米',
    //     status: '已完成',
    //   },
    //   {
    //     title: '阶段五',
    //     color: '',
    //     time: '03月20日',
    //     type: '100米',
    //     status: '已完成',
    //   }
    // ];
    const { stageItems } = this.props;
    console.log(stageItems)
    return (
      <div>
        {
          StageItem({
            stageItems
          })
        }
      </div>
    );
  }
}
