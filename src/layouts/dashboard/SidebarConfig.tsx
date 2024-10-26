import React from 'react';
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { NavItemConfig } from '@/models';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig: NavItemConfig[] = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon(pieChart2Fill)
    },
    {
        title: 'Ventas',
        path: '/dashboard/sales',
        icon: <Icon fontSize={35} icon="raphael:cart" />
    },
    {
        title: 'productos',
        path: '/dashboard/products',
        icon: getIcon(shoppingBagFill)
    },
    {
        title: 'Clientes',
        path: '/dashboard/accounts',
        icon: <Icon icon="solar:hand-money-bold-duotone" fontSize={45} />
    },
    {
        title: 'Devoluciones',
        path: '/dashboard/devolutions',
        icon: <Icon icon="lsicon:sales-return-filled" fontSize={30} />
    }
];

export default sidebarConfig;
