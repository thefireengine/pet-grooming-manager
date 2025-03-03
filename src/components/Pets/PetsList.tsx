import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    InputAdornment,
    Stack,
    Chip,
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
    Pets as PetsIcon,
} from '@mui/icons-material';
import { petService } from '../../services';
import { useToast } from '../Toast/ToastProvider';
import type { Pet } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmationDialog } from '../DeleteConfirmationDialog';

export const PetsList: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
    });
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const loadPets = async () => {
        try {
            setLoading(true);
            const data = await petService.getAll();
            setPets(data);
        } catch (error) {
            showError('Error loading pets');
            console.error('Error loading pets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const data = await petService.search(searchQuery);
            setPets(data);
        } catch (error) {
            showError('Error searching pets');
            console.error('Error searching pets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (pet: Pet) => {
        setSelectedPet(pet);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedPet) return;

        try {
            setIsDeleting(true);
            await petService.delete(selectedPet.id);
            showSuccess('Pet deleted successfully');
            await loadPets();
        } catch (error) {
            showError('Error deleting pet');
            console.error('Error deleting pet:', error);
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setSelectedPet(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedPet(null);
    };

    useEffect(() => {
        loadPets();
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'species',
            headerName: 'Species',
            flex: 1,
        },
        {
            field: 'breed',
            headerName: 'Breed',
            flex: 1,
        },
        {
            field: 'client',
            headerName: 'Owner',
            flex: 1,
            valueGetter: (params: GridRenderCellParams) =>
                `${params.row.client?.first_name || ''} ${params.row.client?.last_name || ''}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            valueGetter: (params: GridRenderCellParams) =>
                params.row.status === 'active' ? 'Active' : 'Inactive',
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
                        onClick={() => navigate(`/pets/${params.row.id}`)}
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
                    Pets
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/pets/new')}
                >
                    Add Pet
                </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search pets..."
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
                rows={pets}
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
                title="Delete Pet"
                content={`Are you sure you want to delete ${selectedPet?.name}?`}
                onConfirm={handleDeleteConfirm}
                onClose={handleDeleteCancel}
            />
        </Box>
    );
}; 