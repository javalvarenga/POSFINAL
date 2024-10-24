

import { useQuery } from 'react-query';
import camelcaseKeys from 'camelcase-keys';
import { useQueryConfig } from '../../utils/index';
import { getCategories } from '@/services/categories';

const useGetCategories = (queryKey) => {
  // Definir la clave de ejecución basada en la existencia de startDate y endDate
  const { data, isFetching } = useQuery(
    `Categories-${queryKey}`,
    () => getCategories(),
    {
      ...useQueryConfig,
    }
  );

  const categoriesList = data ? camelcaseKeys(data) : [];
  return { categoriesList, isFetching };
};

export default useGetCategories;
