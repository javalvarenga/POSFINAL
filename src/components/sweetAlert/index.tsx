import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SweetAlertHandler = async ({
    title = 'OK',
    text = '',
    icon = 'success',
    position = 'top-end',
    showConfirmButton = false,
    confirmButtonText= 'Confirmar',
    cancelButtonText= 'Cancelar',
    reverseButtons= false,
    toast=true
}) => {
    const result = await MySwal.fire({
        title,
        text,
        showConfirmButton,
        showCancelButton: showConfirmButton,
        icon,
        position,
        toast,
        timer: showConfirmButton ? 10000 : 5000,
        confirmButtonText,
        cancelButtonText,
        reverseButtons,
        customClass: {
            container: 'swal2-container'
        }
    });

    return result;
};

export default SweetAlertHandler;
