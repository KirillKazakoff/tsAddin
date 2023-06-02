import React from 'react';
import { TermsT } from '../../types/typesTables';
import SelectFormik from './SelectFormik';

export const SelectTerms = () => {
    const options: TermsT[] = ['CFR', 'CFR (контейнер)', 'EXW', 'FCA'];

    return (
        <SelectFormik
            name='terms' options={options}
            title={'Условия доставки'}
        />
    );
};
