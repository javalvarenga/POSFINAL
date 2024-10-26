import React, { useState } from 'react';
import { Box, Container, IconButton, Stack, TextField, Typography, Grid } from '@mui/material';
import Page from '@/components/Page';
import { ProductList, CreateProductForm } from '@/components/_dashboard/products';
import useGetProducts from '@/hooks/products/useGetProducts';
import SlidingPane from '@/components/SlidingPane';
import { Icon } from '@iconify/react';
import BasicIndicator from '@/components/_dashboard/products/BasicIndicator';
import ExportCSV from '@/components/exportCSV';
import { fDate, fDateTime } from '@/utils/formatTime';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'productId', label: 'ID' },
    { id: 'productName', label: 'Nombre de la categoría' },
    { id: 'descripcion', label: 'Descripción' },
    { id: 'price', label: 'Precio' },
    { id: 'quantity', label: 'Cantidad' },
    { id: 'createdAt', label: 'Creado' },
    { id: 'updatedAt', label: 'Actualizado' },
    { id: 'imageUrl', label: 'Imagen' }
];

const EcommerceShop = (): JSX.Element => {
    const navigate = useNavigate();
    const [openSlideAddProduct, setOpenSlideAddProduct] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { productsList, isFetching } = useGetProducts(queryKey);
    const [searchQuery, setSearchQuery] = useState('');

    const onCreateProduct = () => {
        setQueryKey(queryKey + 1);
        setOpenSlideAddProduct(false);
    };

    const refresh = () => {
        setQueryKey(queryKey + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = productsList.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const totalStock = productsList?.reduce((acc, product) => acc + product.quantity, 0);
    const totalValueOfInventory = productsList?.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );

    const mappedData = (filteredProducts?.length > 0 ? filteredProducts : productsList)?.map((product) => ({
        ...product,
        createdAt: fDateTime(product.createdAt),
        updatedAt: fDateTime(product.updatedAt)
    }));

    return (
        <Page title="Productos">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Productos
                </Typography>
                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} sm={6} md={3}>
                        <BasicIndicator
                            title="Valor Total"
                            value={totalValueOfInventory}
                            currency={true}
                            icon="grommet-icons:money"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <BasicIndicator
                            title="Stock"
                            value={totalStock}
                            icon={'gridicons:product'}
                        />
                    </Grid>
                </Grid>
                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 5 }}
                >
                    <Box sx={{ p: 2, width: '50%' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{ mb: 2 }}
                        />
                        {searchQuery?.length > 0 && filteredProducts?.length == 0 ? (
                            <>Sin coincidencias</>
                        ) : null}
                    </Box>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ExportCSV
                            data={mappedData}
                            columns={columns}
                        />
                        <IconButton
                            onClick={() => {
                                navigate('/dashboard/categories')
                            }}
                        >
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

                <ProductList
                    products={mappedData}
                    onDeleteProduct={refresh}
                />
            </Container>
        </Page>
    );
};

export default EcommerceShop;
