import { observer } from 'mobx-react-lite';
import React from 'react';
import spsStore from '../../stores/spsStore/spsStore';

import { Select, SelectSpecificT } from './Select';

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
