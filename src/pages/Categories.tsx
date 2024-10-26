import React, { useState } from 'react';

import Page from '@/components/Page';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import SlidingPane from '@/components/SlidingPane';
import CreateCategoryForm from '@/components/_dashboard/categories/CreateCategoryForm';
import useGetCategoriesReport from '@/hooks/categories/useGetCategoriesReport';
import DynamicTable from '@/components/DynamicTable';
import { useNavigate } from 'react-router-dom';

const Categories = (): JSX.Element => {
    const navigate = useNavigate();
    const [openSlideCreateCategory, setOpenSlideCreateCategory] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { categoriesList, isFetching } = useGetCategoriesReport(queryKey);

    // columnas para la tabla:
    const columns = [
        { id: 'categoryId', label: 'ID' },
        { id: 'categoryName', label: 'Nombre de la categoría' },
        { id: 'totalProducts', label: 'Total de productos' },
        { id: 'totalStock', label: 'Stock total' },
        {
            id: 'mostSoldProductImageUrl',
            label: 'Producto mas vendido',
            render: (row) => {
                return (
                    row.mostSoldProductImageUrl && (
                        <div>
                            <img
                                src={row.mostSoldProductImageUrl}
                                alt="producto mas vendido"
                                width="60"
                                height="60"
                            />
                        </div>
                    )
                );
            }
        }
    ];

    return (
        <Page title="User | Minimal-UI">
            <Container>
                <Typography variant="h4">Categorías</Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 5 }}
                >
                    <IconButton
                        onClick={() => {
                            navigate('/dashboard/products');
                        }}
                    >
                        <Icon icon="ri:arrow-go-back-line" color="#7189FF" />
                    </IconButton>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <div>
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
                <DynamicTable columns={columns} data={categoriesList} />
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

export default Categories;
