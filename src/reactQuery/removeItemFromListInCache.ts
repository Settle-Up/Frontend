import { QueryClient } from "react-query";

type ArrayElementType<T> = T extends (infer U)[] ? U : never;

type RemoveItemFromCacheParams<
  T,
  TArrayField extends keyof T,
  TArrayElement = ArrayElementType<T[TArrayField]>
> = {
  queryClient: QueryClient;
  queryKey: string | string[];
  listKey: TArrayField;
  identifierKey: keyof TArrayElement;
  identifierValue: any;
};

const removeItemFromListInCache = <
  T,
  TArrayField extends keyof T,
>({
  queryClient,
  queryKey,
  listKey,
  identifierKey,
  identifierValue,
}: RemoveItemFromCacheParams<T, TArrayField>) => {
  const cachedData = queryClient.getQueryData<T>(queryKey);

  if (cachedData) {
    const updatedList = (cachedData[listKey] as Array<any>).filter(
      (item) => {
        return item[identifierKey] !== identifierValue
      }
    );
    queryClient.setQueryData(queryKey, {
      ...cachedData,
      [listKey]: updatedList,
    });
  }
};

export default removeItemFromListInCache;
