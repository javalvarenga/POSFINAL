import React, { useState } from 'react';

import Page from '@/components/Page';
import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import SlidingPane from '@/components/SlidingPane';
import CreateSalesForm from '@/components/_dashboard/sales/CreateSalesForm';
import useGetSales from '@/hooks/sales/useGetSales';
import DynamicTable from '@/components/DynamicTable';
import { fDateTime } from '@/utils/formatTime';



const Sales = (): JSX.Element => {

    const [openSlideCreateSales, setOpenSlideCreateSales] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { salesList, isFetching } = useGetSales(queryKey);
    console.log('Sales List: ',salesList)
    const columns = [
        { id: 'idVenta', label: 'ID Venta' },
        { id: 'fecha', label: 'Fecha ' },
        { id: 'nombre', label: 'Cliente' },
        { id: 'producto', label: 'Productos' },
        { id: 'cantidad', label: 'Cantidad'},
        { id: 'descuento', label: 'Descuento'},
        { id: 'total', label: 'Total'},
        
    ];

    const mappedData = salesList?.map((sale) => ({
        ...sale,
        fecha: fDateTime(sale.fecha),
    }));
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
                    <DynamicTable columns={columns} data={mappedData} />
                </Stack>
                <SlidingPane
                title="Crear nueva venta"
                content={
                    <CreateSalesForm  onFinish={() => {
                        setOpenSlideCreateSales(false) ;
                        setQueryKey(queryKey + 1);
                    }}/>
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
