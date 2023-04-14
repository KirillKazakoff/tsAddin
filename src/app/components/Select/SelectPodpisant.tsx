import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../../stores/spsStore/spsStore';
import { SelectSpecificT } from '../../types/typesComponents';
import { Select } from './Select';

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
