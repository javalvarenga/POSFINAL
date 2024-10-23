import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, IconButton, Stack, Typography } from '@mui/material';
import Page from '@/components/Page';
import {
    ProductSort,
    ProductList,
    ProductCartWidget,
    ProductFilterSidebar
} from '@/components/_dashboard/products';
import PRODUCTS from '@/_mocks_/products';
import useGetProducts from '@/hooks/products/useGetProducts';
import SlidingPane from '@/components/SlidingPane';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import { Icon } from '@iconify/react';

/* contenido del slide para crear producto */
const CreateProductSlideContent = () => {
    return (
        <>
        crear producto
        </>
    );
};

const EcommerceShop = (): JSX.Element => {
    const [openFilter, setOpenFilter] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { productsList, isFetching } = useGetProducts(queryKey);

    const formik = useFormik({
        initialValues: {
            gender: '',
            category: '',
            colors: '',
            priceRange: '',
            rating: ''
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    const { resetForm, handleSubmit } = formik;

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleOnFinish = () => {
        console.log('finished');
        handleSubmit();
        resetForm();
    };

    return (
        <Page title="Dashboard: Products | Minimal-UI">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Products
                </Typography>

                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 5 }}
                >
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        {/*    <ProductFilterSidebar
                            formik={formik}
                            isOpenFilter={openFilter}
                            onResetFilter={handleResetFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        /> */}
                        <IconButton onClick={handleOpenFilter}>
                            <Icon icon="ant-design:plus-outlined" />
                        </IconButton> 
                        <SlidingPane
                            title="Nuevo Producto"
                            content={<CreateProductSlideContent />}
                            isOpenSlide={openFilter}
                            onFinish={handleOnFinish}
                            onCloseSlide={handleCloseFilter}
                        />
                        <ProductSort />
                    </Stack>
                </Stack>

                <ProductList products={productsList} />
            </Container>
        </Page>
    );
};

export default EcommerceShop;
