import axios from 'axios';

const PROD_URL = 'http://localhost:3001';
const BASE_URL = 'api/returns';

export const createDevolucion = async (devolucion) => {
    const url = `${PROD_URL}/${BASE_URL}/createDevolucion`;

    try {
        const response = await axios.post(url, devolucion);
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const getDevolutions = async () => {
    const url = `${PROD_URL}/${BASE_URL}/getDevoluciones`;

    try {
        const response = await axios.get(url);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};
