import React, { useState } from 'react';

import Page from '@/components/Page';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import SlidingPane from '@/components/SlidingPane';
import CreateCategoryForm from '@/components/_dashboard/categories/CreateCategoryForm';
import useGetDevolutions from '@/hooks/devolutions/useGetDevolutions';
import DynamicTable from '@/components/DynamicTable';

const Devolutions = (): JSX.Element => {
    const [openSlideCreateCategory, setOpenSlideCreateCategory] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { devolutionsList, isFetching } = useGetDevolutions(queryKey);

    console.log(devolutionsList);
    // columnas para la tabla:
    const columns = [
        { id: 'idDevolucion', label: 'ID Devolución' },
        { id: 'idVenta', label: 'ID Venta' },
        { id: 'productId', label: 'ID Producto' },
        { id: 'motivo', label: 'Motivo' },
        { id: 'fechaDevolucion', label: 'Fecha Devolución' },
        { id: 'fechaVenta', label: 'Fecha Venta' },
        { id: 'totalVenta', label: 'Total Venta' },
        { id: 'producto', label: 'Nombre del Producto' },
    ];

    return (
        <Page title="User | Minimal-UI">
            <Container>
                <Typography variant="h4">Devoluciones</Typography>
                
                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 5 }}
                >
                    <IconButton
                        onClick={() => {
                            location.href = '/dashboard/products';
                        }}
                    >
                    <Icon icon="ri:arrow-go-back-line" color='#7189FF' />
                    </IconButton>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <div>
                            <IconButton
                                onClick={() => {
                                    location.href = '/dashboard/products';
                                }}
                            >
                                <Icon icon="si:grid-duotone" />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setOpenSlideCreateCategory(true);
                                }}
                            >
                                <Icon icon="ant-design:plus-outlined" />
                            </IconButton>
                        </div>{' '}
                    </Stack>
                </Stack>
                <DynamicTable columns={columns} data={devolutionsList} />
            </Container>

            <SlidingPane
                title="Crear nueva categoría"
                content={
                    <CreateCategoryForm
                        onFinish={() => {
                            console.log('finished');
                        }}
                    />
                }
                isOpenSlide={openSlideCreateCategory}
                onCloseSlide={() => {
                    setOpenSlideCreateCategory(false);
                }}
            />
        </Page>
    );
};

export default Devolutions;
