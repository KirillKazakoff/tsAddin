import { observer } from 'mobx-react-lite';
import React from 'react';
import spsStore from '../../stores/spsStore/spsStore';
import SelectFormik from './SelectFormik';

export const SelectPortRu = observer(({ name = 'portRu' }: { name?: string }) => {
    const { portsRu } = spsStore;
    const options = Object.values(portsRu).map((port) => port.codeName);

    return (
        <SelectFormik
            name={name} title={'Порт РФ:'}
            options={options}
        />
    );
});
