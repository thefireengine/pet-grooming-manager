import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface DeleteConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting?: boolean;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    isDeleting = false,
}) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} disabled={isDeleting}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    disabled={isDeleting}
                    autoFocus
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}; 