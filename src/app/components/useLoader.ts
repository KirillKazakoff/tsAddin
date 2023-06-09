import { useState } from 'react';
import type { StatusT } from './Doc';

// here trycatch on every doc load callback
export const useLoader = (load: () => Promise<void>, isPreventDefault?: boolean) => {
    const [status, setStatus] = useState<StatusT>('init');

    const onLoad = async (e: React.SyntheticEvent) => {
        if (isPreventDefault) e.preventDefault();

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
