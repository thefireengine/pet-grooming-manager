import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export type Client = Database['public']['Tables']['clients']['Row'];

export interface Pet {
    id: string;
    name: string;
    species: string;
    breed: string;
    birth_date: string;
    weight: number;
    client_id: string;
    status: 'active' | 'inactive';
    notes?: string;
    created_at: string;
    client?: Client;
}

export interface Appointment {
    id: string;
    created_at: string;
    pet_id: string;
    date_time: string;
    service_type: string;
    duration_minutes: number;
    price?: number;
    notes?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    photos?: {
        before: string[];
        after: string[];
    };
    pet?: Pet;
} 