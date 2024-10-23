import axios from 'axios';

const PROD_URL = 'http://localhost:3001';
const BASE_URL = 'api/products';

export const getAllProducts = async () => {
    /*     const serviceToken = window.localStorage.getItem('serviceToken');
     */
    const url = `${PROD_URL}/${BASE_URL}/getProducts`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching billing orders:', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    /*     const serviceToken = window.localStorage.getItem('serviceToken');
     */
    const url = `${PROD_URL}/${BASE_URL}/createProduct`;

    try {
        const response = await axios.post(url,{ body: product });
        return response.data;
    } catch (error) {
        console.error('Error fetching billing orders:', error);
        throw error;
    }
};



export const getProduct = async (productId) => {
    /*     const serviceToken = window.localStorage.getItem('serviceToken');
     */
    const url = `${PROD_URL}/${BASE_URL}/agregarClienteYVenta`;

    try {
        const response = await axios.get(url, {
            /* headers: {
            Authorization: `${serviceToken}`
            }, */
            params: {
                productId: productId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching billing orders:', error);
        throw error;
    }
};