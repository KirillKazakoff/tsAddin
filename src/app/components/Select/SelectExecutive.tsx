import React from 'react';
import { observer } from 'mobx-react-lite';
import Select from './Select';

export const SelectExecutive = observer(() => {
    const options = ['МСФ', 'КНФ', 'КМН'];
    return (
        <Select
            name='executive' options={options}
            title='Исполнитель:'
        />
    );
});
