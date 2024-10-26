import React, { useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import Page from '@/components/Page';
import {
    AppTasks,
    AppNewUsers,
    AppBugReports,
    AppItemOrders,
    AppNewsUpdate,
    AppWeeklySales,
    AppOrderTimeline,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppCurrentSubject,
    AppConversionRates,
    SalesByCategoryChart
} from '@/components/_dashboard/app';
/* import useGetCategories from '@/hooks/categories/useGetCategories';*/
import BasicIndicator from '@/components/_dashboard/products/BasicIndicator';
import useGetSales from '@/hooks/sales/useGetSales';
import useGetProducts from '@/hooks/products/useGetProducts';
import useGetDevolutions from '@/hooks/devolutions/useGetDevolutions';

/* 
{
    "idVenta": 28,
    "fecha": "2024-10-25T00:00:00.000Z",
    "nombre": "abraham",
    "producto": "Bocinas JBL, Laptop Asus, Monitor ASUS",
    "cantidad": "3",
    "descuento": "10.00",
    "total": "17341.49"
}
*/

const DashboardApp = (): JSX.Element => {
    const [queryKey, setQueryKey] = useState(new Date());
    const { salesList, isFetching } = useGetSales(queryKey);
    const { productsList, isFetching: isFetchingProducts } = useGetProducts(queryKey);
    const { devolutionsList, isFetching: isFetchingDevolutions } = useGetDevolutions(queryKey);

    const totalSoldRevenue = salesList.reduce((acc, sale) => {
        return acc + parseFloat(sale.total);
    }, 0);

    const saledProducts = salesList.reduce((acc, sale) => {
        return acc + parseFloat(sale.cantidad);
    }, 0);

    const stock = productsList.reduce((acc, product) => {
        return acc + parseFloat(product.quantity);
    }, 0);


    const totaldevolutions = devolutionsList.length;


    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Visión General del Punto de Venta</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <BasicIndicator
                            title={'Total vendido'}
                            value={totalSoldRevenue}
                            icon={'ant-design:money-collect'}
                            currency={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <BasicIndicator
                            title={'Productos vendidos'}
                            value={saledProducts}
                            icon={'akar-icons:shipping-box-v2'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <BasicIndicator
                            title={'stock disponible'}
                            value={stock}
                            icon={'gridicons:product'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <BasicIndicator
                            title="Devoluciones"
                            value={totaldevolutions}
                            icon={'lsicon:sales-return-outline'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <SalesByCategoryChart />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default DashboardApp;
