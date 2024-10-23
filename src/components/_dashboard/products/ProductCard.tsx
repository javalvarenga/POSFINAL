import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fCurrency } from '@/utils/formatNumber';
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import { IProduct } from '@/models';

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

interface Props {
    product: IProduct;
}

export const ShopProductCard = (props: Props): JSX.Element => {
    const { productId, imageUrl, price, description, quantity, createdAt } = props.product;

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
                        {<>{productId}</>}
                    </Label>
                )}
                 <ProductImgStyle alt={description} src={imageUrl} />
             </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {description}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  {/*   <ColorPreview colors={colors} /> */}
                    <Typography variant="subtitle1">
                         <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                            }}
                        >
                            {quantity+ quantity != 1 ? quantity + ' unidades' : quantity + ' unidad'}
                        </Typography>
                        &nbsp; &nbsp;&nbsp;
                        {fCurrency(Number(price))}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
};

export default ShopProductCard;
