import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

import SweetAlertHandler from '@/components/sweetAlert';
import { IProduct } from '@/models';
import { createDevolucion } from '@/services/devolutions';

interface Props {
    product?: IProduct;
    onFinish?: () => void;
}


const validationSchema = Yup.object().shape({
    p_id_venta: Yup.number()
        .required('El Id de la venta es obligatorio')
        .typeError('Debe ser un número'),
    p_motivo: Yup.string()
        .required('El motivo es obligatorio'),
});

const CreateDevolutionsForm = (props: Props) => {
    const { onFinish, product } = props;
 
    // Inicialización de Formik
    const formik = useFormik({
        initialValues: {
            p_id_venta: '',
            p_motivo: '',
        
        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                
                await createDevolucion({
                    id_venta: values.p_id_venta,
                    motivo: values.p_motivo
                });
        
                SweetAlertHandler({
                    title: 'Devolución realizada correctamente',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log('Confirmed');
                    }
                });
    
                resetForm();
                onFinish && onFinish();
            } catch (error) {
                console.error('Error al realizar la devolución:', error);
            }
        }
        
    });

    const { resetForm, handleSubmit } = formik;

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                label="ID Venta"
                id="p_id_venta"
                name="p_id_venta"
                value={formik.values.p_id_venta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.p_id_venta && Boolean(formik.errors.p_id_venta)}
                helperText={formik.touched.p_id_venta && formik.errors.p_id_venta}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Motivo"
                id="p_motivo"
                name="p_motivo"
                value={formik.values.p_motivo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.p_motivo && Boolean(formik.errors.p_motivo)}
                helperText={formik.touched.p_motivo && formik.errors.p_motivo}
                style={{ marginBottom: '1.3rem' }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Crear Devolución
            </Button>
        </form>
    );
};

export default CreateDevolutionsForm;
