import React from 'react';
import { Grid } from '@mui/material';
import ShopProductCard from '@/components/_dashboard/products/ProductCard';

interface Props {
    products;
    onDeleteProduct;
}

const ProductList = (props: Props): JSX.Element => {
    const { products,onDeleteProduct } = props;
    return (
        <Grid container spacing={3} >
            {products.map((product) => (
                <Grid key={product.productId} item xs={12} sm={6} md={3}>
                    <ShopProductCard product={product} onDeleteProduct={onDeleteProduct} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
