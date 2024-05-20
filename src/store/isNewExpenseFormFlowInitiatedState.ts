import { atom } from 'recoil';

export const isNewExpenseFormFlowInitiatedState = atom({
  key: 'formFlowStartedState',
  default: false  
});
