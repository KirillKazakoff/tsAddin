import React from 'react';
import { Select, SelectT } from './Select';
import { TermsT } from '../../types/typesTables';
import SelectFormik from './SelectFormik';

export default function SelectTerms(props: Omit<SelectT, 'options'>) {
    const options: TermsT[] = ['CFR', 'CFR (контейнер)', 'EXW', 'FCA'];
    return (
        <Select
            current={props.current}
            setter={props.setter}
            options={options}
            title={props.title}
        />
    );
}

export const SelectTermsFormik = () => {
    const options: TermsT[] = ['CFR', 'CFR (контейнер)', 'EXW', 'FCA'];

    return (
        <SelectFormik
            name='terms' options={options}
            title={'Условия доставки'}
        />
    );
};
