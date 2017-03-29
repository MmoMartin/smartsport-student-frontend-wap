import { MOVEMENTPLAN_LIST, MOVEMENTPLAN_PROGRESS, RECOMMENDED_PLAN } from 'constants/urls';
import config from '../../../constants/config';
const initialState = {
  movementPlanList: [],
  progressRate: 0.0,
  RecommendData: [],
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
    case `${RECOMMENDED_PLAN}_GET_SUCC`:
      return {
        ...state,
        RecommendData: data,
      };
    default:
      return state;
  }
}
