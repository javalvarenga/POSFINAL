import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

import SweetAlertHandler from '@/components/sweetAlert';
import { IAccount } from '@/models';
import { updateAccountSaldo } from '@/services/accounts';
import { id } from 'date-fns/locale';

interface Props {
    client?: any;
    onFinish?: () => void;
}

const UpdateSaldoForm = (props: Props) => {
    const { onFinish, client } = props;
    console.log(client)
  

    // Inicialización de Formik
    const formik = useFormik({
        initialValues: {
            saldoAccount: '',
            idCliente: '',
        },
            validationSchema: Yup.object({
            saldoAccount: Yup.string().required('Nuevo monto de saldo es requerido'),
        }),
        onSubmit: async (values) => {
            try {
                
                const action = updateAccountSaldo(+client?.idCliente, +values?.saldoAccount);

                SweetAlertHandler({
                    title: 'Saldo actualizado correctamente',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log('Confirmed');
                    }
                });
                resetForm();
                onFinish && onFinish();
            } catch (error) {
                console.error('Error al actuar el saldo:', error);
            }
        }
    });

    const { resetForm, handleSubmit } = formik;

    return (
        <form onSubmit={handleSubmit}>
            {/* Formulario para actualizar saldo de cliente */} 
            <TextField
                fullWidth
                label="Nuevo saldo:"
                id="saldoAccount"
                name="saldoAccount"
                value={formik.values.saldoAccount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.saldoAccount && Boolean(formik.errors.saldoAccount)}
                helperText={formik.touched.saldoAccount && formik.errors.saldoAccount}
                style={{ marginBottom: '1.3rem' }}
            />
           

            <Button type="submit" variant="contained" color={client ? 'warning' : 'primary'} fullWidth>
                Actualizar saldo
            </Button>
        </form>
    );
};

export default UpdateSaldoForm;