export default function clientMiddleware(request) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, request, getState);
      } else {
        return next(action);
      }
    };
  };
}
