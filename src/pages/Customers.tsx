import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import CustomerForm from '../components/CustomerForm';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const { data, error } = await supabase
            .from('customers')
            .select('*');

        if (error) {
            console.error('Error fetching customers:', error);
        } else {
            setCustomers(data);
        }
        setLoading(false);
    };

    const handleAddCustomer = async (customer) => {
        const { data, error } = await supabase
            .from('customers')
            .insert([customer]);

        if (error) {
            console.error('Error adding customer:', error);
        } else {
            setCustomers([...customers, ...data]);
        }
    };

    return (
        <div>
            <h1>Customers</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id}>{customer.name}</li>
                    ))}
                </ul>
            )}
            <CustomerForm onAddCustomer={handleAddCustomer} />
        </div>
    );
};

export default Customers;