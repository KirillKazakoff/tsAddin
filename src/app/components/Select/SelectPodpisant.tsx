import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../../stores/spsStore/spsStore';
import Select from './Select';

export const SelectPodpisant = observer(() => {
    const { podpisants } = spsStore;
    const options = Object.values(podpisants).map((podpisant) => podpisant.code);

    return (
        <Select
            name='podpisant' options={options}
            title={'Подписант:'}
        />
    );
});
