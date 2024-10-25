import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

import SweetAlertHandler from '@/components/sweetAlert';
import { IProduct } from '@/models';
import { createCategory } from '@/services/categories';
import { createSale } from '@/services/sales';
import useGetProducts from '@/hooks/products/useGetProducts';

interface Props {
    product?: IProduct;
    onFinish?: () => void;
}

const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .required('El nombre es obligatorio'),
    direccion: Yup.string()
        .required('La dirección es obligatoria'),
    telefono: Yup.string()
        .matches(/^\d+$/, 'El teléfono debe ser un número')
        .required('El teléfono es obligatorio'),
    correo: Yup.string()
        .email('El correo debe ser válido')
        .required('El correo es obligatorio'),
    nit: Yup.string()
        .required('El NIT es obligatorio'),
    cui: Yup.string()
        .required('El CUI es obligatorio'),
    fecha: Yup.date()
        .required('La fecha es obligatoria')
        .nullable(),
    tipo_pago: Yup.string()
        .required('El tipo de pago es obligatorio'),
    descuento: Yup.number()
        .min(0, 'El descuento no puede ser negativo')
        .required('El descuento es obligatorio'),
    saldo: Yup.number()
        .min(0, 'El saldo no puede ser negativo')
        .required('El saldo es obligatorio'),
});

const CreateSalesForm = (props: Props) => {
    const { onFinish, product } = props;
    const [queryKey, setQueryKey] = useState(0);
    const { productsList, isFetching } = useGetProducts(queryKey);

    // Estado para productos seleccionados
    const [selectedProducts, setSelectedProducts] = useState<{ ProductId: number; cantidad: number }[]>([]);

    // Funciones para manejar la selección de productos y cantidad
    const handleAddProduct = () => {
        setSelectedProducts([...selectedProducts, { ProductId: 0, cantidad: 1 }]);
    };

    const handleProductChange = (index: number, field: string, value: any) => {
        const updatedProducts = selectedProducts.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setSelectedProducts(updatedProducts);
    };

    const handleRemoveProduct = (index: number) => {
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    };

    // Inicialización de Formik
    const formik = useFormik({
        initialValues: {
            nombre: '',
            direccion: '',
            telefono: '',
            correo: '',
            nit: '',
            cui: '',
            fecha: '',
            tipo_pago: '',
            descuento: '',
            saldo: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Incluir los productos seleccionados en la venta
                const action = createSale({ ...values, productos: selectedProducts });

                SweetAlertHandler({
                    title: 'Venta realizada correctamente',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log('Confirmed');
                    }
                });
                resetForm();
                onFinish && onFinish();
            } catch (error) {
                console.error('Error al realizar la venta:', error);
            }
        }
    });

    const { resetForm, handleSubmit } = formik;

    return (
        <form onSubmit={handleSubmit}>
            {/* Formulario para crear venta */}
            <TextField
                fullWidth
                label="Nombre"
                id="nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Dirección"
                id="direccion"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Teléfono"
                id="telefono"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                helperText={formik.touched.telefono && formik.errors.telefono}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Correo"
                id="correo"
                name="correo"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.correo && Boolean(formik.errors.correo)}
                helperText={formik.touched.correo && formik.errors.correo}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="NIT"
                id="nit"
                name="nit"
                value={formik.values.nit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nit && Boolean(formik.errors.nit)}
                helperText={formik.touched.nit && formik.errors.nit}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="CUI"
                id="cui"
                name="cui"
                value={formik.values.cui}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cui && Boolean(formik.errors.cui)}
                helperText={formik.touched.cui && formik.errors.cui}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Fecha"
                id="fecha"
                name="fecha"
                type="date"
                value={formik.values.fecha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                helperText={formik.touched.fecha && formik.errors.fecha}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Tipo de Pago"
                id="tipo_pago"
                name="tipo_pago"
                value={formik.values.tipo_pago}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tipo_pago && Boolean(formik.errors.tipo_pago)}
                helperText={formik.touched.tipo_pago && formik.errors.tipo_pago}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Descuento"
                id="descuento"
                name="descuento"
                type="number"
                value={formik.values.descuento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.descuento && Boolean(formik.errors.descuento)}
                helperText={formik.touched.descuento && formik.errors.descuento}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Saldo"
                id="saldo"
                name="saldo"
                type="number"
                value={formik.values.saldo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.saldo && Boolean(formik.errors.saldo)}
                helperText={formik.touched.saldo && formik.errors.saldo}
                style={{ marginBottom: '1.3rem' }}
            />
            
            <div>
    <Button onClick={handleAddProduct}>Agregar Producto</Button>
    {selectedProducts.map((product, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: '1rem' }}>
            <TextField
                select
                label="Producto"
                value={product.ProductId}
                onChange={(e) => handleProductChange(index, 'ProductId', e.target.value)}
                SelectProps={{ native: true }}
                style={{ marginRight: '1rem' }}
            >
                <option value={0}>Seleccionar Producto</option>
                {/* Verifica que productsList esté definido y tenga datos antes de mapear */}
                {productsList && productsList.length > 0 ? (
                    productsList.map((prod: IProduct) => (
                        <option key={prod.productId} value={prod.productId}>
                            {prod.productName}
                        </option>
                    ))
                ) : (
                    <option disabled>Cargando productos...</option>
                )}
            </TextField>
            <TextField
                label="Cantidad"
                type="number"
                value={product.cantidad}
                onChange={(e) => handleProductChange(index, 'cantidad', e.target.value)}
                style={{ marginRight: '1rem' }}
            />
            <Button onClick={() => handleRemoveProduct(index)}>Eliminar</Button>
        </div>
    ))}
</div>


            {/* Botón de envío */}
            <Button type="submit" variant="contained" color="primary">
                Realizar Venta
            </Button>
        </form>
    );
};

export default CreateSalesForm;

