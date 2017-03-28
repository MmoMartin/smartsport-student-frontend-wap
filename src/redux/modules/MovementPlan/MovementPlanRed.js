import { MOVEMENTPLAN_LIST, MOVEMENTPLAN_PROGRESS } from 'constants/urls';
import config from '../../../constants/config';
const initialState = {
  movementPlanList: [],
  progressRate: 0.0,
};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${MOVEMENTPLAN_PROGRESS}_GET_SUCC`:
      return {
        ...state,
        progressRate: data.rate,
      };
    case `${MOVEMENTPLAN_LIST}_GET_SUCC`:
      return {
        ...state,
        movementPlanList: data
      };
    default:
      return state;
  }
}
