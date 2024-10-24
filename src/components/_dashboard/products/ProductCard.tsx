import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fCurrency } from '@/utils/formatNumber';
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import { IProduct } from '@/models';
import SlidingPane from '@/components/SlidingPane';
import ProductDetails from './ProductDetails';

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

interface Props {
    product: IProduct;
    onDeleteProduct;
}

export const ShopProductCard = (props: Props): JSX.Element => {
    const [openSlideShowDetails, setOpenSlideShowDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const { productId, imageUrl, price, productName, description, quantity, createdAt } =
        props.product;

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {productId && (
                    <Label
                        variant="filled"
                        color={'info'}
                        sx={{
                            zIndex: 9,
                            top: 16,
                            right: 16,
                            position: 'absolute',
                            textTransform: 'uppercase'
                        }}
                    >
                        {<>#{productId}</>}
                    </Label>
                )}
                <ProductImgStyle alt={description} src={imageUrl} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <div
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => {
                        setSelectedProduct(props.product);
                        setOpenSlideShowDetails(true);
                    }}
                >
                    <Typography variant="subtitle2" noWrap>
                        {productName}
                    </Typography>
                    <Typography variant="body1" noWrap>
                        {description}
                    </Typography>
                </div>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {/*   <ColorPreview colors={colors} /> */}
                    <Typography variant="subtitle1">
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled'
                            }}
                        >
                            {quantity != 1
                                ? quantity + ' unidades'
                                : quantity + ' unidad'}
                        </Typography>
                        &nbsp; &nbsp;&nbsp;
                        {fCurrency(Number(price))}
                    </Typography>
                </Stack>
            </Stack>
            <SlidingPane
                title="Detalles del Producto"
                content={<ProductDetails product={selectedProduct} onDeleteProduct={()=>{
                    setSelectedProduct(null);
                    setOpenSlideShowDetails(false);
                    props.onDeleteProduct && props.onDeleteProduct()
                }} />}
                isOpenSlide={openSlideShowDetails}
                onCloseSlide={() => {
                    setSelectedProduct(null);
                    setOpenSlideShowDetails(false);
                }}
            />
        </Card>
    );
};

export default ShopProductCard;
