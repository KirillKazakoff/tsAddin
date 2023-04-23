import { useState } from 'react';
import type { StatusT } from './Doc';

export const useLoader = (load: () => Promise<void>) => {
    const [status, setStatus] = useState<StatusT>('init');

    const onLoad = async () => {
        setStatus('loading');
        try {
            await load();
        } catch (e) {
            setStatus('error');
        }
        setTimeout(() => setStatus('loaded'), 500);
    };

    return { onLoad, status };
};
