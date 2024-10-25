import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

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
            categoryName: Yup.string().required('El nombre de la categoría es requerido'),
        }),
        onSubmit: async (values) => {
            try {
                
                const action = createCategory(values?.categoryName);

                SweetAlertHandler({
                    title: 'categoría creada correctamente',
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
                label="Nombre de la categoría"
                id="categoryName"
                name="categoryName"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                helperText={formik.touched.categoryName && formik.errors.categoryName}
                style={{ marginBottom: '1.3rem' }}
            />
           

            <Button type="submit" variant="contained" color={product ? 'warning' : 'primary'} fullWidth>
                Crear categoria
            </Button>
        </form>
    );
};

export default CreateCategoryForm;
