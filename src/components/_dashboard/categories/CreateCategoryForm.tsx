import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, TextField, Button, Box } from '@mui/material';
import { createProduct, updateProduct } from '@/services/products';
import {  isImageFile, toBase64 } from '@/utils';
import SweetAlertHandler from '@/components/sweetAlert';
import { IProduct } from '@/models';
import { createCategory } from '@/services/categories';

interface Props {
    product?: IProduct;
    onFinish?: () => void;
}

const CreateCategoryForm = (props: Props) => {
    const { onFinish, product } = props;
  

    // Inicialización de Formik
    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: Yup.object({
            categoryName: Yup.string().required('El nombre de la categoria es requerido'),
        }),
        onSubmit: async (values) => {
            try {
                
                const action = createCategory(values?.categoryName);

                SweetAlertHandler({
                    title: 'categoria creada correctamente',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log('Confirmed');
                    }
                });
                resetForm();
                onFinish && onFinish();
            } catch (error) {
                console.error('Error al crear el producto:', error);
            }
        }
    });

    const { resetForm, handleSubmit } = formik;

    return (
        <form onSubmit={handleSubmit}>
            {/* Formulario para crear producto */}
            <TextField
                fullWidth
                label="Nombre de la categoria"
                id="categoryName"
                name="categoryName"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.productName && Boolean(formik.errors.categoryName)}
                helperText={formik.touched.productName && formik.errors.categoryName}
                style={{ marginBottom: '1.3rem' }}
            />
           

            <Button type="submit" variant="contained" color={product ? 'warning' : 'primary'} fullWidth>
                Crear categoria
            </Button>
        </form>
    );
};

export default CreateCategoryForm;
