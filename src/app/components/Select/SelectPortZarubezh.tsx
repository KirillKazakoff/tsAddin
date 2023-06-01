import { observer } from 'mobx-react-lite';
import React from 'react';
import spsStore from '../../stores/spsStore/spsStore';
import { Select, SelectSpecificT } from './Select';
import SelectFormik from './SelectFormik';

export const SelectPortZarubezh = observer((props: SelectSpecificT) => {
    const { portsZarubezh } = spsStore;
    const options = Object.values(portsZarubezh).map((port) => port.codeName);

    return (
        <Select
            current={props.current}
            setter={props.setter}
            options={options}
            title={'Конкретный порт РФ:'}
        />
    );
});

export const SelectPortZarubezhFormik = observer(
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
