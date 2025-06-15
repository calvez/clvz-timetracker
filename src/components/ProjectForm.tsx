import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Project } from '../types';

const ProjectForm: React.FC<{ project?: Project; onSubmit: () => void }> = ({ project, onSubmit }) => {
    const [name, setName] = useState(project ? project.name : '');
    const [customerId, setCustomerId] = useState(project ? project.customerId : '');
    const [description, setDescription] = useState(project ? project.description : '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !customerId) return;

        const { data, error } = project
            ? await supabase
                .from('projects')
                .update({ name, customerId, description })
                .eq('id', project.id)
            : await supabase
                .from('projects')
                .insert([{ name, customerId, description }]);

        if (error) {
            console.error('Error saving project:', error);
        } else {
            onSubmit();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Project Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="customerId">Customer ID</label>
                <input
                    type="text"
                    id="customerId"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">{project ? 'Update Project' : 'Add Project'}</button>
        </form>
    );
};

export default ProjectForm;