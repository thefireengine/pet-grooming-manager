import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Paper,
    Stack,
} from '@mui/material';
import {
    Pets as PetsIcon,
    People as PeopleIcon,
    Event as EventIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Stack spacing={2} alignItems="center" textAlign="center">
                <Box sx={{ color: 'primary.main', '& > svg': { fontSize: 40 } }}>
                    {icon}
                </Box>
                <Typography variant="h6" component="h3">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </Stack>
        </CardContent>
    </Card>
);

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: 'url(https://source.unsplash.com/random/?pet,grooming)',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.5)',
                    }}
                />
                <Container
                    sx={{
                        position: 'relative',
                        py: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        color="inherit"
                        gutterBottom
                    >
                        Pet Grooming Business Manager
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        Streamline your pet grooming business with our comprehensive management solution
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ mt: 4 }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/appointments/new')}
                        >
                            Book Appointment
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ color: 'white', borderColor: 'white' }}
                            onClick={() => navigate('/clients/new')}
                        >
                            New Client
                        </Button>
                    </Stack>
                </Container>
            </Paper>

            {/* Features Section */}
            <Container sx={{ py: 8 }}>
                <Typography
                    component="h2"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Features
                </Typography>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<PeopleIcon />}
                            title="Client Management"
                            description="Efficiently manage client information, history, and preferences"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<PetsIcon />}
                            title="Pet Profiles"
                            description="Detailed pet profiles with medical history and grooming preferences"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<EventIcon />}
                            title="Appointment Scheduling"
                            description="Easy-to-use calendar for scheduling and managing appointments"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={<StarIcon />}
                            title="Service Tracking"
                            description="Track services, payments, and maintain grooming history"
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* Call to Action */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom>
                                Ready to streamline your business?
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Start managing your pet grooming business more efficiently today.
                                Our comprehensive solution helps you focus on what matters most - 
                                providing excellent care for pets.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                justifyContent={{ md: 'flex-end' }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ bgcolor: 'white', color: 'primary.main' }}
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Get Started
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{ color: 'white', borderColor: 'white' }}
                                    onClick={() => navigate('/appointments')}
                                >
                                    View Schedule
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}; 