import axios from 'axios';

const PROD_URL = 'http://localhost:3001';
const BASE_URL = 'api/sales';



export const createSale = async (sale) => {

    const url = `${PROD_URL}/${BASE_URL}/createSales`;

    try {
        const response = await axios.post(url, { ...sale });
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const getSales = async () => {

    const url = `${PROD_URL}/${BASE_URL}/getSales`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};