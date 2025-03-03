import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    message = 'Loading...',
    fullScreen = false,
}) => {
    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                p: 3,
            }}
        >
            <CircularProgress size={40} />
            {message && (
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
            )}
        </Box>
    );

    if (fullScreen) {
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'background.paper',
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {content}
            </Box>
        );
    }

    return content;
}; 