import { supabase } from '../config/supabase';
import type { Pet } from '../config/supabase';

export const petService = {
    async getAll(): Promise<Pet[]> {
        const { data, error } = await supabase
            .from('pets')
            .select('*, clients!inner(*)')
            .order('name');
        
        if (error) throw error;
        return data || [];
    },

    async getById(id: string): Promise<Pet | null> {
        const { data, error } = await supabase
            .from('pets')
            .select('*, clients!inner(*), appointments(*)')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    },

    async getByOwnerId(ownerId: string): Promise<Pet[]> {
        const { data, error } = await supabase
            .from('pets')
            .select('*')
            .eq('owner_id', ownerId)
            .order('name');
        
        if (error) throw error;
        return data || [];
    },

    async create(pet: Omit<Pet, 'id' | 'created_at'>): Promise<Pet> {
        const { data, error } = await supabase
            .from('pets')
            .insert([pet])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async update(id: string, pet: Partial<Pet>): Promise<Pet> {
        const { data, error } = await supabase
            .from('pets')
            .update(pet)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('pets')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    async search(query: string): Promise<Pet[]> {
        const { data, error } = await supabase
            .from('pets')
            .select('*, clients!inner(*)')
            .or(`name.ilike.%${query}%,breed.ilike.%${query}%,species.ilike.%${query}%`)
            .order('name');
        
        if (error) throw error;
        return data || [];
    }
}; 