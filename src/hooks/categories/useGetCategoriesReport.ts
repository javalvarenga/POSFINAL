

import { useQuery } from 'react-query';
import camelcaseKeys from 'camelcase-keys';
import { useQueryConfig } from '../../utils/index';
import { getCategoriesReport } from '@/services/categories';

const useGetCategoriesReport = (queryKey) => {
  // Definir la clave de ejecución basada en la existencia de startDate y endDate
  const { data, isFetching } = useQuery(
    `CategoriesReport-${queryKey}`,
    () => getCategoriesReport(),
    {
      ...useQueryConfig,
    }
  );

  const categoriesList = data ? camelcaseKeys(data) : [];
  return { categoriesList, isFetching };
};

export default useGetCategoriesReport;
