import { MOVEMENTPLAN_LIST, MOVEMENTPLAN_PROGRESS } from 'constants/urls';
import config from '../../../constants/config';
import { get } from 'xunyijia-components/src/redux/publicAct';

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
