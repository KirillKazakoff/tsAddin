import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../../stores/spsStore/spsStore';
import SelectFormik from './SelectFormik';

export const SelectPodpisant = observer(() => {
    const { podpisants } = spsStore;
    const options = Object.values(podpisants).map((podpisant) => podpisant.codeName);

    return (
        <SelectFormik
            name='podpisant' options={options}
            title={'Подписант:'}
        />
    );
});
