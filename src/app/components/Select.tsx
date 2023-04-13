import React from 'react';
import { observer } from 'mobx-react-lite';
import { SelectT } from '../types/typesComponents';

export const Select = observer(({
    current, setter, options, title,
}: SelectT) => {
    const optionsList = Object.values(options).map((option) => (
        <option key={option} value={option}>
            {option}
        </option>
    ));

    return (
        <div className='select-wrapper'>
            <span className='select-title'>{title}</span>
            <select
                className='select'
                onChange={(e) => setter(e.currentTarget.value)}
                value={current}
            >
                {optionsList}
            </select>
        </div>
    );
});
