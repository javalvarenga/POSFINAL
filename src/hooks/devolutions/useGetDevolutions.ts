

import { useQuery } from 'react-query';
import camelcaseKeys from 'camelcase-keys';
import { useQueryConfig } from '../../utils/index';
import { getDevolutions } from '@/services/devolutions';

const useGetDevolutions = (queryKey) => {
  // Definir la clave de ejecución basada en la existencia de startDate y endDate
  const { data, isFetching } = useQuery(
    `devolutionsList-${queryKey}`,
    () => getDevolutions(),
    {
      ...useQueryConfig,
    }
  );

  const devolutionsList = data ? camelcaseKeys(data) : [];
  return { devolutionsList, isFetching };
};

export default useGetDevolutions;
