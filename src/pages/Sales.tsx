import React, { useState } from 'react';

import Page from '@/components/Page';
import { Typography } from '@mui/material';
import { Icon } from '@iconify/react';



const Sales = (): JSX.Element => {



    return (
        <Page title="User | Minimal-UI">
        <Typography variant ="h2">  Ventas</Typography>
        <IconButton
        onClick={() => { }}>
            <Icon icon="ant-design:plus-outlined" />
            </IconButton>
        <SlidingPane
        title="Nueva Venta"
        content={<CreateSaleForm onFinish={onCreateSale} />}
        isOpenSlide={openSlide}
        onCloseSlide={() => {
        setOpenSlideAddProduct(false);
                            }}
                        />
                        
        </Page>
    );
};

export default Sales;
