import React from 'react';
import { TermsT } from '../../types/typesTables';
import SelectFormik from './SelectFormik';

export const SelectTerms = ({ name }: { name?: string }) => {
    const options: TermsT[] = ['CFR', 'CFR (контейнер)', 'EXW', 'FCA'];

    return (
        <SelectFormik
            name={name} options={options}
            title={'Условия доставки'}
        />
    );
};

SelectTerms.defaultProps = {
    name: 'terms',
};
