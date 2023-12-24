import { observer } from 'mobx-react-lite';
import React from 'react';
import spsStore from '../../stores/spsStore/spsStore';
import Select from './Select';

export const SelectPortZarubezh = observer(
    ({ name = 'portZarubezh' }: { name?: string }) => {
        const { portsZarubezh } = spsStore;
        const options = Object.values(portsZarubezh).map((port) => port.code);

        return (
            <Select
                name={name} options={options}
                title='Зарубежный порт'
            />
        );
    },
);
