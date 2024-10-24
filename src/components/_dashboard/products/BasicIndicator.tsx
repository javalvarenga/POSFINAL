import React from 'react';
import { Icon } from '@iconify/react';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { fCurrency } from '@/utils/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0)
    // color: theme.palette.primary.darker,
    // backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`
}));

// ----------------------------------------------------------------------

interface IBasicIndicatorProps {
    title: string;
    value: number;
    icon: string;
    currency?: boolean;
}

export const BasicIndicator = (props: IBasicIndicatorProps): JSX.Element => {
    const { title, value, icon,currency } = props;

    return (
        <RootStyle>
            <IconWrapperStyle>
                <Icon icon={icon} width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant="h4">{currency ? fCurrency(value) : value}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {title}
            </Typography>
        </RootStyle>
    );
};

export default BasicIndicator;
