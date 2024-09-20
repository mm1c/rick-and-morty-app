import { useQueries } from "@tanstack/react-query";

export const useParallelQueries = <ItemType, ResponseType>(
  queryKey: string,
  items: ItemType[],
  fetchFn: (item: ItemType) => Promise<ResponseType>
) => {
  const queries = useQueries({
    queries: items.map((item) => {
      return {
        queryKey: [queryKey, item],
        queryFn: () => fetchFn(item),
      };
    }),
  });

  const isAnyQueryLoading = queries.some((query) => query.isLoading);

  return {
    queries,
    isAnyQueryLoading,
  };
};
