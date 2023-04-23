import React from 'react';
import { observer } from 'mobx-react-lite';
import { CargoT } from '../../stores/docsStores/portLetterStore';
import { Select, SelectT } from './Select';

export const SelectCargo = observer((props: Omit<SelectT, 'options'>) => {
    const options: CargoT[] = ['Покупатель', 'Продавец', ''];

    return (
        <Select
            current={props.current}
            setter={props.setter}
            options={options}
            title={props.title}
        />
    );
});
