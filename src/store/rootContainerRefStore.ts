import { atom } from 'recoil';
import { RefObject } from 'react';

export const rootContainerRefState = atom<RefObject<HTMLDivElement> | null>({
  key: 'rootContainerRefState',  
  default: null,  
});
