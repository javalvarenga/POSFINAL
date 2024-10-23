import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import Page from '@/components/Page';
import {
    ProductList,
    CreateProductForm
} from '@/components/_dashboard/products';
import useGetProducts from '@/hooks/products/useGetProducts';
import SlidingPane from '@/components/SlidingPane';
import { Icon } from '@iconify/react';



const EcommerceShop = (): JSX.Element => {
    const [openFilter, setOpenFilter] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { productsList, isFetching } = useGetProducts(queryKey);

    console.log('productsList', productsList);

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
                     
                        <IconButton onClick={handleOpenFilter}>
                            <Icon icon="ant-design:plus-outlined" />
                        </IconButton> 
                        <SlidingPane
                            title="Nuevo Producto"
                            content={<CreateProductForm />}
                            isOpenSlide={openFilter}
                            onFinish={()=>{
                                setQueryKey(queryKey+1);
                            }}
                            onCloseSlide={handleCloseFilter}
                        />
                    </Stack>
                </Stack>

                <ProductList products={productsList} />
            </Container>
        </Page>
    );
};

export default EcommerceShop;
