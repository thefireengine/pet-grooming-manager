export interface Database {
    public: {
        Tables: {
            clients: {
                Row: {
                    id: string;
                    created_at: string;
                    first_name: string;
                    last_name: string;
                    email: string;
                    phone: string;
                    address?: string;
                    notes?: string;
                    is_active: boolean;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    first_name: string;
                    last_name: string;
                    email: string;
                    phone: string;
                    address?: string;
                    notes?: string;
                    is_active?: boolean;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    first_name?: string;
                    last_name?: string;
                    email?: string;
                    phone?: string;
                    address?: string;
                    notes?: string;
                    is_active?: boolean;
                };
            };
            pets: {
                Row: {
                    id: string;
                    created_at: string;
                    name: string;
                    species: string;
                    breed: string;
                    birth_date: string;
                    weight: number;
                    client_id: string;
                    notes?: string;
                    status: 'active' | 'inactive';
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    name: string;
                    species: string;
                    breed: string;
                    birth_date: string;
                    weight: number;
                    client_id: string;
                    notes?: string;
                    status?: 'active' | 'inactive';
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    name?: string;
                    species?: string;
                    breed?: string;
                    birth_date?: string;
                    weight?: number;
                    client_id?: string;
                    notes?: string;
                    status?: 'active' | 'inactive';
                };
            };
            appointments: {
                Row: {
                    id: string;
                    created_at: string;
                    date: string;
                    time: string;
                    duration: number;
                    service_type: string;
                    notes?: string;
                    status: 'scheduled' | 'completed' | 'cancelled';
                    pet_id: string;
                    client_id: string;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    date: string;
                    time: string;
                    duration: number;
                    service_type: string;
                    notes?: string;
                    status?: 'scheduled' | 'completed' | 'cancelled';
                    pet_id: string;
                    client_id: string;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    date?: string;
                    time?: string;
                    duration?: number;
                    service_type?: string;
                    notes?: string;
                    status?: 'scheduled' | 'completed' | 'cancelled';
                    pet_id?: string;
                    client_id?: string;
                };
            };
        };
    };
} 