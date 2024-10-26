import axios from 'axios';

const PROD_URL = 'http://localhost:3001';
const BASE_URL = 'api/accounts';

export const getAccountReport = async () => {

    const url = `${PROD_URL}/${BASE_URL}/getAccountReport`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const updateAccountSaldo = async (idAccount, saldoAccount) => {

    const url = `${PROD_URL}/${BASE_URL}/updateAccountSaldo`;

   try {
        const response = await axios.post(url, { idAccount, saldoAccount });
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};



