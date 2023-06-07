import React, { useState } from 'react';
import type { StatusT } from './Doc';

export const useLoader = (load: () => Promise<void>) => {
    const [status, setStatus] = useState<StatusT>('init');

    const onLoad = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await load();
        } catch (error) {
            setStatus('error');
            console.log(error);
        }
        setTimeout(() => setStatus('loaded'), 500);
    };

    return { onLoad, status };
};
