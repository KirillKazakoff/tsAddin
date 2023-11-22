import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import popupStore from '../stores/popupStore.ts/popupStore';

export const Popup = observer(() => {
    const { status } = popupStore;
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (popupStore.isActive) {
            timer = setTimeout(() => popupStore.setActive(false), 8000);
        }

        return () => clearTimeout(timer);
    }, [status]);

    const onClickX = () => popupStore.setActive(false);

    if (!popupStore.isActive) return null;

    return (
        <div className='popup-wrapper'>
            <div className='popup'>
                <button
                    type='button' className='btn x-mark'
                    onClick={onClickX}
                >
                    X
                </button>
                <div className='popup-text'>
                    <div className='title'>{status.title}</div>
                    <div className='message'>{status.desc}</div>
                </div>
            </div>
        </div>
    );
});
