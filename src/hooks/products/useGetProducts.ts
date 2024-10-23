

import { useQuery } from 'react-query';
import camelcaseKeys from 'camelcase-keys';
import { useQueryConfig } from '../../utils/index';
import { getAllProducts } from '@/services/products';

const useGetProducts = (queryKey) => {
  // Definir la clave de ejecución basada en la existencia de startDate y endDate
  const { data, isFetching } = useQuery(
    `Products-${queryKey}`,
    () => getAllProducts(),
    {
      ...useQueryConfig,
    }
  );

  const productsList = data ? camelcaseKeys(data) : [];
  return { productsList, isFetching };
};

export default useGetProducts;
