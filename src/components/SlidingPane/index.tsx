/* build a componenet */
import React from 'react';
import { useState } from 'react';
import { Box, Typography, Button, Stack, Drawer, IconButton, Divider } from '@mui/material';
import { Icon } from '@iconify/react';

import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import Scrollbar from '../Scrollbar';

interface Props {
    title?: string;
    isOpenSlide?: boolean;
    formik?: any;
    content: JSX.Element;
    onCloseSlide?: () => void;
    onFinish?: () => void;
}

const SlidingPane = (props: Props): JSX.Element => {
    const { title, content, isOpenSlide, onCloseSlide,onFinish } = props;

    return (
        <Drawer
            anchor="right"
            open={isOpenSlide}
            onClose={onCloseSlide}
            PaperProps={{
                sx: { width: '100%', maxWidth: 550, border: 'none', overflow: 'hidden' }
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 1, py: 2 }}
            >
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {title}
                </Typography>
                <IconButton onClick={onCloseSlide}>
                    <Icon icon={closeFill} width={20} height={20} />
                </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
                <div style={{ minHeight: '100vh' }}>
                    <form action="">
                        <input type="text" /> <br />
                        <input type="text" /> <br />
                        <button type='button' onClick={onFinish}>Submit</button>
                    </form>
                </div>      
            </Scrollbar>

            <Box sx={{ p: 3 }}></Box>
        </Drawer>
    );
};

export default SlidingPane;
