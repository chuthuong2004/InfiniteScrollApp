import {removePropertyUndefined} from '../../utils/helpers';
import {axiosClient} from '../../lib';
import {QueryOptions, ResponsePagination, StoreProduct} from '../../types';

const URL = '/products';
const productService = {
  getAll: async (
    params: QueryOptions,
  ): Promise<ResponsePagination<StoreProduct>> => {
    console.log('Call API: ', params);
    let url = URL;
    if (params?.search && params?.search?.length > 0) {
      url += '/search';
      params.q = params.search;
    }
    delete params.search;

    params = removePropertyUndefined(params);
    console.log('PARAMS: ', params);

    return axiosClient.get(url, {params});
  },
};
export default productService;
