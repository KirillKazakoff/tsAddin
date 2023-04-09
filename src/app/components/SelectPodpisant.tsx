import React from 'react';
import { observer } from 'mobx-react-lite';
import spsStore from '../stores/spsStore/spsStore';

type SelectPodpisantT = {
    current: string;
    setter: (newCurrent: string) => void;
};

export const SelectPodpisant = observer(({ current, setter }: SelectPodpisantT) => {
    const { podpisants } = spsStore;

    const options = Object.values(podpisants).map((podpisant) => (
        <option key={podpisant.ru.name} value={podpisant.ru.name}>
            {podpisant.ru.name}
        </option>
    ));

    return (
        <select onChange={(e) => setter(e.currentTarget.value)} value={current}>
            {options}
        </select>
    );
});
