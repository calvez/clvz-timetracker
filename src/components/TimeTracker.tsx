import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const TimeTracker = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [duration, setDuration] = useState(0);

    const startTimer = () => {
        setIsTracking(true);
        setStartTime(new Date());
    };

    const stopTimer = async () => {
        setIsTracking(false);
        const end = new Date();
        setEndTime(end);
        const timeSpent = Math.floor((end - startTime) / 1000); // duration in seconds
        setDuration(timeSpent);

        // Save the time entry to Supabase
        const { data, error } = await supabase
            .from('time_entries')
            .insert([{ start_time: startTime, end_time: end, duration: timeSpent }]);

        if (error) {
            console.error('Error saving time entry:', error);
        } else {
            console.log('Time entry saved:', data);
        }
    };

    return (
        <div>
            <h2>Time Tracker</h2>
            {isTracking ? (
                <div>
                    <p>Tracking time...</p>
                    <button onClick={stopTimer}>Stop</button>
                </div>
            ) : (
                <div>
                    <button onClick={startTimer}>Start</button>
                </div>
            )}
            {duration > 0 && <p>Duration: {duration} seconds</p>}
        </div>
    );
};

export default TimeTracker;