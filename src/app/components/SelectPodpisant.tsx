import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../stores/spsStore/spsStore';
import { Select } from './Select';
import { SelectSpecificT } from '../types/typesComponents';

export const SelectPodpisant = observer(({ current, setter }: SelectSpecificT) => {
    const { podpisants } = spsStore;
    const options = Object.values(podpisants).map((podpisant) => podpisant.codeName);

    return (
        <Select
            current={current}
            setter={setter}
            options={options}
            title={'Выберите подписанта:'}
        />
    );
});
