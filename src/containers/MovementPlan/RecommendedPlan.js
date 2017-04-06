import React, {Component, PropTypes} from 'react';
import RecommendedPlanItem from './RecommendedPlanItem';

export default class RecommendedPlan extends Component {
  render() {
    const {RecommendedPlanItems} = this.props;
    return (
      <div style={{backgroundColor: '#f5fff8'}}>
        {
          RecommendedPlanItem({
            RecommendedPlanItems
          })
        }
      </div>
    );
  }
}
