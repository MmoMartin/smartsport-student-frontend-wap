import React, {Component, PropTypes} from 'react';
const styles = require('./MovementPlan.scss');
export default ({ RecommendedPlanItems = [] }) => {
  const recommendedPlanArr = [];
  RecommendedPlanItems.map((item, index) => {
    recommendedPlanArr.push(createRecomItem(item, index));
  });
  return recommendedPlanArr;
};

function createRecomItem(item, index) {
  return (
    <div style={{padding: "0.3rem 0.5rem", fontSize: '0.22rem'}}
         className='clearfix'
         key={item.seq}>
      <div className='fl' style={{width: '50%'}}>
        <div className={styles.stageItemDot}></div>
      <span style={{display: 'inline-block', marginLeft: '0.25rem'}}>阶段{item.seq}</span>
      </div>
      <div className='cycle'>
        <span style={{width: '30%'}}>{item.days}天</span>
      <span style={{minWidth: '50%', float: 'right'}}>{item.content}</span>
      </div>
    </div>
  );
}
