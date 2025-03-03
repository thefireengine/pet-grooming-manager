import * as yup from 'yup';

export const appointmentSchema = yup.object().shape({
    pet_id: yup
        .string()
        .required('Pet is required'),
    date_time: yup
        .string()
        .required('Date and time are required')
        .matches(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
            'Date and time must be in YYYY-MM-DDTHH:mm format'
        ),
    service_type: yup
        .string()
        .required('Service type is required')
        .min(2, 'Service type must be at least 2 characters')
        .max(50, 'Service type must not exceed 50 characters'),
    status: yup
        .string()
        .oneOf(['scheduled', 'completed', 'cancelled'], 'Invalid status')
        .required('Status is required'),
    duration_minutes: yup
        .number()
        .required('Duration is required')
        .min(15, 'Duration must be at least 15 minutes')
        .max(480, 'Duration must not exceed 8 hours')
        .test(
            'divisible-by-15',
            'Duration must be in 15-minute increments',
            value => value % 15 === 0
        ),
    notes: yup
        .string()
        .optional()
        .max(1000, 'Notes must not exceed 1000 characters'),
}); 