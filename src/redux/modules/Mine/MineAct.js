import { STUDENT_SELF_INFO, HEAD_PORTRAIT, CHENGE_HEAD_PORTRAIT } from 'constants/urls';
import {fetchList, post, get, put} from 'xunyijia-components/src/redux/publicAct';

export function getUserInfo() {
  return (dispatch, req) => {
    // const succTemp = (data)=>{
    //   console.log('succTemp', data);
    //   const url = data.icon;
    //   dispatch(getImgStr(url, req));
    // };
    dispatch(get({
      path: STUDENT_SELF_INFO,
      // succ: succTemp
    }));
  };
}
export function getImgStr(url) {
  return (dispatch, req)=>{
    req.get(url).then(data => {
      dispatch({
        type: HEAD_PORTRAIT,
        data: data
      });
    });
  };
}
export function changeHeadPortrait(body) {
  return (dispatch, req) => {
    dispatch(put({
      path: CHENGE_HEAD_PORTRAIT,
      body: {icon: body},
      succ: () => {dispatch(getUserInfo());}
    }));
  };
}