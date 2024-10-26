import axios from 'axios';

import { PROD_URL } from '@/utils';
const BASE_URL = 'api/products';

export const getAllProducts = async () => {
    const url = `${PROD_URL}/${BASE_URL}/getProducts`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    const url = `${PROD_URL}/${BASE_URL}/createProduct`;

    try {
        const response = await axios.post(url, { ...product });
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const getProduct = async (productId) => {
    const url = `${PROD_URL}/${BASE_URL}/getProduct/`;

    try {
        const response = await axios.get(url, {
            params: {
                productId: productId
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    const url = `${PROD_URL}/${BASE_URL}/deleteProduct/${productId}`;

    try {
        const response = await axios.delete(url);

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateProduct = async (product) => {
    const url = `${PROD_URL}/${BASE_URL}/updateProduct`;

    try {
        const response = await axios.put(url, { ...product });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
