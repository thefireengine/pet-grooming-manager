import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();

    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastStyle={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}
            />
        </>
    );
};

export const useToast = () => {
    const theme = useTheme();

    const showSuccess = (message: string) => toast.success(message, {
        style: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
        },
    });

    const showError = (message: string) => toast.error(message, {
        style: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },
    });

    const showInfo = (message: string) => toast.info(message, {
        style: {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
        },
    });

    const showWarning = (message: string) => toast.warning(message, {
        style: {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
        },
    });

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning,
    };
}; 