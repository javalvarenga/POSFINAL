import React, { useState } from 'react';
import { Badge, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { IProduct } from '@/models';
import { Icon } from '@iconify/react';
import SweetAlertHandler from '@/components/sweetAlert';
import { deleteProduct } from '@/services/products';
import CreateProductForm from './CreateProductForm';
import SlidingPane from '@/components/SlidingPane';
interface Props {
    product: IProduct;
    onDeleteProduct;
}

const ProductDetails = (props: Props): JSX.Element => {
    const { product, onDeleteProduct } = props;
    const [openSlideEditProduct, setOpenSlideEditProduct] = useState(false);

    const handlerOnDeleteProduct = (productId) => {
        SweetAlertHandler({
            title: `¿Estás seguro que deseas eliminar el producto #${productId}?`,
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            toast: false,
            position: 'center'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleted = await deleteProduct(productId);
                console.log('deleted', deleted);
                SweetAlertHandler({
                    title: 'Producto eliminado correctamente',
                    icon: 'success'
                });
                onDeleteProduct && onDeleteProduct();
            }
        });
    };

    return (
        product && (
            <Grid container>
                <Grid item xs={12}>
                <div style={{marginLeft:'1.3rem'}}>
                <Badge badgeContent={'#'+product?.productId} color="secondary"></Badge>
                </div>
                    <Card>
                           
                        <img
                            src={product.imageUrl}
                            alt={product.description}
                            style={{ maxHeight: 200, objectFit: 'contain', margin: '0 auto' }}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                {/* Primera columna */}
                                <Grid item xs={12} sm={6} sx={{ borderRight: '1px solid #ccc' }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <strong>Creado el:</strong>{' '}
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                {/* Segunda columna */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6">
                                        <strong>Cantidad:</strong> {product.quantity}
                                    </Typography>
                                    <Typography variant="h6">
                                        <strong>Precio:</strong> Q{product.price}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-between' }}>
                            <Button
                                onClick={() => {
                                    handlerOnDeleteProduct(product.productId);
                                }}
                                color="error"
                                size="small"
                                startIcon={<Icon icon={'eva:trash-2-outline'} />}
                            >
                                Eliminar
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpenSlideEditProduct(true);
                                }}
                                color="warning"
                                size="small"
                                startIcon={<Icon icon={'eva:edit-2-outline'} />}
                            >
                                Editar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <SlidingPane
                    title="Editar Producto"
                    content={
                        <CreateProductForm
                            onFinish={() => {
                                onDeleteProduct();
                                setOpenSlideEditProduct(false);
                            }}
                            product={product}
                        />
                    }
                    isOpenSlide={openSlideEditProduct}
                    onCloseSlide={() => {
                        setOpenSlideEditProduct(false);
                    }}
                />
            </Grid>
        )
    );
};

export default ProductDetails;
