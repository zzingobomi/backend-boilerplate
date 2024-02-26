import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResultType } from './types/infinity-pagination-result.type';

// TODO: hasNext 를 판단하는 기준이 만약 정확히 나누어진다면 마지막은 빈 배열이 들어오게 된다..
// infinity-pagination 말고 그냥 기본 pagination, 즉 total 등이 있는것도 필요할까?
export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResultType<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
