import { TEST_SUBJECT, CALCULATOR } from 'constants/urls';

const initialState = {
  testSubjectsList: [], // 测试项目数组
  score: '', // 得分
};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${TEST_SUBJECT}_GET_SUCC`:
      return {
        ...state,
        testSubjectsList: data
      };
    case `${CALCULATOR}_GET_SUCC`:
      data = data[0] || {};
      return {
        ...state,
        score: data.score,
      };
    case 'clear_score':
      return {
        ...state,
        score: ''
      };
    default:
      return state;
  }
}