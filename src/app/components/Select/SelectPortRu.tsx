import { observer } from 'mobx-react-lite';
import React from 'react';
import spsStore from '../../stores/spsStore/spsStore';

import { Select, SelectSpecificT } from './Select';
import SelectFormik from './SelectFormik';

export const SelectPortRu = observer((props: SelectSpecificT) => {
    const { portsRu } = spsStore;
    const options = Object.values(portsRu).map((port) => port.codeName);

    return (
        <Select
            current={props.current}
            setter={props.setter}
            options={options}
            title={'Порт РФ:'}
        />
    );
});

export const SelectPortRuFormik = observer(
    ({ name = 'portRu' }: { name?: string }) => {
        const { portsRu } = spsStore;
        const options = Object.values(portsRu).map((port) => port.codeName);

        return (
            <SelectFormik
                name={name} title={'Порт РФ:'}
                options={options}
            />
        );
    },
);
