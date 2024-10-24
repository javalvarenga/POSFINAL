import React, { useState } from 'react';
import { Container, IconButton, Stack, Typography } from '@mui/material';
import Page from '@/components/Page';
import { ProductList, CreateProductForm } from '@/components/_dashboard/products';
import useGetProducts from '@/hooks/products/useGetProducts';
import SlidingPane from '@/components/SlidingPane';
import { Icon } from '@iconify/react';

const EcommerceShop = (): JSX.Element => {
    const [openSlideAddProduct, setOpenSlideAddProduct] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { productsList, isFetching } = useGetProducts(queryKey);

    const onCreateProduct = () => {
        setQueryKey(queryKey + 1);
        setOpenSlideAddProduct(false);
    };

    const refresh = () => {
        setQueryKey(queryKey + 1);
    };

    return (
        <Page title="Dashboard: Products | Minimal-UI">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Productos
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 5 }}
                >
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <IconButton onClick={() => {
                            location.href='/dashboard/categories';
                        }}>
                            <Icon icon="material-symbols:category" />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setOpenSlideAddProduct(true);
                            }}
                        >
                            <Icon icon="ant-design:plus-outlined" />
                        </IconButton>
                        <SlidingPane
                            title="Nuevo Producto"
                            content={<CreateProductForm onFinish={onCreateProduct} />}
                            isOpenSlide={openSlideAddProduct}
                            onCloseSlide={() => {
                                setOpenSlideAddProduct(false);
                            }}
                        />
                    </Stack>
                </Stack>

                <ProductList products={productsList} onDeleteProduct={refresh} />
            </Container>
        </Page>
    );
};

export default EcommerceShop;
