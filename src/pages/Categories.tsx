import React, { useState } from 'react';

import Page from '@/components/Page';
import { IconButton, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import SlidingPane from '@/components/SlidingPane';
import CreateCategoryForm from '@/components/_dashboard/categories/CreateCategoryForm';
import useGetCategories from '@/hooks/categories/useGetCategories';

const Categories = (): JSX.Element => {
    const [openSlideCreateCategory, setOpenSlideCreateCategory] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { categoriesList, isFetching } = useGetCategories(queryKey);

    return (
        <Page title="User | Minimal-UI">
            <Typography variant="h4">Categories</Typography>
            <IconButton
                onClick={() => {
                    setOpenSlideCreateCategory(true);
                }}
            >
                <Icon icon="ant-design:plus-outlined" />
            </IconButton>
            {categoriesList?.map((category) => {
                return (
                    <div>
                        <p>Id: {category.categoryId}</p>
                        <p>nombre: {category.categoryName}</p>
                    </div>
                );
            })}
            <SlidingPane
                title="Crear nueva categoria"
                content={
                    <CreateCategoryForm
                        onFinish={() => {
                            console.log('finished');
                        }}
                    />
                }
                isOpenSlide={openSlideCreateCategory}
                onCloseSlide={() => {
                    setOpenSlideCreateCategory(false);
                }}
            />
        </Page>
    );
};

export default Categories;
