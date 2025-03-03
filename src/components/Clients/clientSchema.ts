import * as yup from 'yup';

export const clientSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must not exceed 50 characters'),
    last_name: yup
        .string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must not exceed 50 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(
            /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            'Please enter a valid phone number'
        ),
    address: yup
        .string()
        .optional()
        .max(200, 'Address must not exceed 200 characters'),
    notes: yup
        .string()
        .optional()
        .max(1000, 'Notes must not exceed 1000 characters'),
    is_active: yup
        .boolean()
        .required('Active status is required')
}); 