import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    InputAdornment,
    Stack,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridSortModel,
    GridFilterModel,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import {
    Search as SearchIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import { clientService } from '../../services';
import { useToast } from '../Toast/ToastProvider';
import type { Client } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

export const ClientsList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
    });
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const loadClients = async () => {
        try {
            setLoading(true);
            const data = await clientService.getAll();
            setClients(data);
        } catch (error) {
            showError('Error loading clients');
            console.error('Error loading clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const data = await clientService.search(searchQuery);
            setClients(data);
        } catch (error) {
            showError('Error searching clients');
            console.error('Error searching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (client: Client) => {
        setSelectedClient(client);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedClient) return;

        try {
            setIsDeleting(true);
            await clientService.delete(selectedClient.id);
            showSuccess('Client deleted successfully');
            await loadClients();
        } catch (error) {
            showError('Error deleting client');
            console.error('Error deleting client:', error);
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setSelectedClient(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedClient(null);
    };

    useEffect(() => {
        loadClients();
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            valueGetter: (params: GridRenderCellParams) =>
                `${params.row.first_name || ''} ${params.row.last_name || ''}`,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            sortable: true,
            filterable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1,
            sortable: true,
            filterable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            valueGetter: (params: GridRenderCellParams) =>
                params.row.is_active ? 'Active' : 'Inactive',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/clients/${params.row.id}`)}
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(params.row)}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Clients
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/clients/new')}
                >
                    Add Client
                </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSearch()}
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
                rows={clients}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize,
                        },
                    },
                }}
                onPaginationModelChange={(model) => setPageSize(model.pageSize)}
                pageSizeOptions={[5, 10, 25]}
                pagination
                sortingMode="server"
                onSortModelChange={setSortModel}
                loading={loading}
                disableRowSelectionOnClick
                sx={{
                    height: 400,
                    width: '100%',
                }}
            />

            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                title="Delete Client"
                message={`Are you sure you want to delete ${selectedClient?.first_name} ${selectedClient?.last_name}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                isDeleting={isDeleting}
            />
        </Box>
    );
}; 