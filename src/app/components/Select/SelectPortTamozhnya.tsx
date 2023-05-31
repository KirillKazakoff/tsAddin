import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select, SelectSpecificT } from './Select';
import spsStore from '../../stores/spsStore/spsStore';
import SelectFormik from './SelectFormik';

export const SelectPortTamozhnya = observer((props: SelectSpecificT) => {
    const { portsTamozhnya } = spsStore;
    const options = Object.values(portsTamozhnya).map((port) => port.codeName);

    return (
        <Select
            current={props.current}
            setter={props.setter}
            options={options}
            title={'Город-порт:'}
        />
    );
});

export const SelectPortTamozhnyaFormik = observer(() => {
    const { portsTamozhnya } = spsStore;
    const options = Object.values(portsTamozhnya).map((port) => port.codeName);

    return (
        <SelectFormik
            name='portTamozhnya' options={options}
            title={'Город-порт:'}
        />
    );
});
