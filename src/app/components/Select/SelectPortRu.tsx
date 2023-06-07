import { observer } from 'mobx-react-lite';
import React from 'react';
import spsStore from '../../stores/spsStore/spsStore';
import Select from './Select';

export const SelectPortRu = observer(({ name = 'portRu' }: { name?: string }) => {
    const { portsRu } = spsStore;
    const options = Object.values(portsRu).map((port) => port.codeName);

    return (
        <Select
            name={name} title={'Порт РФ:'}
            options={options}
        />
    );
});
