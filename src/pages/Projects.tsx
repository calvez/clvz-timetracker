import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import ProjectForm from '../components/ProjectForm';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*');

            if (error) {
                console.error('Error fetching projects:', error);
            } else {
                setProjects(data);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const handleAddProject = async (project) => {
        const { data, error } = await supabase
            .from('projects')
            .insert([project]);

        if (error) {
            console.error('Error adding project:', error);
        } else {
            setProjects([...projects, ...data]);
        }
    };

    const handleUpdateProject = async (id, updatedProject) => {
        const { data, error } = await supabase
            .from('projects')
            .update(updatedProject)
            .eq('id', id);

        if (error) {
            console.error('Error updating project:', error);
        } else {
            setProjects(projects.map(project => (project.id === id ? data[0] : project)));
        }
    };

    const handleDeleteProject = async (id) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting project:', error);
        } else {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Projects</h1>
            <ProjectForm onAddProject={handleAddProject} />
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        {project.name}
                        <button onClick={() => handleUpdateProject(project.id, { name: 'Updated Project Name' })}>Edit</button>
                        <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;