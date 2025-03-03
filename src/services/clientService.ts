import { supabase } from '../config/supabase';
import type { Client } from '../config/supabase';

export const clientService = {
    async getAll(): Promise<Client[]> {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('last_name');
        
        if (error) throw error;
        return data || [];
    },

    async getById(id: string): Promise<Client | null> {
        const { data, error } = await supabase
            .from('clients')
            .select('*, pets(*)')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    },

    async create(client: Omit<Client, 'id' | 'created_at'>): Promise<Client> {
        const { data, error } = await supabase
            .from('clients')
            .insert([client])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async update(id: string, client: Partial<Client>): Promise<Client> {
        const { data, error } = await supabase
            .from('clients')
            .update(client)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    async search(query: string): Promise<Client[]> {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
            .order('last_name');
        
        if (error) throw error;
        return data || [];
    }
}; 