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
            title={'Конкретный порт:'}
        />
    );
});

export const SelectPortRuFormik = observer(() => {
    const { portsRu } = spsStore;
    const options = Object.values(portsRu).map((port) => port.codeName);

    return (
        <SelectFormik
            name='portRu' title={'Конкретный порт:'}
            options={options}
        />
    );
});
