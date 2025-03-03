import React, { useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clientService } from '../../services';
import { useToast } from '../Toast/ToastProvider';
import { clientSchema } from './clientSchema';
import type { Client } from '../../config/supabase';

interface ClientFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address?: string;
    notes?: string;
    is_active: boolean;
}

export const ClientForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ClientFormData>({
        resolver: yupResolver(clientSchema),
        mode: 'onBlur',
        defaultValues: {
            is_active: true,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            notes: '',
        }
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const { showSuccess, showError } = useToast();
    const isEdit = Boolean(id);

    useEffect(() => {
        if (id) {
            loadClient(id);
        }
    }, [id]);

    const loadClient = async (clientId: string) => {
        try {
            const client = await clientService.getById(clientId);
            if (client) {
                reset(client);
            }
        } catch (error) {
            showError('Error loading client');
            console.error('Error loading client:', error);
        }
    };

    const onSubmit = async (data: ClientFormData) => {
        try {
            if (isEdit && id) {
                await clientService.update(id, data);
                showSuccess('Client updated successfully');
            } else {
                await clientService.create(data);
                showSuccess('Client created successfully');
            }
            navigate('/clients');
        } catch (error) {
            showError('Error saving client');
            console.error('Error saving client:', error);
        }
    };

    if (isEdit && isSubmitting) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isEdit ? 'Edit Client' : 'New Client'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                {...register('first_name')}
                                error={!!errors.first_name}
                                helperText={errors.first_name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                {...register('last_name')}
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                {...register('phone')}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                {...register('address')}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Notes"
                                {...register('notes')}
                                error={!!errors.notes}
                                helperText={errors.notes?.message}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isEdit ? 'Update' : 'Create'} Client
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/clients')}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}; 