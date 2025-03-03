import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';
import {
    People as PeopleIcon,
    Pets as PetsIcon,
    Event as EventIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { clientService } from '../../services';
import { useToast } from '../Toast/ToastProvider';

interface DashboardStats {
    totalClients: number;
    totalPets: number;
    totalAppointments: number;
    activeClients: number;
}

const initialStats: DashboardStats = {
    totalClients: 0,
    totalPets: 0,
    totalAppointments: 0,
    activeClients: 0,
};

export const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>(initialStats);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showError } = useToast();

    const loadStats = async () => {
        try {
            setLoading(true);
            const clients = await clientService.getAll();
            // TODO: Add pet and appointment service calls when implemented
            setStats({
                totalClients: clients.length,
                activeClients: clients.filter(c => c.is_active).length,
                totalPets: 0, // To be implemented
                totalAppointments: 0, // To be implemented
            });
        } catch (error) {
            showError('Error loading dashboard statistics');
            console.error('Error loading dashboard statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    const StatCard: React.FC<{
        title: string;
        value: number;
        icon: React.ReactNode;
        color: string;
    }> = ({ title, value, icon, color }) => (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                height: '100%',
            }}
        >
            <Box
                sx={{
                    backgroundColor: `${color}20`,
                    borderRadius: '50%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {React.cloneElement(icon as React.ReactElement, {
                    sx: { fontSize: 40, color },
                })}
            </Box>
            <Box>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="h4">{value}</Typography>
            </Box>
        </Paper>
    );

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                }}
            >
                <Typography variant="h4" component="h1">
                    Dashboard
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/clients/new')}
                >
                    New Client
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Clients"
                        value={stats.totalClients}
                        icon={<PeopleIcon />}
                        color="#2196f3"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Active Clients"
                        value={stats.activeClients}
                        icon={<PeopleIcon />}
                        color="#4caf50"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Pets"
                        value={stats.totalPets}
                        icon={<PetsIcon />}
                        color="#ff9800"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Appointments"
                        value={stats.totalAppointments}
                        icon={<EventIcon />}
                        color="#f50057"
                    />
                </Grid>
            </Grid>

            {/* TODO: Add recent activity, upcoming appointments, etc. */}
        </Box>
    );
}; 