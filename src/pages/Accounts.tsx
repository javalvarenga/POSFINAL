import React, { useState } from 'react';
import Page from '@/components/Page';
import useGetAcoountReport from '@/hooks/accounts/useGetAcoountReport';
import DynamicTable from '@/components/DynamicTable';
import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import SlidingPane from '@/components/SlidingPane';
import UpdateSaldoForm from '@/components/_dashboard/Account/UpdateAccount';

const Accounts = (): JSX.Element => {
    const [OpenSlideUpdateSaldo, setOpenSlideUpdateSaldo] = useState(false);
    const [queryKey, setQueryKey] = useState(0);
    const { accountsList, isFetching } = useGetAcoountReport(queryKey);
    const [ selectedAccount, setSelectedAccount] = useState(null);

   

    // columnas para la tabla:
    const columns = [
        { id: 'idCliente', label: 'ID' },
        { id: 'nombre', label: 'Nombre del cliente' },
        { id: 'direccion', label: 'Dirección' },
        { id: 'telefono', label: 'Teléfono' },
        { id: 'correo', label: 'Email' },
        { 
            id: 'saldo', 
            label: 'Saldo', 
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{row.saldo}</span>
                    <IconButton onClick = {() => {
                        setOpenSlideUpdateSaldo(true)
                        setSelectedAccount(row)
                    } }>
                        <Icon icon="ant-design:save-outlined" />
                    </IconButton>
                </div>
            )
        }
    ];

    return (
        <Page title="Dashboard: Clientes | Minimal-UI">
            <div>
                <DynamicTable 
                    columns={columns} 
                    data={accountsList} 
                   
                />
            </div>
            <SlidingPane
                title="Actualizar Saldo de Cliente"
                content={
                    <UpdateSaldoForm
                    client={selectedAccount}
                        onFinish={() => {
                            setOpenSlideUpdateSaldo
                            setSelectedAccount(null)
                            console.log('finished');
                        }}
                    />
                }
                isOpenSlide={OpenSlideUpdateSaldo}
                onCloseSlide={() => {
                    setOpenSlideUpdateSaldo(false);
                }}
            />
        </Page>
    );
};

export default Accounts;