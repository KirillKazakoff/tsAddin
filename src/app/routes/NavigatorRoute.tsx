// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigatorRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    });
    return null;
}
