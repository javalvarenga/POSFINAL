import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

import { PROD_URL } from '@/utils';

const BASE_URL = 'api/sales';

const DownloadPDFButton = ({ saleId }) => {
    const handleOpenPDF = async () => {
        try {
            const response = await fetch(`${PROD_URL}/${BASE_URL}/ventas/${saleId}/pdf`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf'
                }
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob); // Crear la URL del blob

            // Abrir el PDF en una nueva pestaña
            window.open(url, '_blank'); // '_blank' abre una nueva pestaña
        } catch (error) {
            console.error('Error al abrir el PDF:', error);
        }
    };

    return <Button onClick={handleOpenPDF}>Obtener factura</Button>;
};

export default DownloadPDFButton;
