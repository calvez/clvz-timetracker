import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchCustomers = async () => {
    const { data, error } = await supabase
        .from('customers')
        .select('*');
    if (error) throw new Error(error.message);
    return data;
};

export const addCustomer = async (customer) => {
    const { data, error } = await supabase
        .from('customers')
        .insert([customer]);
    if (error) throw new Error(error.message);
    return data;
};

export const updateCustomer = async (id, customer) => {
    const { data, error } = await supabase
        .from('customers')
        .update(customer)
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};

export const deleteCustomer = async (id) => {
    const { data, error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};

export const fetchProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*');
    if (error) throw new Error(error.message);
    return data;
};

export const addProject = async (project) => {
    const { data, error } = await supabase
        .from('projects')
        .insert([project]);
    if (error) throw new Error(error.message);
    return data;
};

export const updateProject = async (id, project) => {
    const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};

export const deleteProject = async (id) => {
    const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};