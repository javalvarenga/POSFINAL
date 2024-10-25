

import { useQuery } from 'react-query';
import camelcaseKeys from 'camelcase-keys';
import { useQueryConfig } from '../../utils/index';
import { getSales } from '@/services/sales';

const useGetSales = (queryKey) => {
  // Definir la clave de ejecución basada en la existencia de startDate y endDate
  const { data, isFetching } = useQuery(
    `SalesList-${queryKey}`,
    () => getSales(),
    {
      ...useQueryConfig,
    }
  );

  const salesList = data ? camelcaseKeys(data) : [];
  return { salesList, isFetching };
};

export default useGetSales;
