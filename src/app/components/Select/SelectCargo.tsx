import React from 'react';
import { observer } from 'mobx-react-lite';
import { CargoT } from '../../stores/docsStores/portLetterStore';
import { Select, SelectT } from './Select';
import SelectFormik from './SelectFormik';

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

type Props = { name: string; title: string };
export const SelectCargoFormik = observer((props: Props) => {
    const options: CargoT[] = ['Покупатель', 'Продавец', ''];

    return (
        <SelectFormik
            name={props.name} title={props.title}
            options={options}
        />
    );
});
