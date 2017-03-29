import { MOVEMENTPLAN_LIST, MOVEMENTPLAN_PROGRESS, RECOMMENDED_PLAN, EXECUTE_PLAN } from 'constants/urls';
import config from '../../../constants/config';
import { get, post } from 'xunyijia-components/src/redux/publicAct';

// 我的总计划完成进度
export function movementPlanProgress() {
  return get({
    path: MOVEMENTPLAN_PROGRESS,
  });
}

// 我的运动计划
export function getMovementPlanList() {
  return get({
    path: MOVEMENTPLAN_LIST
  });
}

// 获取推荐计划
export function fetchRecommendedPlan() {
  return get({
    path: RECOMMENDED_PLAN,
  });
}

// 执行计划
export function executePlan({ succ, body, fail }) {
  return post({path: EXECUTE_PLAN, body, succ, fail});
}
