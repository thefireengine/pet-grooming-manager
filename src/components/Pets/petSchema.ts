import * as yup from 'yup';

export const petSchema = yup.object().shape({
    name: yup
        .string()
        .required('Pet name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must not exceed 50 characters'),
    species: yup
        .string()
        .required('Species is required')
        .min(2, 'Species must be at least 2 characters')
        .max(50, 'Species must not exceed 50 characters'),
    breed: yup
        .string()
        .required('Breed is required')
        .min(2, 'Breed must be at least 2 characters')
        .max(50, 'Breed must not exceed 50 characters'),
    birth_date: yup
        .string()
        .required('Birth date is required')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'Birth date must be in YYYY-MM-DD format'
        ),
    weight: yup
        .number()
        .required('Weight is required')
        .min(0.1, 'Weight must be greater than 0')
        .max(200, 'Weight must not exceed 200 kg'),
    client_id: yup
        .string()
        .required('Owner is required'),
    status: yup
        .string()
        .oneOf(['active', 'inactive'], 'Invalid status')
        .required('Status is required'),
    notes: yup
        .string()
        .optional()
        .max(1000, 'Notes must not exceed 1000 characters'),
}); 