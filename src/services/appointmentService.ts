import { supabase } from '../config/supabase';
import type { Appointment } from '../config/supabase';

export const appointmentService = {
    async getAll(): Promise<Appointment[]> {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                pet:pets (
                    id,
                    name,
                    client:clients (
                        id,
                        first_name,
                        last_name
                    )
                )
            `)
            .order('date_time', { ascending: true });
        
        if (error) throw error;
        return data || [];
    },

    async getById(id: string): Promise<Appointment | null> {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                pet:pets (
                    id,
                    name,
                    client:clients (
                        id,
                        first_name,
                        last_name
                    )
                )
            `)
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    },

    async getByDateRange(startDate: string, endDate: string): Promise<Appointment[]> {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                pet:pets (
                    id,
                    name,
                    client:clients (
                        id,
                        first_name,
                        last_name
                    )
                )
            `)
            .gte('date_time', startDate)
            .lte('date_time', endDate)
            .order('date_time', { ascending: true });
        
        if (error) throw error;
        return data || [];
    },

    async create(appointment: Omit<Appointment, 'id' | 'created_at'>): Promise<Appointment> {
        const { data, error } = await supabase
            .from('appointments')
            .insert(appointment)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async update(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
        const { data, error } = await supabase
            .from('appointments')
            .update(appointment)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    async updateStatus(id: string, status: Appointment['status']): Promise<Appointment> {
        const { data, error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async updatePhotos(id: string, photos: Appointment['photos']): Promise<Appointment> {
        const { data, error } = await supabase
            .from('appointments')
            .update({ photos })
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async search(query: string): Promise<Appointment[]> {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                pet:pets (
                    id,
                    name,
                    client:clients (
                        id,
                        first_name,
                        last_name
                    )
                )
            `)
            .or(`
                pet.name.ilike.%${query}%,
                pet.client.first_name.ilike.%${query}%,
                pet.client.last_name.ilike.%${query}%,
                service_type.ilike.%${query}%
            `)
            .order('date_time', { ascending: true });

        if (error) throw error;
        return data || [];
    },
}; 