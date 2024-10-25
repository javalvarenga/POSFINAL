import React, { useState } from 'react';

import Page from '@/components/Page';
import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import SlidingPane from '@/components/SlidingPane';
import CreateSalesForm from '@/components/_dashboard/sales/CreateSalesForm';
import useGetSales from '@/hooks/sales/useGetSales';
import DynamicTable from '@/components/DynamicTable';



const Sales = (): JSX.Element => {

    const [openSlideCreateSales, setOpenSlideCreateSales] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { salesList, isFetching } = useGetSales(queryKey);
    console.log(salesList);
    const columns = [
        { id: 'categoryId', label: 'ID' },
        { id: 'categoryName', label: 'Nombre de la categoría' },
        { id: 'totalProducts', label: 'Total de productos' },
        { id: 'totalStock', label: 'Stock total' },
        
    ];


    return (
        <Page title="User | Minimal-UI">
        <Typography variant ="h2">  Ventas</Typography>
        <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 5 }}
                >
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <div>
                            <IconButton
                                onClick={() => {
                                    setOpenSlideCreateSales(true);
                                }}
                            >
                                <Icon icon="ant-design:plus-outlined" />
                            </IconButton>
                        </div>{' '}
                    </Stack>
                    <DynamicTable columns={columns} data={salesList} />
                </Stack>
                <SlidingPane
                title="Crear nueva venta"
                content={
                    <CreateSalesForm/>
                }
                isOpenSlide={openSlideCreateSales}
                onCloseSlide={() => {
                    setOpenSlideCreateSales(false);
                }}
            />
                        
        </Page>
    );
};

export default Sales;
