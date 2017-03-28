import { CHECK_AVAILABLE_DEVICES, BIND_DEVICE, UNBIND_DEVICE } from 'constants/urls';
import config from '../../../constants/config';
import { post } from 'xunyijia-components/src/redux/publicAct';

// 检查可绑定设备
export function checkAvailableDevices(obj = {}) {
  const body = obj.params;
  return post({
    path: CHECK_AVAILABLE_DEVICES,
    body,
  });
}

// 绑定设备
export function bindDevice(obj = {}) {
  const body = obj.params;
  const succ = obj.succ;
  const fail = obj.fail;
  return post({
    path: BIND_DEVICE,
    body,
    succ,
    fail,
  });
}

// 解绑设备
export function unbindDevice() {
  return post({
    path: UNBIND_DEVICE,
  });
}
