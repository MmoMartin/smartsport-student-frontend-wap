import { HEALTH_REPORT }from 'constants/urls';
import { get } from 'xunyijia-components/src/redux/publicAct';

// 获取预警库列表
export function fetchHealthReport() {
  return get({
    path: HEALTH_REPORT
  });
}
