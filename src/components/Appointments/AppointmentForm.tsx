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
import { format } from 'date-fns';
import { appointmentService, petService } from '../../services';
import { useToast } from '../Toast/ToastProvider';
import { appointmentSchema } from './appointmentSchema';
import type { Appointment, Pet } from '../../config/supabase';

interface AppointmentFormData {
    pet_id: string;
    date_time: string;
    service_type: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
    duration_minutes: number;
}

const initialFormData: AppointmentFormData = {
    pet_id: '',
    date_time: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    service_type: '',
    status: 'scheduled',
    notes: '',
    duration_minutes: 60,
};

const SERVICE_TYPES = [
    'Grooming',
    'Nail Trimming',
    'Bath',
    'Haircut',
    'Teeth Cleaning',
    'Ear Cleaning',
    'Full Service',
];

export const AppointmentForm: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
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
    } = useForm<AppointmentFormData>({
        resolver: yupResolver(appointmentSchema),
        defaultValues: initialFormData,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [petsData, appointmentData] = await Promise.all([
                    petService.getAll(),
                    isEdit && id ? appointmentService.getById(id) : null,
                ]);

                setPets(petsData);

                if (appointmentData) {
                    const pet = petsData.find(p => p.id === appointmentData.pet_id);
                    setSelectedPet(pet || null);
                    reset({
                        ...appointmentData,
                        date_time: format(new Date(appointmentData.date_time), "yyyy-MM-dd'T'HH:mm"),
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

    const onSubmit = async (data: AppointmentFormData) => {
        try {
            setLoading(true);
            if (isEdit && id) {
                await appointmentService.update(id, data);
                showSuccess('Appointment updated successfully');
            } else {
                await appointmentService.create(data);
                showSuccess('Appointment created successfully');
            }
            navigate('/appointments');
        } catch (error) {
            showError('Error saving appointment');
            console.error('Error saving appointment:', error);
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
                    {isEdit ? 'Edit Appointment' : 'New Appointment'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="pet_id"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={pets}
                                        getOptionLabel={(option) => 
                                            `${option.name} (${option.client?.first_name} ${option.client?.last_name})`
                                        }
                                        value={selectedPet}
                                        onChange={(_, newValue) => {
                                            setSelectedPet(newValue);
                                            field.onChange(newValue?.id || '');
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Pet"
                                                error={!!errors.pet_id}
                                                helperText={errors.pet_id?.message}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date & Time"
                                type="datetime-local"
                                {...register('date_time')}
                                error={!!errors.date_time}
                                helperText={errors.date_time?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Service Type</InputLabel>
                                <Select
                                    label="Service Type"
                                    {...register('service_type')}
                                    error={!!errors.service_type}
                                >
                                    {SERVICE_TYPES.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Duration (minutes)"
                                type="number"
                                {...register('duration_minutes')}
                                error={!!errors.duration_minutes}
                                helperText={errors.duration_minutes?.message}
                                inputProps={{ min: 15, step: 15 }}
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
                                    <MenuItem value="scheduled">Scheduled</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                    <MenuItem value="cancelled">Cancelled</MenuItem>
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
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : isEdit ? (
                                        'Update Appointment'
                                    ) : (
                                        'Create Appointment'
                                    )}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/appointments')}
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