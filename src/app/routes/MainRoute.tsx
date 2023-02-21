import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function MainRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/letter');
    });

    return (
        <div>
            <div>MainRoute</div>
        </div>
    );
}
