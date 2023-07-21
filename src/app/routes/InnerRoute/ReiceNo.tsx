import React from 'react';
import { observer } from 'mobx-react-lite';
import InputText from '../../components/Form/InputText';

export const ReiceNo = observer(() => {
    return (
        <InputText
            name='reiceNo' title='Введите № рейса:'
            placeholder='№ рейса'
        />
    );
});
