import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    InputAdornment,
    Stack,
    Chip,
    IconButton,
} from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridSortModel,
    GridFilterModel,
    GridRenderCellParams,
    GridPaginationModel,
} from '@mui/x-data-grid';
import {
    Search as SearchIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Event as EventIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { appointmentService } from '../../services';
import { useToast } from '../Toast/ToastProvider';
import type { Appointment } from '../../config/supabase';
import { DeleteConfirmationDialog } from '../DeleteConfirmationDialog';

export const AppointmentsList: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
    });
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const data = await appointmentService.getAll();
            setAppointments(data);
        } catch (error) {
            showError('Error loading appointments');
            console.error('Error loading appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const data = await appointmentService.search(searchQuery);
            setAppointments(data);
        } catch (error) {
            showError('Error searching appointments');
            console.error('Error searching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedAppointment) return;

        try {
            setIsDeleting(true);
            await appointmentService.delete(selectedAppointment.id);
            showSuccess('Appointment deleted successfully');
            await loadAppointments();
        } catch (error) {
            showError('Error deleting appointment');
            console.error('Error deleting appointment:', error);
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setSelectedAppointment(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedAppointment(null);
    };

    const handlePageChange = (model: GridPaginationModel) => {
        setPageSize(model.pageSize);
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            valueGetter: (params: GridRenderCellParams) => {
                return format(new Date(params.row.date), 'PP');
            },
        },
        {
            field: 'time',
            headerName: 'Time',
            flex: 1,
            valueGetter: (params: GridRenderCellParams) => {
                return format(new Date(`2000-01-01T${params.row.time}`), 'p');
            },
        },
        {
            field: 'client',
            headerName: 'Client',
            flex: 1,
            valueGetter: (params: GridRenderCellParams) => {
                return `${params.row.client.first_name} ${params.row.client.last_name}`;
            },
        },
        {
            field: 'pet',
            headerName: 'Pet',
            flex: 1,
            valueGetter: (params: GridRenderCellParams) => params.row.pet.name,
        },
        {
            field: 'service_type',
            headerName: 'Service',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/appointments/${params.row.id}`);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(params.row);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Appointments
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/appointments/new')}
                >
                    Add Appointment
                </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <DataGrid
                rows={appointments}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                onPaginationModelChange={handlePageChange}
                disableRowSelectionOnClick
                autoHeight
            />

            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                title="Delete Appointment"
                content={`Are you sure you want to delete this appointment?`}
                onConfirm={handleDeleteConfirm}
                onClose={handleDeleteCancel}
            />
        </Box>
    );
}; 