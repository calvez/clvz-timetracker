import React from 'react';

interface TimeEntryProps {
    id: number;
    project: string;
    customer: string;
    hours: number;
    date: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const TimeEntry: React.FC<TimeEntryProps> = ({ id, project, customer, hours, date, onEdit, onDelete }) => {
    return (
        <div className="time-entry">
            <div>
                <strong>Project:</strong> {project}
            </div>
            <div>
                <strong>Customer:</strong> {customer}
            </div>
            <div>
                <strong>Hours:</strong> {hours}
            </div>
            <div>
                <strong>Date:</strong> {date}
            </div>
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default TimeEntry;