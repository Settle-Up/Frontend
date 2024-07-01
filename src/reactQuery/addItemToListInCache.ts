import { QueryClient } from "react-query";

type ArrayKeys<T> = {
  [P in keyof T]: T[P] extends Array<any> ? P : never;
}[keyof T];

type ArrayElementType<T> = T extends (infer U)[] ? U : never;

type AddItemToCacheParams<
  T,
  TArrayField extends ArrayKeys<T>,
  TArrayElement = ArrayElementType<T[TArrayField]>
> = {
  queryClient: QueryClient;
  queryKey: string | string[];
  item: TArrayElement;
  listKey: TArrayField;
};

const addItemToListInCache = <T, TArrayField extends ArrayKeys<T>>({
  queryClient,
  queryKey,
  item,
  listKey,
}: AddItemToCacheParams<T, TArrayField>) => {
  const cachedData: T | undefined = queryClient.getQueryData<T>(queryKey);

  if (cachedData) {
    const currentArray: Array<any> = (cachedData[listKey] as any[]) || [];
    const updatedList = [...currentArray, item];
    queryClient.setQueryData(queryKey, {
      ...cachedData,
      [listKey]: updatedList,
    });
  }
};

export default addItemToListInCache;
