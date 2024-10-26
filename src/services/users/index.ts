import axios from 'axios';

import { PROD_URL } from '@/utils';const BASE_URL = 'api/users';


export const login = async (user) => {

    const url = `${PROD_URL}/${BASE_URL}/login`;

    try {
        const response = await axios.post(url, { ...user });
        return response.data;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
};

