import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../stores/spsStore/spsStore';
import { Select } from './Select';
import { SelectSpecificT } from '../types/typesComponents';

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
