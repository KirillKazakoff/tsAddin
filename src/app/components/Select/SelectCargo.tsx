import React from 'react';
import { observer } from 'mobx-react-lite';
import { CargoT } from '../../stores/docsStores/portLetterStore';
import SelectFormik from './SelectFormik';

type Props = { name: string; title: string };
export const SelectCargo = observer((props: Props) => {
    const options: CargoT[] = ['Покупатель', 'Продавец', ''];

    return (
        <SelectFormik
            name={props.name} title={props.title}
            options={options}
        />
    );
});
