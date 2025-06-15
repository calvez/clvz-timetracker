export interface Customer {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface Project {
    id: number;
    name: string;
    customerId: number;
    startDate: string;
    endDate?: string;
    createdAt: string;
}

export interface TimeEntry {
    id: number;
    projectId: number;
    duration: number; // duration in minutes
    description: string;
    date: string;
    createdAt: string;
}