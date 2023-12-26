import React from 'react';
import { TermsT } from '../../types/typesTables';
import Select from './Select';

export const SelectTerms = ({ name }: { name?: string }) => {
    const options: TermsT[] = ['CFR', 'CFR(Контейнер)', 'EXW', 'FCA'];

    return (
        <Select
            name={name} options={options}
            title={'Условия доставки:'}
        />
    );
};

SelectTerms.defaultProps = {
    name: 'terms',
};
