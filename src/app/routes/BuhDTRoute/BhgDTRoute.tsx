import React from 'react';
import { observer } from 'mobx-react-lite';
import { createBhgMail } from './createBhgMail';
import excelSyncStore from '../../stores/excelSyncStore.ts/excelSyncStore';

export const BhgDTRoute = observer(() => {
    const onClick = () => {
        document.location.href = createBhgMail();
        // refresh stores
        excelSyncStore.setSync(false);
    };

    return (
        <button type='button' onClick={onClick}>
            Отправить письмо в бухгалтерию
        </button>
    );
});
