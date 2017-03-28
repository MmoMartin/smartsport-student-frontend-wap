import { TEST_SUBJECT, CALCULATOR } from 'constants/urls';
import {get, fetchList} from 'xunyijia-components/src/redux/publicAct';

// 获取测试项目
export function getTestSubjects() {
  return get({
    path: TEST_SUBJECT,
  });
}

// 计算测试项目的得分
export function getScore(filters, succ = {}, fail = {}) {  
  filters = { filters: filters};
  return fetchList({
    path: CALCULATOR,
    queryObj: filters,
    succ,
    fail
  });
}

// 清除计算器得分 
export function clearScore() {
  return (dispatch, req, getState) => {
    dispatch({
      type: 'clear_score'
    });
  };
}
