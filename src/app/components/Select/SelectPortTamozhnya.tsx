import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../../stores/spsStore/spsStore';
import Select from './Select';

export const SelectPortTamozhnya = observer(() => {
    const { portsTamozhnya } = spsStore;
    const options = Object.values(portsTamozhnya).map((port) => port.codeName);

    return (
        <Select
            name='portTamozhnya' options={options}
            title={'Город-порт:'}
        />
    );
});
