import React from 'react';
import { Select, SelectT } from './Select';

export type TermsT = 'CFR' | 'EXW' | 'CFR (контейнер)';

export default function SelectTerms(props: Omit<SelectT, 'options'>) {
    const options: TermsT[] = ['CFR', 'CFR (контейнер)', 'EXW'];
    return (
        <Select
            current={props.current}
            setter={props.setter}
            options={options}
            title={props.title}
        />
    );
}
