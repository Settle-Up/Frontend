import { QueryClient } from "react-query";

type ArrayElementType<T> = T extends (infer U)[] ? U : never;

type UpdateRootObjectParams<T> = {
  queryClient: QueryClient;
  queryKey: string | string[];
  updatedData: Partial<T>;
};

type UpdateNestedObjectListParams<
  T,
  TArrayField extends keyof T,
  TArrayElement = ArrayElementType<T[TArrayField]>
> = {
  queryClient: QueryClient;
  queryKey: string | string[];
  listKey: TArrayField;
  identifierKey: keyof TArrayElement;
  identifierValue: any;
  updatedData: Partial<TArrayElement>;
};

type UpdateItemInCacheParams<T> =
  | UpdateRootObjectParams<T>
  | UpdateNestedObjectListParams<T, keyof T, ArrayElementType<T[keyof T]>>;

const updateCache = <T>(params: UpdateItemInCacheParams<T>) => {
  const { queryClient, queryKey, updatedData } = params;

  const cachedData: T | undefined = queryClient.getQueryData<T>(queryKey);

  if (cachedData) {
    let updatedCacheData;
    if ("listKey" in params) {
      const arrayField = params.listKey as keyof T;
      const items = (cachedData[arrayField] as Array<any>) ?? [];
      const updatedItems = items.map((item) => {
        if (item[params.identifierKey] === params.identifierValue) {
          return { ...item, ...params.updatedData };
        }
        return item;
      });

      updatedCacheData = { ...cachedData, [arrayField]: updatedItems };
    } else {
      updatedCacheData = { ...cachedData, ...updatedData };
    }
    queryClient.setQueryData<T>(queryKey, updatedCacheData);
  }
};

export default updateCache;
