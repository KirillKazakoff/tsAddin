import React from 'react';
import { observer } from 'mobx-react-lite';
import popupStore from '../../stores/popupStore.ts/popupStore';

export const Popup = observer(() => {
    const { currentStatus, isActive } = popupStore;

    if (!currentStatus || !isActive) return null;

    const onClickHide = () => popupStore.setActive(false);
    const onClickLeft = () => popupStore.operateIndex('decrease');
    const onClickRight = () => popupStore.operateIndex('increase');

    return (
        <div className='popup-wrapper'>
            <div className='popup'>
                <div className='popup__buttons'>
                    <button
                        type='button'
                        className='btn mark arrow-mark'
                        onClick={onClickLeft}
                    >
                        {'<'}
                    </button>
                    <button
                        type='button'
                        className='btn mark x-mark'
                        onClick={onClickHide}
                    >
                        X
                    </button>
                    <button
                        type='button'
                        className='btn mark arrow-mark'
                        onClick={onClickRight}
                    >
                        {'>'}
                    </button>
                </div>

                <div className='popup-text'>
                    <div className='title'>{currentStatus.title}</div>
                    <div className='message'>{currentStatus.desc}</div>
                </div>
            </div>
        </div>
    );
});
