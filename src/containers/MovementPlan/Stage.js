import React, {Component, PropTypes} from 'react';
import StageItem from './StageItem';
const styles = require('./MovementPlan.scss');

export default class Stage extends Component {
  render() {
    const { stageItems } = this.props;
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
