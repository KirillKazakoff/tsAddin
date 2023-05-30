import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../../stores/spsStore/spsStore';
import { Select, SelectSpecificT } from './Select';
import SelectFormik from './SelectFormik';

export const SelectPodpisant = observer(({ current, setter }: SelectSpecificT) => {
    const { podpisants } = spsStore;
    const options = Object.values(podpisants).map((podpisant) => podpisant.codeName);

    return (
        <Select
            current={current}
            setter={setter}
            options={options}
            title={'Подписант:'}
        />
    );
});

export const SelectPodpisantFormik = observer(() => {
    const { podpisants } = spsStore;
    const options = Object.values(podpisants).map((podpisant) => podpisant.codeName);

    return (
        <SelectFormik
            options={options} title={'Подписант:'}
            name='podpisant'
        />
    );
});
