import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { BaseOptionChart } from '../../charts';
import { ApexOptions } from 'apexcharts';
import useGetSales from '@/hooks/sales/useGetSales';
import { format } from 'date-fns';

/*
sale: of salesList 
{
    "idVenta": 27,
    "fecha": "2024-10-02T00:00:00.000Z",
    "nombre": "prueba0",
    "producto": "Bocinas JBL, Laptop Asus",
    "cantidad": "2",
    "descuento": "10.00",
    "total": "15841.49"
}
*/

const AppWebsiteVisits = (): JSX.Element => {

    const [queryKey, setQueryKey] = useState(new Date());
    const { salesList, isFetching } = useGetSales(queryKey);

    // Consolidar datos de ventas por día
    const consolidatedDataByDay = salesList.reduce((acc, sale) => {
        const date = format(new Date(sale.fecha), 'dd/MM/yyyy');
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += parseFloat(sale.total);
        return acc;
    }, {});

    // Crear transformedData y labels a partir de los datos consolidados
    const transformedData = Object.keys(consolidatedDataByDay).map(date => ({
        x: new Date(date.split('/').reverse().join('-')).getTime(), // Convertir la fecha a timestamp
        y: consolidatedDataByDay[date] // Total de ventas para ese día
    }));

    const labels = Object.keys(consolidatedDataByDay);

    

    const CHART_DATA = [
        {
            name: 'Ventas',
            type: 'column',
            data: transformedData,
            color: '#7300DF',
        },
    ];

    const chartOptions: ApexOptions = merge(BaseOptionChart(), {
        stroke: { width: [3] },
        plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
        fill: { type: 'solid' },
        labels: labels,
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `Q${y.toFixed(2)}`;
                    }
                    return y;
                }
            }
        },
        chart: {
            zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: true
            }
        }
    });

    return (
        <Card>
            <CardHeader title="Ventas por día" subheader="total de ventas por día" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart
                    type="line"
                    series={CHART_DATA}
                    options={chartOptions}
                    height={364}
                />
            </Box>
        </Card>
    );
};

export default AppWebsiteVisits;
