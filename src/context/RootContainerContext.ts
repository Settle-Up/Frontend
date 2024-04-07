import { createContext, RefObject } from 'react';

const RootContainerContext = createContext<RefObject<HTMLDivElement> | null>(null);

export default RootContainerContext;
