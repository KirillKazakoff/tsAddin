import React from 'react';
import { observer } from 'mobx-react-lite';
import { pathObj } from '../../logic/utils/constants';
import popupStore from '../../stores/popupStore.ts/popupStore';

export const NotificationBtn = observer(() => {
    const { isActive, currentStatus } = popupStore;

    if (isActive && currentStatus) return null;
    const cls = currentStatus ? 'svg-bell--error' : '';

    const onClick = () => {
        popupStore.setActive(!isActive);
    };

    return (
        <button
            type='button' className='btn svg-btn'
            onClick={onClick}
        >
            <img
                className={`svg svg-bell svg--scale ${cls}`}
                src={pathObj.bell}
                alt='cant load bell img'
            />
        </button>
    );
});
