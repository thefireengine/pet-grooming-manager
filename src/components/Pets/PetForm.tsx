import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { petService, clientService } from '../../services';
import { useToast } from '../Toast/ToastProvider';
import { petSchema } from './petSchema';
import type { Pet, Client } from '../../config/supabase';

interface PetFormData {
    name: string;
    species: string;
    breed: string;
    birth_date: string;
    weight: number;
    client_id: string;
    status: 'active' | 'inactive';
    notes: string;
}

const initialFormData: PetFormData = {
    name: '',
    species: '',
    breed: '',
    birth_date: '',
    weight: 0,
    client_id: '',
    status: 'active',
    notes: '',
};

export const PetForm: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const { showSuccess, showError } = useToast();
    const isEdit = Boolean(id);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<PetFormData>({
        resolver: yupResolver(petSchema),
        defaultValues: initialFormData,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [clientsData, petData] = await Promise.all([
                    clientService.getAll(),
                    isEdit && id ? petService.getById(id) : null,
                ]);

                setClients(clientsData);

                if (petData) {
                    const client = clientsData.find(c => c.id === petData.client_id);
                    setSelectedClient(client || null);
                    reset({
                        ...petData,
                        birth_date: petData.birth_date?.split('T')[0] || '',
                    });
                }
            } catch (error) {
                showError('Error loading data');
                console.error('Error loading data:', error);
            } finally {
                setInitialLoading(false);
            }
        };

        loadData();
    }, [id, reset, showError]);

    const onSubmit = async (data: PetFormData) => {
        try {
            setLoading(true);
            if (isEdit && id) {
                await petService.update(id, data);
                showSuccess('Pet updated successfully');
            } else {
                await petService.create(data);
                showSuccess('Pet created successfully');
            }
            navigate('/pets');
        } catch (error) {
            showError('Error saving pet');
            console.error('Error saving pet:', error);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
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
                    {isEdit ? 'Edit Pet' : 'New Pet'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                {...register('name')}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="client_id"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={clients}
                                        getOptionLabel={(option) => 
                                            `${option.first_name} ${option.last_name}`
                                        }
                                        value={selectedClient}
                                        onChange={(_, newValue) => {
                                            setSelectedClient(newValue);
                                            field.onChange(newValue?.id || '');
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Owner"
                                                error={!!errors.client_id}
                                                helperText={errors.client_id?.message}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Species"
                                {...register('species')}
                                error={!!errors.species}
                                helperText={errors.species?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Breed"
                                {...register('breed')}
                                error={!!errors.breed}
                                helperText={errors.breed?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Birth Date"
                                type="date"
                                {...register('birth_date')}
                                error={!!errors.birth_date}
                                helperText={errors.birth_date?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Weight (kg)"
                                type="number"
                                {...register('weight')}
                                error={!!errors.weight}
                                helperText={errors.weight?.message}
                                inputProps={{ step: 0.1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label="Status"
                                    {...register('status')}
                                    error={!!errors.status}
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
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
                                    disabled={loading}
                                >
                                    {isEdit ? 'Update' : 'Create'} Pet
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/pets')}
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