import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import CustomerForm from '../components/CustomerForm';
import ProjectForm from '../components/ProjectForm';
import TimeEntry from '../components/TimeEntry';
import TimeTracker from '../components/TimeTracker';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [timeEntries, setTimeEntries] = useState([]);

    useEffect(() => {
        fetchCustomers();
        fetchProjects();
        fetchTimeEntries();
    }, []);

    const fetchCustomers = async () => {
        const { data, error } = await supabase.from('customers').select('*');
        if (error) console.error('Error fetching customers:', error);
        else setCustomers(data);
    };

    const fetchProjects = async () => {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) console.error('Error fetching projects:', error);
        else setProjects(data);
    };

    const fetchTimeEntries = async () => {
        const { data, error } = await supabase.from('time_entries').select('*');
        if (error) console.error('Error fetching time entries:', error);
        else setTimeEntries(data);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <CustomerForm />
            <ProjectForm />
            <TimeTracker />
            <h2>Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.name}</li>
                ))}
            </ul>
            <h2>Projects</h2>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
            <h2>Time Entries</h2>
            <ul>
                {timeEntries.map(entry => (
                    <TimeEntry key={entry.id} entry={entry} />
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;