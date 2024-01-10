import React from 'react';
import { observer } from 'mobx-react-lite';
import popupStore from '../stores/popupStore.ts/popupStore';

export const Popup = observer(() => {
    const { currentStatus } = popupStore;

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

// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import popupStore from '../stores/popupStore.ts/popupStore';

// export const Popup = observer(() => {
//     const { statuses, currentStatus } = popupStore;

//     useEffect(() => {
//         let timer: NodeJS.Timeout;
//         if (popupStore.isActive) {
//             timer = setTimeout(() => popupStore.killStatus(), 8000);
//         }

//         return () => clearTimeout(timer);
//     }, [statuses]);

//     if (!currentStatus) return null;

//     const onClickX = () => popupStore.killStatus();

//     if (!currentStatus) return null;

//     return (
//         <div className='popup-wrapper'>
//             <div className='popup'>
//                 <button
//                     type='button' className='btn x-mark'
//                     onClick={onClickX}
//                 >
//                     X
//                 </button>
//                 <div className='popup-text'>
//                     <div className='title'>{currentStatus.title}</div>
//                     <div className='message'>{currentStatus.desc}</div>
//                 </div>
//             </div>
//         </div>
//     );
// });
