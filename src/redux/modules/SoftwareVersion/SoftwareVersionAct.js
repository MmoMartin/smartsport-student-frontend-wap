import {fetchList, get} from 'redux/publicAct';
import {SOFTWARE_VERSION, STUDENT_SELF_INFO} from 'constants/urls';
export function getNewSwVersion() {
  const queryObj = {'filters': { "name": 1, "platform": 1 }};
  return fetchList({
    path: SOFTWARE_VERSION, queryObj
  });
}
export function getStudentInfo() {
  return get({
    path: STUDENT_SELF_INFO
  });
}