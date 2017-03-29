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
    <div style={{marginBottom: '0.1rem', lineHeight: '1.1rem', padding: "0 0.5rem"}}
         className='clearfix'
         key={item.seq}>
      <div className='fl' style={{width: '50%'}}>
        <div className={styles.stageItemDot}></div>
      <span style={{display: 'inline-block', marginLeft: '0.25rem'}}>阶段{item.seq}</span>
      </div>
      <div className='fr' style={{minWidth: '28%'}}>
        <span >{item.days}天</span>
      <span style={{ marginLeft: '0.6rem'}}>{item.content}</span>
      </div>
    </div>
  );
}
