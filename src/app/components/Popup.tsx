/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import popupStore from '../stores/popupStore.ts/popupStore';

export const Popup = observer(() => {
    const { currentStatus } = popupStore;

    // useEffect(() => {
    //     if (!popupStore.isActive) return;

    //     let timer: NodeJS.Timeout;
    //     if (popupStore.isActive) {
    //         timer = setTimeout(() => popupStore.killAll(), 8000);
    //     }

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // });

    if (!currentStatus) return null;

    const onClickX = () => popupStore.killStatus();

    if (!currentStatus) return null;

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
                    <div className='title'>{currentStatus.title}</div>
                    <div className='message'>{currentStatus.desc}</div>
                </div>
            </div>
        </div>
    );
});
