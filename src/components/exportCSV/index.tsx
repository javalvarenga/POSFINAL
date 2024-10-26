import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import React from 'react';

const ExportCSV = ({ data, columns }) => {
    const handleExport = () => {
        // Convertir los objetos a CSV
        const csvRows = [];

        // Agregar las cabeceras desde la definición de columnas usando 'label'
        const headers = columns.map((col) => col.label); // Obtener los nombres de las columnas
        csvRows.push(headers.join(',')); // Agregar las cabeceras al CSV

        // Agregar las filas de datos
        for (const row of data) {
            const rowData = columns.map((col) => JSON.stringify(row[col.id], replacer)); // Usar 'id' para obtener el valor
            csvRows.push(rowData.join(',')); // Convertir a CSV
        }

        const csvString = csvRows.join('\n'); // Unir todas las filas
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' }); // Crear un Blob
        const url = URL.createObjectURL(blob); // Crear un URL del Blob
        const link = document.createElement('a'); // Crear un enlace
        link.href = url;
        link.setAttribute('download', 'data.csv'); // Nombre del archivo
        document.body.appendChild(link);
        link.click(); // Simular clic para descargar
        document.body.removeChild(link); // Limpiar el DOM
    };

    // Reemplaza caracteres especiales en los valores CSV
    const replacer = (key, value) => (value === null ? '' : value);

    return (
        /* flex end */
        <div  style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleExport}>
                <Icon icon={'vscode-icons:file-type-excel'} fontSize={30} />
            </IconButton>
        </div>
    );
};

export default ExportCSV;
