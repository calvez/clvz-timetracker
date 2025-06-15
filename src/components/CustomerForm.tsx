import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Customer } from '../types';

const CustomerForm: React.FC<{ customer?: Customer; onSubmit: () => void }> = ({ customer, onSubmit }) => {
    const [name, setName] = useState(customer ? customer.name : '');
    const [email, setEmail] = useState(customer ? customer.email : '');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !email) {
            setError('Name and email are required.');
            return;
        }

        try {
            if (customer) {
                // Update existing customer
                const { error } = await supabase
                    .from('customers')
                    .update({ name, email })
                    .eq('id', customer.id);

                if (error) throw error;
            } else {
                // Add new customer
                const { error } = await supabase
                    .from('customers')
                    .insert([{ name, email }]);

                if (error) throw error;
            }
            onSubmit();
        } catch (error) {
            setError('Failed to save customer. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">{customer ? 'Update' : 'Add'} Customer</button>
        </form>
    );
};

export default CustomerForm;