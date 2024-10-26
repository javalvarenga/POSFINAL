import { useQuery } from 'react-query';
import camelcaseKeys from 'camelcase-keys';
import { useQueryConfig } from '../../utils/index';
import { getAccountReport } from '@/services/accounts';

const ReportAccounts = (queryKey) => {
  // Definir la clave de ejecución basada en la existencia de startDate y endDate
  const { data, isFetching } = useQuery(
    `AccountsReport-${queryKey}`,
    () => getAccountReport(),
    {
      ...useQueryConfig,
    }
  );

  const accountsList = data ? camelcaseKeys(data) : [];
  return { accountsList, isFetching };
};

export default ReportAccounts;