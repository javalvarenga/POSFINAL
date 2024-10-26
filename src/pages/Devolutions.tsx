import React, { useState } from 'react';

import Page from '@/components/Page';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import SlidingPane from '@/components/SlidingPane';
import CreateCategoryForm from '@/components/_dashboard/categories/CreateCategoryForm';
import useGetDevolutions from '@/hooks/devolutions/useGetDevolutions';
import DynamicTable from '@/components/DynamicTable';
import CreateDevolutionsForm from '@/components/_dashboard/devolutions/CreateDevolutionsForm';
import { fDate } from '@/utils/formatTime';
import BasicIndicator from '@/components/_dashboard/products/BasicIndicator';

const Devolutions = (): JSX.Element => {
    const [openSlideCreateDevolucion, setOpenSlideCreateDevolucion] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { devolutionsList, isFetching } = useGetDevolutions(queryKey);

    const totaldevolutions = devolutionsList.length;

    console.log(devolutionsList);
    // columnas para la tabla:
    const columns = [
        { id: 'idDevolucion', label: 'ID Devolución' },
        { id: 'idVenta', label: 'ID Venta' },
        { id: 'cantidadProductosDevueltos', label: 'Productos Devueltos' },
        { id: 'motivo', label: 'Motivo' },
        { id: 'fechaDevolucion', label: 'Fecha Devolución' },
        { id: 'totalVenta', label: 'Total Venta' },
        { id: 'productosDevueltos', label: 'Nombre de los Productos' },
    ];

    const mapeddata = devolutionsList.map((devolucion) => {
        return {
            ...devolucion,
            fechaDevolucion: fDate(devolucion.fechaDevolucion),
        };
    });
    
    return (
        <Page title="Devoluciones">
            <Container>
                <Typography variant="h4">Devoluciones</Typography>
                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} sm={6} md={3}>
                        <BasicIndicator
                            title="Devoluciones"
                            value={totaldevolutions}
                            currency={false}
                            icon="lsicon:sales-return-outline"
                        />
                    </Grid>
                </Grid>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 5 }}
                >
                    <IconButton
                        onClick={() => {
                            setOpenSlideCreateDevolucion(true);
                        }}
                    >
                        <Icon icon="ant-design:plus-outlined" />
                    </IconButton>
                    <DynamicTable columns={columns} data={mapeddata} />
                </Stack>
            </Container>

            <SlidingPane
                title="Crear nueva devolución"
                content={
                    <CreateDevolutionsForm
                        onFinish={() => {
                            setQueryKey(queryKey + 1);
                            setOpenSlideCreateDevolucion(false);
                        }} />
                }
                isOpenSlide={openSlideCreateDevolucion}
                onCloseSlide={() => {
                    setOpenSlideCreateDevolucion(false);
                }}
            />
        </Page>
    );
};

export default Devolutions;
