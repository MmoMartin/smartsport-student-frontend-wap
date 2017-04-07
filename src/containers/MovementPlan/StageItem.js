import React, {Component, PropTypes} from 'react';
const styles = require('./MovementPlan.scss');

export default ({ stageItems = [] }) => {
  const array = [];
  stageItems.map((item, index) => {
    array.push(createStageItem(item, index));
  });
  return array;
};

function createStageItem(item, index) {
  if (Object.values(item.timeStatus).includes(false)) {
    item.dotColor = '#f18269';
  } else {
    item.dotColor = '#4fb26b';
  }
  return (
    <div style={{marginTop: '0.22rem', fontSize: '0.22rem'}} key={item.content + '' + index}>
      <div>
        <div className={styles.stageItemDot} style={{backgroundColor: item.dotColor}}></div>
        <span className={styles.stageItem}>阶段{item.seq}</span>
      </div>
      {
        Object.entries(item.timeStatus) && Object.entries(item.timeStatus).map((timeItem) => {
          const color = timeItem[1] ? '#4fb26b' : '#f68461';
          return (
            <div key={timeItem[0]}>
              <span className={styles.stageItemDate}>{timeItem[0]}</span>
              <span className={styles.stageItemType}>{item.content}</span>
              <span className={styles.stageItemStatus} style={{color: color}}>{timeItem[1] ? '已完成' : '未完成'}</span>
            </div>
          );
        })
      }
    </div>
  );
}
