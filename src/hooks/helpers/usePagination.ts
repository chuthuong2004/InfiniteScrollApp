import {QueryOptions, ResponsePagination} from '@/types/index';
import {useCallback, useState} from 'react';
import useSWR from 'swr';

type Fetcher<T> = (query: QueryOptions) => Promise<ResponsePagination<T>>;

export function usePagination<T>(
  key: string,
  query: QueryOptions,
  fetcher: Fetcher<T>,
  inverted?: boolean,
  loadMoreByOffset = true,
  swrConfig = {},
) {
  const [isLoadMore, setIsLoadMore] = useState(false);
  const callback = useCallback(() => {
    return fetcher(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const {data, error, isValidating, isLoading, mutate} = useSWR(
    `${key}${query.search ?? ''}`,
    callback,
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      ...swrConfig,
    },
  );

  /**
   * @remarks
   * This callback will be load more data
   * @see {@link http://example.com/@internal | the @internal tag}
   */
  const loadMore = useCallback(async () => {
    console.log('Load more');

    if (data && data?.products.length < data?.total && !isLoadMore) {
      console.log('Call load more');
      setIsLoadMore(true);
      const currentPage = Math.ceil(data?.products?.length / data.limit);
      const filter = loadMoreByOffset
        ? {skip: data?.products?.length || 0}
        : {page: currentPage + 1};
      const updateData = await fetcher({
        ...query,
        ...filter,
      });
      console.log('updateData: ', updateData);

      mutate(
        (prevData: ResponsePagination<T> | undefined) => {
          if (!prevData) {
            return undefined;
          }
          return {
            ...updateData,
            products: inverted
              ? [...updateData.products, ...prevData.products]
              : [...prevData.products, ...updateData.products],
          };
        },
        {revalidate: false},
      );
      setIsLoadMore(false);
    }
  }, [data, isLoadMore, loadMoreByOffset, fetcher, query, mutate, inverted]);

  /**
   * This callback wile be refresh data
   */
  const refresh = useCallback(async () => {
    const updateData = await fetcher({
      ...query,
      skip: loadMoreByOffset ? 0 : undefined,
    });
    mutate(updateData, {revalidate: false});
  }, [fetcher, loadMoreByOffset, mutate, query]);
  const onEndReached = useCallback(
    (info: {distanceFromEnd: number}) => {
      console.log('🔥 onEndReached CALLED!');
      console.log('info: ', info);

      if (data && data?.products?.length > 0) {
        loadMore();
      }
    },
    [data, loadMore],
  );
  return {
    data,
    isLoading: isLoading,
    isError: !!error,
    loadMore,
    isLoadMore,
    refresh,
    isValidating,
    onEndReached,
  };
}
