import {
  MY_DEVICES_LIST,
  UNBIND_DEVICE,
  SYNC_RUN_DATA,
  SYNC_HRM_DATA,
  SYNC_BLOOD_DATA,
} from 'constants/urls';
import { get, post } from 'xunyijia-components/src/redux/publicAct';

// 解绑设备
export function unbindDevice() {
  return post({
    path: UNBIND_DEVICE,
  });
}

// 获取个人设备列表
export function ownDevicesList() {
  return get({
    path: MY_DEVICES_LIST,
  });
}

// 改变连接状态
export function chagneConnectStatus(status = {}) {
  return ({
    type: 'CHANGE_CONNECT_STATUS',
    status
  });
}

// 同步步数数据
export function syncRunData(obj = {}) {
  const body = obj.params;
  return post({
    path: SYNC_RUN_DATA,
    body,
  });
}
// 同步心率数据
export function syncHRMData(obj = {}) {
  const body = obj.params;
  return post({
    path: SYNC_HRM_DATA,
    body,
  });
}

// 同步血管数据
export function syncBloodData(obj = {}) {
  const body = obj.params;
  return post({
    path: SYNC_BLOOD_DATA,
    body,
  });
}
