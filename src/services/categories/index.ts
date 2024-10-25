import axios from 'axios';

const PROD_URL = 'http://localhost:3001';
const BASE_URL = 'api/categories';



export const createCategory = async (categoryName) => {

    const url = `${PROD_URL}/${BASE_URL}/createCategory`;

    try {
        const response = await axios.post(url, { categoryName });
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const getCategories = async () => {

    const url = `${PROD_URL}/${BASE_URL}/getCategories`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

export const getCategoriesReport = async () => {

    const url = `${PROD_URL}/${BASE_URL}/getCategoriesReport`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};
