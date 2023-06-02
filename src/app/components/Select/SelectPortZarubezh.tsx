import { observer } from 'mobx-react-lite';
import React from 'react';
import spsStore from '../../stores/spsStore/spsStore';
import SelectFormik from './SelectFormik';

export const SelectPortZarubezh = observer(
    ({ name = 'portZarubezh' }: { name?: string }) => {
        const { portsZarubezh } = spsStore;
        const options = Object.values(portsZarubezh).map((port) => port.codeName);

        return (
            <SelectFormik
                name={name} options={options}
                title='Зарубежный порт'
            />
        );
    },
);
