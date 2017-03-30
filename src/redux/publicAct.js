export {publicAct as default} from 'xunyijia';

// export function fetchList({path, queryObj, succ = (()=>{}), fail = (()=>{}), ...rest}) {
//   const beginType = `${path}_GET_BEGIN`;
//   const succType = `${path}_GET_SUCC`;
//   const failType = `${path}_GET_FAIL`;
//   const query = obj2query(queryObj);
//   path = `${path}${query ? '?' : ''}${query}`;
//   return sendReq(path, 'get', null, rest, succ, fail, beginType, succType, failType);
// }
