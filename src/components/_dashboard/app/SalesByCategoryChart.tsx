import React, { useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { fNumber } from '@/utils/formatNumber';
import { BaseOptionChart } from '@/components/charts';
import { ApexOptions } from 'apexcharts';
import useGetCategoriesReport from '@/hooks/categories/useGetCategoriesReport';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
}));

// ----------------------------------------------------------------------

const SalesByCategoryChart = (): JSX.Element => {
    const [queryKey, setQueryKey] = useState(new Date());
    const { categoriesList, isFetching } = useGetCategoriesReport(queryKey);

    // Calcular el total de ventas para todas las categorías
    const totalSales =
        categoriesList?.reduce((total, category) => total + parseFloat(category.totalSales), 0) ||
        0;

    // Obtener los nombres de las categorías y los porcentajes de ventas
    const categoryNames = categoriesList?.map((category) => category.categoryName) || [];

    const salesPercentages =
        categoriesList?.map((category) =>
            parseFloat(((parseFloat(category.totalSales) / totalSales) * 100).toFixed(0))
        ) || [];

    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut'
        },
        colors: [
            '#2C40BF',
            '#FCBA04',
            '#F45866',
            '#C73ED6',
            '#F45866',
            '#631A86'
        ],
        labels: categoryNames,
        legend: {
            show: true,
            position: 'bottom'
        },
        tooltip: {
            y: {
                formatter: (val, { series, seriesIndex }) => {
                    const totalSalesForCategory = categoriesList[seriesIndex]?.totalSales || 0;
                    return `${val.toFixed(0)}% (${fNumber(totalSalesForCategory)} ventas)`;
                }
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '100%',
                    labels: {
                        show: true,
                        total: {
                            label: 'Total',
                            formatter: () => `${totalSales.toFixed(0)}`,
                            color: '#fff'
                        }
                    }
                }
            }
        }
    };

    return (
        <Card>
            <CardHeader title="Ventas Por Categoría" />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart
                    type="pie"
                    series={salesPercentages}
                    options={chartOptions}
                    height={350}
                />
            </ChartWrapperStyle>
        </Card>
    );
};

export default SalesByCategoryChart;
