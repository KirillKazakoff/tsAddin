import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../../stores/spsStore/spsStore';
import SelectFormik from './SelectFormik';

export const SelectPortTamozhnya = observer(() => {
    const { portsTamozhnya } = spsStore;
    const options = Object.values(portsTamozhnya).map((port) => port.codeName);

    return (
        <SelectFormik
            name='portTamozhnya' options={options}
            title={'Город-порт:'}
        />
    );
});
