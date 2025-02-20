import {QueryOptions, ResponsePagination} from '@/types/common.type';
import {StoreProduct} from '@/types/entities';
import axiosClient from '@lib/axios';
import {removePropertyUndefined} from '@utils/helpers';

const URL = '/products';
const productService = {
  getAll: async (
    params: QueryOptions,
  ): Promise<ResponsePagination<StoreProduct>> => {
    let url = URL;
    if (params?.search && params?.search?.length > 0) {
      url += '/search';
      params.q = params.search;
    }
    delete params.search;

    params = removePropertyUndefined(params);

    return axiosClient.get(url, {params});
  },
  getById: async (id: StoreProduct['id']): Promise<StoreProduct> =>
    axiosClient.get(`${URL}/${id}`),
};
export default productService;
