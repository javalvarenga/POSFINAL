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

    const handleUpdateAccount = () => {
        // Lógica para actualizar una cuenta
        console.log('Actualizando cuenta...');
    };

    return (
        <Page title="Dashboard: Cuentas | Minimal-UI">
    <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
            Cuentas
        </Typography>

        <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
        >
            <Button variant="contained" onClick={handleUpdateAccount}>
                Actualizar cuenta
            </Button>
        </Stack>        
    </Container>
</Page>

    );
};

export default EcommerceShop;