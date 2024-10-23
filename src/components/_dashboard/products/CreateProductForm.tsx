import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, TextField, Button, Box } from '@mui/material';

const CreateProductForm = () => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState('');

    // Funciones de manejo de drag and drop
    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true);
        } else if (event.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (event, setFieldValue) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setFileName(file.name);
            setFieldValue('image', file);
        }
    };

    const handleFileClick = () => {
        document.getElementById('fileInput').click();
    };

    // Inicialización de Formik
    const formik = useFormik({
        initialValues: {
            productName: '',
            price: '',
            quantity: '',
            description: '',
            image: null,
        },
        validationSchema: Yup.object({
            productName: Yup.string().required('El nombre del producto es requerido'),
            price: Yup.number().required('El precio es requerido').positive('El precio debe ser positivo'),
            quantity: Yup.number().required('La cantidad es requerida').integer('Debe ser un número entero'),
            description: Yup.string().required('La descripción es requerida'),
            image: Yup.mixed().required('La imagen es requerida'),
        }),
        onSubmit: (values) => {
            console.log('Valores del formulario:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {/* Formulario para crear producto */}
            <TextField
                fullWidth
                label="Nombre del producto"
                id="productName"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.productName && Boolean(formik.errors.productName)}
                helperText={formik.touched.productName && formik.errors.productName}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Precio"
                id="price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Cantidad"
                id="quantity"
                name="quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
                style={{ marginBottom: '1.3rem' }}
            />
            <TextField
                fullWidth
                label="Descripción"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                style={{ marginBottom: '1.3rem' }}
            />

            {/* Área de arrastrar y soltar */}
            <FormGroup style={{ margin: '1.3rem 0' }}>
                <Box
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(event) => handleDrop(event, formik.setFieldValue)}
                    onClick={handleFileClick}
                    sx={{
                        border: dragActive ? '2px dashed #007bff' : '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: dragActive ? '#e6f7ff' : '#f9f9f9',
                        transition: 'background-color 0.2s ease',
                    }}
                >
                    {fileName ? (
                        <p>{fileName}</p>
                    ) : (
                        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar</p>
                    )}
                </Box>
                <input
                    type="file"
                    id="fileInput"
                    name="image"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFileName(file ? file.name : '');
                        formik.setFieldValue('image', file);
                    }}
                />
                {formik.touched.image && formik.errors.image && (
                    <p style={{ color: 'red', marginTop: '0.5rem' }}>{formik.errors.image}</p>
                )}
            </FormGroup>

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Crear Producto
            </Button>
        </form>
    );
};

export default CreateProductForm;
